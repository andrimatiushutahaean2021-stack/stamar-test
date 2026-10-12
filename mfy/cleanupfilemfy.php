<?php

// 1. Define the target directory
$directory = '/var/www/html/content/MFY/';

// 2. Define the extensions and the age threshold
$extensions = ['png', 'pdf'];
$seconds_in_3_days = 3 * 24 * 60 * 60;
$now = time();

// 3. Iterate through the folder
foreach (new DirectoryIterator($directory) as $fileInfo) {
    // Skip directories and the dot entries (. and ..)
    if ($fileInfo->isDot() || $fileInfo->isDir()) {
        continue;
    }

    // Check if the file extension is in our list
    $ext = strtolower($fileInfo->getExtension());
    if (in_array($ext, $extensions)) {

        // Check if the file is older than 3 days
        if ($now - $fileInfo->getMTime() > $seconds_in_3_days) {
            unlink($fileInfo->getRealPath());
        }
    }
}

// 4. Redirect back to the previous page
// If HTTP_REFERER isn't set, it defaults to your homepage or a specific URL
$back = $_SERVER['HTTP_REFERER'] ?? 'index.php';
header('Location: '.$back);
exit;
