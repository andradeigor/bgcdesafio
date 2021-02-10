"use strict";
const AWS = require("aws-sdk");

const S3 = new AWS.S3();
module.exports.handler = async (event, context, callback) => {
  const data = await JSON.parse(event.body);
  const nodemailer = require("nodemailer");
  const handlebars = require("handlebars");
  const tableprices = {
    msteeve: {
      id: "1",
      title: "Minion Steve",
      price: 150,
    },
    mpresidiario: {
      id: "2",
      title: "Minion Presidiário",
      price: 250,
    },
    mbob: {
      id: "3",
      title: "Minion Bob",
      price: 180,
    },
    mvampiro: {
      id: "4",
      title: "Minion Dracula",
      price: 230,
    },
    mbobp: {
      id: "5",
      title: "Minion Bob Pijama",
      price: 280,
    },
    mtom: {
      id: "6",
      title: "Minion Tom",
      price: 215,
    },
    mstuart: {
      id: "7",
      title: "Minion Stuart",
      price: 90,
    },
    motto: {
      id: "8",
      title: "Minion Otto",
      price: 100,
    },
    mjerry: {
      id: "9",
      title: "Minion Jerry",
      price: 120,
    },
    mdave: {
      id: "10",
      title: "Minion Dave",
      price: 70,
    },
    cbonecos: {
      id: "11",
      title: "Conjunto de bonecos",
      price: 60,
    },
    mkevinatirador: {
      id: "12",
      title: "Minion Kevin Atirador",
      price: 150,
    },
  };
  const order = data.order;
  let totalprice = 0;
  let buyed = [];
  order.map((e) => {
    totalprice += tableprices[e].price;
    buyed.push(` ${tableprices[e].title}`);
  });

  var emailParms = {
    Bucket: process.env.bucket,
    Key: "email.html",
  };

  const emailData = await S3.getObject(emailParms).promise();
  const emailHTML = emailData.Body.toString("utf-8");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.password,
    },
  });

  const template = handlebars.compile(emailHTML);
  const replacements = {
    name: data.fullname,
    order: buyed,
    totalprice: totalprice,
  };
  const HTMLtoSend = template(replacements);
  var mailOptions = {
    from: process.env.user,
    to: [`${data.orderemail}, thiago@bgcbrasil.com.br`],
    subject: `Olá ${data.fullname}`,
    subject: `Compra Minion Store`,
    html: HTMLtoSend,
  };
  const res = await new Promise((rsv, rjt) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return rjt(error);
      }
      rsv("Email sent");
    });
  });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: res,
    }),
  };

  callback(null, response);
};
