const axios = require('axios');
const ServerErrors = require('../helpers/ServerErrors');

async function getDataFromAPI(URL) {
  try {
    const { data } = await axios.get(URL);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(new ServerErrors.AxiosGetMethodError(err.stack));
  }
}

module.exports = {
  getDataFromAPI
};
