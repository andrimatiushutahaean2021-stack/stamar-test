<?php

// Start the session
session_start();

// Check if user is logged in
if (! isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] !== true) {
    header('Location: login.php'); // Redirect to login page if not logged in
    exit();
}

// Check if form is submitted and files are uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $uploadDir = '../../content/MFY/';

    if (! is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $indicatorFile = '../../content/MFY/indicator.txt';

    // Get tomorrow's date in DDMMYYYY format
    $dateSuffix = date('dmY', strtotime('+1 day'));

    // Loop through the uploaded files
    $uploadedFiles = [];
    $failedFiles = [];

    // Allowed extensions mapping strictly to allowed MIME types
    $allowedExtensions = ['json', 'pdf', 'png'];

    foreach ($_FILES['files']['name'] as $key => $rawFileName) {
        $tmpName = $_FILES['files']['tmp_name'][$key];

        // Ensure file uploaded via HTTP POST and no upload errors occurred
        if (! is_uploaded_file($tmpName) || $_FILES['files']['error'][$key] !== UPLOAD_ERR_OK) {
            $failedFiles[] = htmlspecialchars($rawFileName, ENT_QUOTES, 'UTF-8');

            continue;
        }

        // Prevent Path Traversal: Strip any directory paths and null bytes
        $cleanFileName = basename(str_replace("\0", '', $rawFileName));

        // Extract and validate extension against an explicit whitelist
        $fileExt = strtolower(pathinfo($cleanFileName, PATHINFO_EXTENSION));
        $fileBaseName = pathinfo($cleanFileName, PATHINFO_FILENAME);

        // MIME type validation
        $fileType = mime_content_type($tmpName);
        $allowedTypes = ['application/json', 'application/pdf', 'image/png'];
        $maxFileSize = 100 * 1024 * 1024; // 100MB limit

        if (
            in_array($fileType, $allowedTypes, true) &&
            in_array($fileExt, $allowedExtensions, true) &&
            $_FILES['files']['size'][$key] <= $maxFileSize
        ) {
            // Sanitize the base file name (keep only alphanumeric and underscores)
            $safeBaseName = preg_replace('/[^a-zA-Z0-9]/', '_', $fileBaseName);

            // Append date suffix and extension
            $safeFileName = "{$safeBaseName}_{$dateSuffix}.{$fileExt}";

            // Ensure target directory is clean and strictly resolved
            $targetPath = $uploadDir.$safeFileName;

            // Move the file to the target directory
            if (move_uploaded_file($tmpName, $targetPath)) {
                $uploadedFiles[] = $safeFileName;
            } else {
                $failedFiles[] = htmlspecialchars($cleanFileName, ENT_QUOTES, 'UTF-8');
            }
        } else {
            $failedFiles[] = htmlspecialchars($cleanFileName, ENT_QUOTES, 'UTF-8');
        }
    }

    // Set JSON header for API consistency
    header('Content-Type: application/json');

    // Prepare response
    if (count($uploadedFiles) > 0) {
        touch($indicatorFile);
        echo json_encode([
            'title' => 'Success!',
            'message' => count($uploadedFiles).' file(s) uploaded successfully!',
            'status' => 'success',
            'uploadedFiles' => $uploadedFiles,
        ]);
    } else {
        echo json_encode([
            'title' => 'Error!',
            'message' => 'No files were uploaded or all files failed to upload.',
            'status' => 'error',
            'failedFiles' => $failedFiles,
        ]);
    }

    exit();
} else {
    header('Content-Type: application/json');
    // No files were uploaded
    echo json_encode([
        'title' => 'Error!',
        'message' => 'No files were uploaded.',
        'status' => 'error',
    ]);
    exit();
}
