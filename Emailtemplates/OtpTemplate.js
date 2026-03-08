const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
<html>

<body>
The content of the body element is displayed in your browser.
</body>

</html>
 <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .header {
        background: #ffe014cf;
        padding: 20px;
        text-align: center;
        color: Black;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        padding: 30px;
        text-align: center;
        color: #333;
      }
      .otp-box {
        font-size: 32px;
        letter-spacing: 6px;
        font-weight: bold;
        color: black;
        margin: 20px 0;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        padding: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        Daily Delight
      </div>

      <div class="content">
        <h2>Email Verification</h2>
        <p>Thank you for registering with <b>Daily Delight</b>.</p>
        <p>Please use the following OTP to complete your registration:</p>

        <div class="otp-box">${otp}</div>

        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} Daily Delight. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default otpTemplate;
