const express = require('express');
const router = express.Router();
const request = require('request-promise');
const generator = require('generate-password');
const { sendNewUserMail } = require('../../lib/mailer')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../config/cosmic-palace-323308-cda7af747103.json'); // the file saved above
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
const { countries } = require('countries-languages');
const CountryLanguage = require('country-language');
//const HttpsProxyAgent = require('https-proxy-agent');
const {
  models: { User },
  Types: { ObjectId }
} = require('mongoose');

class LogError extends Error {
  constructor(error, options) {
    super(error);
    this.options = options;
  }
};

router.post('/100-honey', async function(req, res, next) {
  let options;
  try {
    res.json('success')
    const data = req.fields;
    const { first_name, last_name, email, phone } = data
    options = {
      url: `https://blockchaincapital.group/crm/api/api_add_lead`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: '3bfb990e1bad2cb1a26d2897d7067ec3219b8a8a',
        email: email,
        full_name: `${first_name} ${last_name}`,
        phone
      }),
    };
    const reqData = await request(options);
    console.log(reqData)
    await User.create({
      name: `${first_name} ${last_name}`,
      affiliate: '100-honey',
      phone,
      email,
      response: reqData
    });
  } catch (e) {
    console.log(e)
    next(new LogError(e, options))
  }
});


router.post('/leadfx', async function(req, res, next) {
  let options;
  try {
    res.json('success')
    const data = req.fields;
    const { first_name,
      last_name,
      email,
      phone,
      country_code,
      password,
      host_ip,
      host_name,
      currency
    } = data
    const country1 = countries[country_code];
    const country2 = CountryLanguage.getCountry(country_code);
    const language = (country2 && country2.languages && country2.languages[0] && country2.languages[0]['iso639_1']) || 'en'
    const langCurrency = Object.keys(country1.currency)[0];
    console.log(language)
    console.log(langCurrency)
    // const proxy = process.env.QUOTAGUARDSHIELD_URL;
    // const agent = new HttpsProxyAgent(proxy);
    let login, authPassword, sheetName;
    if(/^((\+7|7|8)+([0-9]){10})$/.test(phone.replace(/[^0-9.]/g, ''))) {
      login = 'leadfx_ru@gmail.com';
      authPassword = 'A1#0.nnod10aeobn'
      sheetName = 'Россия'
    } else {
      login = 'leadfx_ru_eu@gmail.com';
      authPassword = 'A1#0.onzidbee49'
      sheetName = 'Европа'
    }
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName];
    const rowObject = {
      'Отметка времени': (new Date()).toLocaleDateString('eu-UA', { hour: '2-digit', hour12: false, minute:'2-digit'}),
      'Имя': first_name,
      'Фамилия': last_name,
      'E-mail': email,
      'Номер телефона': phone
    }
    await sheet.addRow(rowObject);
    options = {
      url: `https://partner.crystal-inv.online/clients`,
      method: 'POST',
  //    agent,
      headers: {
  //      'User-Agent': 'node.js',
        'Content-Type': 'application/json',
        login,
        password: authPassword
      },
      body: JSON.stringify({
        country: country_code,
        email: email,
        firstName: first_name,
        lastName: last_name,
        phone,
        password,
        language,
        currency: langCurrency || currency || 'USD',
        ip: host_ip,
        source: host_name
      }),
    };
    const reqData = await request(options);
    console.log(reqData)
    await User.create({
      name: `${first_name} ${last_name}`,
      affiliate: 'leadfx-gazprom',
      phone,
      email,
      password,
      response: reqData
    });
  } catch (e) {
    console.log(e)
    next(new LogError(e, options))
  }
});


router.post('/accesgroupcapital', async function(req, res, next) {
  try {
    res.json('success')
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Sheet1'];
    const data = req.fields;
    data.date = (new Date()).toLocaleDateString('eu-UA', { hour: '2-digit', hour12: false, minute:'2-digit'})
    data.host = `${data.host_name}: ${data.host_ip}`;
    const { first_name, last_name, email, phone, country_code } = data
    // const tokenData = await request({
    //   url: 'https://affiliate.accesgroupcapital.com/api/affiliate/generateauthtoken',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userName: "Honey_RU",
    //     password: "ho2020"
    //   })
    // });
    // const authToken = JSON.parse(tokenData).token;
    // const options = {
    //   url: `https://affiliate.accesgroupcapital.com/api/aff/leads`,
    //   method: 'POST',
    //   headers: {
    //     'AuthToken': authToken,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     Country: country_code,
    //     Email: email,
    //     FirstName: first_name,
    //     LastName: last_name,
    //     Phone: phone,
    //     AffiliateId: 'Honey_RU',
    //     OwnerId: 499
    //   }),
    // };
    // const reqData = await request(options);
    // console.log(reqData)
    // console.log(options)
    await sheet.addRow(data);
    await sendNewUserMail(data);
  } catch (e) {
    console.log(e)
    next(e)
  }
});

router.post('/fwi', async function(req, res, next) {
  try {
    res.json('success');
    const { host_ip, first_name, last_name, email, phone_number, host_name } = req.fields
    const options = {
      url: `https://platform.fwi-tracker.com/api/signup/procform`,
      method: 'POST',
      headers: {
        'x-trackbox-username': 'Honey',
        'x-trackbox-password': 'dv3Svuj83g',
        'x-api-key': '2643889w34df345676ssdas323tgc738',
        'Content-Type': 'application/json',
      },
      body: `{
          "ai":"2958131",
          "ci":"1",
          "gi":"125",
          "userip":"${host_ip}",
          "firstname":"${first_name}",
          "lastname":"${last_name}",
          "email":"${email}",
          "password":"${generator.generate({ length: 30 })}",
          "phone":"${phone_number}",
          "so":"${host_name}",
          "sub":"FreeParam",
          "MPC_1":"FreeParam"
        }`,
    };
    const data = await request(options);
    console.log(data);
  } catch(e) {
    console.log(e);
    next(e)
  }
});

module.exports = router;
