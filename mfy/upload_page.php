<?php
// Start the session
session_start();

// Check if user is logged in
if (! isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] !== true) {
    header('Location: login.php'); // Redirect to login page if not logged in
    exit();
}

?>

<?php
// Get free space and total space in bytes
// Use "C:" for Windows or "/" for Linux
$directory = '/';
$free_bytes = disk_free_space($directory);
$total_bytes = disk_total_space($directory);

// Convert bytes to GB for readability
$free_gb = round($free_bytes / (1024 * 1024 * 1024), 2);
$total_gb = round($total_bytes / (1024 * 1024 * 1024), 2);
$used_gb = $total_gb - $free_gb;

// Calculate percentage for a progress bar
$percent_used = round(($used_gb / $total_gb) * 100);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top-Down Upload</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
    body {
        background: #f0f2f5; /* Light, clean background */
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        overflow-y: auto;
        font-family: "Raleway", sans-serif;
        color: #333;
    }

    /* Header Styling */
    h1 {
        text-align: center;
        padding: 0;
        margin-bottom: 30px;
        width: 100%;
        background: transparent;
    }

    h1 a {
        display: inline-block;
        padding: 15px 40px;
        background: #1a1a1a;
        color: white;
        text-decoration: none;
        letter-spacing: 15px;
        border-radius: 50px; /* Fully rounded */
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    h1 a:hover {
        letter-spacing: 20px;
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    /* Modern Upload Box */
    .upload-box {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        padding: 40px;
        border-radius: 24px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05); /* Very subtle shadow */
        max-width: 500px;
        width: 90%;
    }

    .upload-box label {
        display: block;
        padding: 20px;
        background: #f8f9fa;
        color: #555;
        border: 2px dashed #ddd;
        cursor: pointer;
        border-radius: 16px;
        transition: all 0.3s ease;
        font-weight: 600;
    }

    .upload-box label:hover {
        background: #fff;
        border-color: #6c5ce7;
        color: #6c5ce7;
    }

    .upload-box button {
        margin-top: 25px;
        padding: 12px 30px;
        border: none;
        border-radius: 50px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        font-weight: bold;
        box-shadow: 0 8px 15px rgba(108, 92, 231, 0.3);
        cursor: pointer;
        transition: 0.3s ease;
    }

    .upload-box button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 20px rgba(108, 92, 231, 0.4);
    }

    /* File List Grid */
    #fileList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
        margin-top: 25px;
        width: 100%;
    }

    .file-item {
        padding: 12px;
        background: white;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        border: 1px solid #edf2f7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Modern Navigation */
    .nav {
        margin-top: 20px;
        width: 90%;
        max-width: 600px;
        height: 60px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 10px;
    }

    .nav a {
        color: #444;
        font-size: 14px;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        transition: 0.3s ease;
        font-weight: 600;
    }

    .nav a:hover {
        background: #fff;
        color: #6c5ce7;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .nav a.active {
        background: #6c5ce7;
        color: white;
        box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
    }

    .drag-over {
        background: #e1f5fe !important;
        border-color: #03a9f4 !important;
    }
</style>
</head>
<body>


<div class="nav">
  <a href="https://stamar-ambon.bmkg.go.id/wp-content/File%20Upload.php">PD Upload</a>
  <a href="https://stamar-ambon.bmkg.go.id/wp-content/MFYUPLOAD/upload_page.php">MFY Upload</a>
  <a href="https://stamar-ambon.bmkg.go.id/wp-content/BahariUpload/upload.php">Bahari Upload</a>
  <a href="https://stamar-ambon.bmkg.go.id/wp-content/tools_selector.html">Tools</a>
</div>
<div style="font-family: sans-serif; max-width: 400px; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
    <h3>Server Storage</h3>
    
    <div style="background: #eee; border-radius: 10px; height: 20px; width: 100%; margin-bottom: 10px;">
        <div style="background: #28a745; width: <?php echo $percent_used; ?>%; height: 100%; border-radius: 10px;"></div>
    </div>

    <p>
        <strong>Free Space:</strong> <?php echo $free_gb; ?> GB <br>
        <strong>Total Space:</strong> <?php echo $total_gb; ?> GB <br>
        <small style="color: #666;"><?php echo $percent_used; ?>% of disk used</small>
    </p>
</div>
<form action="cleanupfilemfy.php" method="POST">
    <button type="submit" 
            onclick="return confirm('Are you sure you want to delete files older than 3 days?')"
            style="padding: 10px 20px;background-color: #8c1515;color: white;BORDER-WIDTH: 2px!IMPORTANT;border-style: solid;border-radius: 4px;cursor: pointer;">
        Clean Up Old MFY Files
    </button>
</form>

    <h1><a href="#0">Tempat-Upload </a></h1>
    <h3><a style="
    
" >P.AH (Perairan) ,  AH (Pelabuhan) , Maks 112 File / 112 MB, Tanggal: <?php echo date('dmY', strtotime('+1 day')).'<br>'; ?> </a></h3>

    <div class="upload-box">
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" id="fileUpload" name="files[]" multiple accept=".pdf, .png, .jpg, .jpeg" style="
    display: none;
">
            <label for="fileUpload">Choose Files</label>
            <div id="fileList"></div> <!-- Area to display selected files -->
            <p>Upload Files MFY MARITIM AMBON</p>
            <button type="submit">Upload</button>
        </form>
    </div>

    <script>
    
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
        document.body.classList.add("drag-over");
    });

    document.addEventListener("dragleave", function(event) {
        document.body.classList.remove("drag-over");
    });

        document.addEventListener("drop", function(event) {
        event.preventDefault();
        document.body.classList.remove("drag-over");

        const files = event.dataTransfer.files;
        const fileInput = document.getElementById("fileUpload");
        fileInput.files = files;

        // Trigger change event to update file list
        fileInput.dispatchEvent(new Event("change"));
    });
    
    
    
    
    
        // Show selected file names
        document.getElementById("fileUpload").addEventListener("change", function(event) {
    const fileListDiv = document.getElementById("fileList");
    fileListDiv.innerHTML = ""; // Bersihkan list sebelumnya

    const files = event.target.files;
    
    if (files.length > 0) {
        // Loop untuk membuat elemen div terpisah bagi setiap file
        for (let i = 0; i < files.length; i++) {
            const fileItem = document.createElement("div");
            fileItem.className = "file-item"; // Class untuk styling CSS
            fileItem.textContent = `${i + 1}. ${files[i].name}`;
            
            fileListDiv.appendChild(fileItem);
        }
    } else {
        fileListDiv.innerHTML = "No files selected.";
    }
});

        document.getElementById("uploadForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let formData = new FormData(this);

            // Show SweetAlert with confirmation button
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to upload these files?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, upload it!',
                cancelButtonText: 'Cancel',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    // Show loading alert while uploading
                    const loadingAlert = Swal.fire({
                        title: 'Uploading...',
                        text: 'Please wait while we upload your files.',
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonText: 'Cancel Upload',
                        allowOutsideClick: false,
                        willOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    // Send the form data to the server
                    fetch("upload.php", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Close loading alert and show the response
                        loadingAlert.close();
                        Swal.fire(data.title, data.message, data.status);
                    })
                    .catch(error => {
                        // Close loading alert and show error message
                        loadingAlert.close();
                        Swal.fire("Error!", "Something went wrong!", "error");
                    });
                }
            });
        });
    </script>
