<?php
// Start the session
session_start();

// Define correct credentials (you would typically fetch this from a database)
$correctUsername = 'forecasterambon';
$correctPassword = 'aksesterbatasstamarambon'; // Replace with a hashed password in production

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify reCAPTCHA
    $secretKey = '6LcBRIonAAAAACeJskOgqDbhdc0BvE_7NGtzlDXO';  // Replace with your actual reCAPTCHA secret key
    $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($verifyUrl.'?secret='.$secretKey.'&response='.$recaptchaResponse);
    $responseKeys = json_decode($response, true);

    if ($responseKeys['success'] && $username === $correctUsername && $password === $correctPassword) {
        $_SESSION['loggedIn'] = true;
        header('Location: upload_page.php'); // Redirect to the upload page
        exit();
    } else {
        $error = 'Invalid credentials or reCAPTCHA verification failed.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --mouse-x: 50%;
            --mouse-y: 50%;
            --glow-color: rgba(255, 255, 255, 0.8);
        }

        body {
            background: #F0EEE6; 
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: "Raleway", sans-serif;
            overflow: hidden;
        }

        .glass-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cloud {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.5;
        }
        .cloud-1 { background: #4facfe; transform: translate(-220px, -150px); }
        .cloud-2 { background: #2ae470; transform: translate(220px, 150px); }

        .login-box {
            position: relative;
            z-index: 1;
            width: 320px;
            padding: 40px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(25px) saturate(150%);
            -webkit-backdrop-filter: blur(25px);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            transition: transform 0.2s ease;
        }

        /* EFEK 1: CAHAYA DI BACKGROUND CARD (SPOTLIGHT INTERNAL) */
        .login-box::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background: radial-gradient(
                250px circle at var(--mouse-x) var(--mouse-y), 
                rgba(255, 255, 255, 0.25), 
                transparent 80%
            );
        }

        /* EFEK 2: CAHAYA DI BORDER (SPOTLIGHT BORDER) */
        .login-box::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 24px;
            padding: 1.5px; /* Tebal border */
            background: radial-gradient(
                150px circle at var(--mouse-x) var(--mouse-y), 
                var(--glow-color), 
                transparent 60%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        h2 { color: #2d3436; margin-bottom: 30px; font-weight: 700; }
        input {
            width: 100%; padding: 12px; margin: 10px 0;
            border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 10px;
            background: rgba(255, 255, 255, 0.5); color: #2d3436;
            outline: none; box-sizing: border-box; font-family: inherit;
        }
        button {
            width: 100%; margin-top: 25px; padding: 12px; border: none;
            border-radius: 10px; background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white; font-size: 16px; font-weight: 700; cursor: pointer;
        }
    </style>
</head>
<body>
<div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="login-box" id="card">
        <h2>Login</h2>
        <form method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <div class="g-recaptcha" data-sitekey="6LcBRIonAAAAAPw2r8lro3aa4LBMaf32VVWjnNdG"></div> <!-- Replace with your site key -->
            <button type="submit">Login</button>
        </form>
        <?php
        if (isset($error)) {
            echo "<p style='color: red;'>$error</p>";
        }
?>
    </div>
    
    
    <script>
        const card = document.getElementById('card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Koordinat mouse yang sangat presisi terhadap card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    </script>
</body>
</html>
