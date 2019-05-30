const nodemailer = require('nodemailer');
const mailTemplateRegistration = require('./template/registration');
const mailTemplateForgotPassword = require('./template/forgot-password');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'sdlabmailer@gmail.com',
           pass: 'U7Un5s6kJ5eUz2M'
       }
   });

async function send(options, placeHolderValue){
  console.log(options);
  options.html = getTemplate(options.template, placeHolderValue);
  
  const mailResponse = await transporter.sendMail(options);

  const mailOk = mailResponse.accepted.length > 0 ? 'Mail sent' : 'Mail not sent.';
  return mailOk;
}

function getTemplate(name, value){
  let template = "";
    switch (name) {
      case 'registration':
        template = mailTemplateRegistration.replace('[[useridplacholder]]',value);
        break;
      case 'forgot-password':
        template = mailTemplateForgotPassword
                    .replace('[[host-sender-url]]', value[0])
                    .replace('[[token]]', value[1]);
        break;
      default:
        break;
    }

    return template;
}

module.exports = {
    send
}