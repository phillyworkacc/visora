import { appUrl } from "@/utils/constants";

export default function SubscribedEmail (name: string) {
   return `
    <!DOCTYPE html>
    <html lang="en" style="margin: 0; padding: 0">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Visora</title>
        <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 2rem auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }
        .header {
            background-color: #6a0dad;
            padding: 1.5rem;
            text-align: center;
            color: white;
        }
        .content {
            padding: 2rem;
        }
        .content h1 {
            margin-top: 0;
            color: #6a0dad;
        }
        .cta {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background-color: #6a0dad;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        }
        .footer {
            font-size: 0.85rem;
            text-align: center;
            padding: 1.5rem;
            color: #999;
        }
        </style>
    </head>
    <body>
        <div class="email-container">
        <div class="header">
            <h2>Welcome to Visora 🎉</h2>
        </div>
        <div class="content">
            <h1>Hi ${name}, You're in!</h1>
            <p>Thanks for subscribing to Visora — your new hub for smart, real-time website analytics.</p>
            <p>Here's what you can do now:</p>
            <ul>
            <li>Add your website(s) to your dashboard</li>
            <li>Install your unique tracking snippet</li>
            <li>Start getting instant insights</li>
            </ul>
            <a href="${appUrl}/dashboard" class="cta">Go to Dashboard</a>
        </div>
        <div class="footer">
            Need help? Contact us <a href="${appUrl}/contact">here</a><br />
        </div>
        </div>
    </body>
    </html>
   `;
}