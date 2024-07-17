



export const RestPasswordTemplate = (user: string, link: string, company: string) => {
    const date = Date.now()
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
        }
        .content {
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello "${user}",</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <a href="${link}" class="button">Reset Password</a>
            <p>If you didn't request a password reset, please ignore this email. This link will expire in 24 hours.</p>
            <p>Thank you,<br/>The ${company} Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${date} ${company}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

}