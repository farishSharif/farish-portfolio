const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'farish.sharieef@gmail.com',
      pass: 'tssc zxob ashs sryk'
    }
  });

  const mailOptions = {
  from: 'farish.sharieef@gmail.com', 
  replyTo: email,                    
  to: 'farish.sharieef@gmail.com',
  subject: `Portfolio Contact from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\n\n${message}`
};


  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});