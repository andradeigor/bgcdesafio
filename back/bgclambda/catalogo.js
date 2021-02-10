"use strict";
const AWS = require("aws-sdk");

const S3 = new AWS.S3();

module.exports.handler = async (event, context, callback) => {
  var catalogoParms = {
    Bucket: process.env.bucket,
    Key: "catalogo.json",
  };

  const catalogoData = await S3.getObject(catalogoParms).promise();
  const catalogodirt = catalogoData.Body.toString("utf-8");
  const catalogo = await JSON.parse(catalogodirt);

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
      message: "OK",
      input: catalogo,
    }),
  };

  callback(null, response);
};
