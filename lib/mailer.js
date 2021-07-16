const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'alpaylevemt@gmail.com',
    pass: 'beoerqnqf37718'
  }
});

const emailTemplate = (tempPath, locals) =>
  new Promise((resolve, reject) => {
    const templateDir = path.join(__dirname.replace('lib', 'src'), 'templates', tempPath);
    const myTemplate = new EmailTemplate(templateDir);
    myTemplate.render(locals, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.html);
    });
  });

const sendNewUserMail = async (data) => {
  const html = await emailTemplate('newUser', data);
  const mailOptions = {
    from: 'alpaylevemt@gmail.com',
    to: 'alpaylevemt@gmail.com',
    subject: 'У вас новый подписчик!',
    html
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error);
      } else {
        resolve(info.response)
      }
    });
  })
}

module.exports = { sendNewUserMail }
