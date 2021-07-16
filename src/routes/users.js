const express = require('express');
const router = express.Router();
// const request = require('request-promise');
// const { curly } = require('node-libcurl')
// const util = require('util');
// const exec = require('child_process').exec;
const { sendNewUserMail } = require('../../lib/mailer')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../config/crm-sheets-320012-7312c54dfc2b.json'); // the file saved above
const doc = new GoogleSpreadsheet('1uPjIpTMcof9VNTqEHPM0qL-1MHJ8Rbb7BTqHqFK5IhA');

router.post('/', async function(req, res, next) {
  try {
    res.json('success')
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Sheet1'];
    const data = req.fields;
    data.date = (new Date()).toLocaleDateString('eu-UA', { hour: '2-digit', hour12: false, minute:'2-digit'})
    await sheet.addRow(data);
    await sendNewUserMail(data);
  } catch (e) {
    console.log(e)
    next(e)
  }
});

/* GET users listing. */
// router.post('/', async function(req, res, next) {
//   const { ai, ci, gi, userip, firstname, lastname, email, password, phone, so, sub, MPC_1 } = req.body
//   const options = {
//     url: `https://platform.fwi-tracker.com/api/signup/procform`,
//     method: 'POST',
//     headers: {
//       'x-trackbox-username': 'Honey',
//       'x-trackbox-password': 'dv3Svuj83g',
//       'x-api-key': '2643889w34df345676ssdas323tgc738',
//       'Content-Type': 'application/json',
//     },
//     body: `{
//         "ai":"${ai}",
//         "ci":"${ci}",
//         "gi":"${gi}",
//         "userip":"${userip}",
//         "firstname":"${firstname}",
//         "lastname":"${lastname}",
//         "email":"${email}",
//         "password":"${password}",
//         "phone":"${phone}",
//         "so":"${so}",
//         "sub":"${sub}",
//         "MPC_1":"${MPC_1}"
//       }`,
//   };
//   // const options = {
//   //     url: `https://platform.fwi-tracker.com/api/signup/procform`,
//   //     method: 'POST',
//   //     headers: {
//   //       'x-trackbox-username': 'Honey',
//   //       'x-trackbox-password': 'dv3Svuj83g',
//   //       'x-api-key': '2643889w34df345676ssdas323tgc738',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: `${JSON.stringify(req.body).split(",").join(",\n").split('{').join('{\n').split('}').join('\n}')}`,
//   //   };
//   console.log(options)
//   const data = await request(options);
//   // const { data } = await curly.post('https://platform.fwi-tracker.com/api/signup/procform', {
//   //   postFields: req.body,
//   //   httpHeader: [
//   //     'Content-Type: application/json',
//   //     'x-trackbox-username: Honey',
//   //     'x-trackbox-password: dv3Svuj83g',
//   //     'x-api-key: 2643889w34df345676ssdas323tgc738',
//   //   ],
//   // })
//   res.json(data)
//
//   // const command = `curl --location --request POST \'https://platform.fwi-tracker.com/api/signup/procform\' \\\n' +
//   //   '--header \'x-trackbox-username: Honey\' \\\n' +
//   //   '--header \'x-trackbox-password: dv3Svuj83g\' \\\n' +
//   //   '--header \'x-api-key: 2643889w34df345676ssdas323tgc738\' \\\n' +
//   //   '--header \'Content-Type: application/json\' \\\n' +
//   //   '--data-raw ${JSON.stringify(req.body)} \\`
//   // const command = 'curl --location --request POST \'https://platform.fwi-tracker.com/api/signup/procform\' \\\n' +
//   //   '--header \'x-trackbox-username: Honey\' \\\n' +
//   //   '--header \'x-trackbox-password: dv3Svuj83g\' \\\n' +
//   //   '--header \'x-api-key: 264388973aaa9b2f9eb2aa84a9c7382e\' \\\n' +
//   //   '--header \'Content-Type: application/json\' \\\n' +
//   //   '--data-raw \'{\n' +
//   //   '  "ai": "2958131",\n' +
//   //   '  "ci":"1",\n' +
//   //   '  "gi":"125",\n' +
//   //   '  "userip":"29.249.26.39",\n' +
//   //   '  "firstname":"firstname",\n' +
//   //   '  "lastname":"lastname",\n' +
//   //   '  "email":"test@gmail.com",\n' +
//   //   '  "password":"Aa12345!",\n' +
//   //   '  "phone":"4407055657673",\n' +
//   //   '  "so":"funnelname1",\n' +
//   //   '  "sub":"FreeParam1",\n' +
//   //   '  "MPC_1":"FreeParam",\n' +
//   //   '}'
//   // const command = 'curl --location --request POST \'https://platform.fwi-tracker.com/api/signup/procform\' \\\n' +
//   //   '--header \'x-trackbox-username: Honey\' \\\n' +
//   //   '--header \'x-trackbox-password: dv3Svuj83g\' \\\n' +
//   //   '--header \'x-api-key: 2643889w34df345676ssdas323tgc738\' \\\n' +
//   //   '--header \'Content-Type: application/json\' \\\n' +
//   //   '--data-raw \'{\n' +
//   //   '  "ai":"1123123",\n' +
//   //   '  "ci":"1",\n' +
//   //   '  "gi":"125",\n' +
//   //   '  "userip":"29.249.26.39",\n' +
//   //   '  "firstname":"firstname",\n' +
//   //   '  "lastname":"lastname",\n' +
//   //   '  "email":"test@gmail.com",\n' +
//   //   '  "password":"Aa12345!",\n' +
//   //   '  "phone":"4407055657673",\n' +
//   //   '  "so":"funnelname1",\n' +
//   //   '  "sub":"FreeParam1",\n' +
//   //   '  "MPC_1":"FreeParam"\n' +
//   //   '}\' \\'
//   // const child = exec(command, function(error, stdout, stderr)
//   // {
//   //   if(error !== null) {
//   //     throw error;
//   //   }
//   //   res.json(stdout);
//   // });
// });

module.exports = router;

// curl --location --request POST 'https://platform.fwi-tracker.com/api/signup/procform' \
// --header 'x-trackbox-username: Honey' \
// --header 'x-trackbox-password: dv3Svuj83g' \
// --header 'x-api-key: 264388973aaa9b2f9eb2aa84a9c7382e' \
// --header 'Content-Type: application/json' \
// --data-raw '{
// "ai":"2958131",
//   "ci":"1",
//   "gi":"125",
//   "userip":"29.249.26.39",
//   "firstname":"firstname",
//   "lastname":"lastname",
//   "email":"test@gmail.com",
//   "password":"Aa12345!",
//   "phone":"4407055657673",
//   "so":"funnelname1",
//   "sub":"FreeParam1",
//   "MPC_1":"FreeParam",
// }
