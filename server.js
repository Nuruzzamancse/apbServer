const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const port = process.env.PORT || 3010 

const app = express();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }),
  databaseURL: 'https://apb-dev.firebaseio.com'
});

app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

app.use(cors({ origin: true }));

app.post('/', (req, res) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);


  const msg = {
    to: req.body.to,
    cc: req.body.cc,
    bcc:req.body.bcc,
    from: 'app@airpilotbase.com',
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };

    sgMail.send(msg);

});

app.get('/:id', (req, res) => {
  const userId = req.params.id;
  admin.auth().deleteUser(userId)
  .then((user) =>{
    res.json({success: true, message: `User deleted successfully`})
  })
  .catch((error) =>{
    res.status(400).json({success: false, message: 'Can not delete user'})
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))