</body>
</html>

<?php

function get_cpu_usage()
{
    // We need two samples with a small delay to calculate the difference
    $stat1 = file_get_contents('/proc/stat');
    sleep(1);
    $stat2 = file_get_contents('/proc/stat');

    function parse_stat($data)
    {
        $lines = explode("\n", $data);
        $cpu = explode(' ', preg_replace('!cpu +!', '', $lines[0]));

        return array_sum($cpu) - $cpu[3]; // Total - Idle
    }

    $info1 = explode(' ', preg_replace('!cpu +!', '', explode("\n", $stat1)[0]));
    $info2 = explode(' ', preg_replace('!cpu +!', '', explode("\n", $stat2)[0]));

    $total1 = array_sum($info1);
    $total2 = array_sum($info2);

    $idle1 = $info1[3];
    $idle2 = $info2[3];

    $diff_total = $total2 - $total1;
    $diff_idle = $idle2 - $idle1;

    return round(100 * ($diff_total - $diff_idle) / $diff_total, 2);
}

echo 'Current CPU Usage: '.get_cpu_usage().'%';

?>

<?php
function get_network_usage($interface = 'eth0')
{
    $get_stats = function ($iface) {
        $data = file('/proc/net/dev');
        foreach ($data as $line) {
            if (str_contains($line, $iface)) {
                $stats = preg_split('/\s+/', trim($line));

                return ['rx' => $stats[1], 'tx' => $stats[9]];
            }
        }

        return ['rx' => 0, 'tx' => 0];
    };

    $start = $get_stats($interface);
    sleep(1);
    $end = $get_stats($interface);

    $rx_speed = ($end['rx'] - $start['rx']) / 1024; // KB/s
    $tx_speed = ($end['tx'] - $start['tx']) / 1024; // KB/s

    return [
        'down' => round($rx_speed, 2),
        'up' => round($tx_speed, 2),
    ];
}

$net = get_network_usage('eth0'); // Change 'eth0' to your interface name (e.g., 'ens33' or 'wlan0')
echo ", Download: {$net['down']} KB/s | Upload: {$net['up']} KB/s";
?>


