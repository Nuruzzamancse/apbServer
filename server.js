const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const port = 3010

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

app.use(cors({ origin: true }));

app.post('/', (req, res) => {

  sgMail.setApiKey('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');


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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))