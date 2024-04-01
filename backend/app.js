const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');
const nodemailer = require('nodemailer');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    const resultFolder = './ResultS'; 

    if (!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder);
    }

    pdf.create(pdfTemplate(req.body), {}).toFile(`${resultFolder}/result-${req.body.name[1]}.pdf`, (err) => {
        if(err) {
            res.status(500).send('Error creating PDF');
            return;
        }
        res.status(200).send('PDF created successfully');
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/ResultS/result-${req.query.name}.pdf`);
});

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.mn',
    port: 587,
    secure: false,
    auth: {
      user: 'sales@kacc.mn',
      pass: '94269002' 
    }
  });
  
  app.post('/create-pdf2', (req, res) => {
    const { email, name } = req.body;
    const resultFolder = './ResultS';
  
    if (!fs.existsSync(resultFolder)) {
      fs.mkdirSync(resultFolder);
    }
    const mailOptions = {
      from: 'sales@kacc.mn',
      to: email,
      subject: 'Your PDF',
      text: 'Please find attached the PDF you requested',
      attachments: [{
        filename: `result-${name}.pdf`,
        path: `${resultFolder}/result-${name}.pdf`
      }]
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('PDF created and email sent successfully');
      }
    });
});

app.post('/create-pdf-and-send-email', (req, res) => {
    const { email, name } = req.body;
    const resultFolder2 = './ResultS';
    const username = process.env.USERNAME;
    const resultFolder = `C:/Users/${username}/Downloads`;


    if (!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder);
    }

    const mailOptions = {
        from: 'sales@kacc.mn',
        to: email,
        subject: `Ажилын анкет`,
        text: `Ажилын анкет - ${name[1]}`,
        attachments: [{
            filename: `CV-${name[1]}-V1.pdf`,
            path: `${resultFolder}/CV-${name[1]}-V1.pdf`
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('PDF created and email sent successfully');
        }
    });
});




app.listen(port, () => console.log(`Listening on port ${port}`));
