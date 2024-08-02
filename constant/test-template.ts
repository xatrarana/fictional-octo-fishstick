export const testTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }

        .email-header {
            background-color: #166534;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }

        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        .button {
            display: inline-block;
            background-color: #166534;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #0056b3;
        }

        .social-icons {
            margin-top: 20px;
        }

        .social-icons img {
            width: 30px;
            margin: 0 5px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Test Configuration</h1>
        </div>
        <div class="email-body">
            <p>Hello,</p>
            <p>This is a test email to verify your email configuration.</p>
            <p>Please confirm that you have received this email and the formatting appears as expected.</p>
            <p>Thank you!</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Trijyoti Saving & Cooperative Ltd. All rights reserved.</p>
        </div>
    </div>
</body>

</html>

` 



export const testInquiryTemplate = ({name,email,subject,message}:{
    name:string,
    email:string,
    subject:string,
    message:string
}) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }

        .email-header {
            background-color: #166534;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }

        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        .button {
            display: inline-block;
            background-color: #166534;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #0056b3;
        }

        .social-icons {
            margin-top: 20px;
        }

        .social-icons img {
            width: 30px;
            margin: 0 5px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>New Inquiry</h1>
        </div>
        <div class="email-body">
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Trijyoti Saving & Cooperative Ltd. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`
}