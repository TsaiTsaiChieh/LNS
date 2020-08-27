const API_URL = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
const axios = require('axios');
const ServerErrors = require('../helpers/ServerErrors');

async function main(req, res) {
  try {
    const data = await getDataFromAPI(API_URL);
    return res.json(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getDataFromAPI(URL) {
  try {
    const { data } = await axios.get(URL);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(new ServerErrors.AxiosGetMethodError(err.stack));
  }
}
module.exports = main;
