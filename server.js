const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this for CORS support

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

app.post('/submit-form', (req, res) => {
  const { name, phone, email, message } = req.body;

  // Create a nodemailer transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vandana.edha.494@gmail.com',
      pass: 'vandana@123',
    },
  });

  // Email data
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'vandana.edha.494@gmail.com', // Your email
    subject: 'New Form Submission',
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
