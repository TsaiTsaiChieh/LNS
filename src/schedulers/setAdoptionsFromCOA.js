const { getDataFromAPI } = require('../helpers/getDataUtil');
const ServerErrors = require('../helpers/ServerErrors');
const { Pets } = require('../helpers/mongoUtil');
const { ref, ageMapping, optionMapping, petStatusMapping } = require('../helpers/fieldMapping');
const configs = {
  API_URL: 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL',
  // statuses: ['OPEN', 'NONE', 'ADOPTED', 'OTHER', 'DEAD'],
  statuses: ['OPEN'],
  batch: 100
};

async function main() {
  try {
    await getDateInBatches(insertPet2MongoDB);
    return Promise.resolve();
    // return res.json('ok');
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getDateInBatches(callback) {
  try {
    const { API_URL, batch, statuses } = configs;
    for (let i = 0; i < statuses.length; i++) {
      const status = statuses[i];
      const data = [];
      let offset = 0;
      let rawData;
      do {
        rawData = await getDataFromAPI(`${API_URL}&$top=${batch}&$skip=${batch * offset}&animal_status=${status}`);
        data.push(...rawData); // spread operator, like array flat
        console.log(`pet_status[${status}]: ${(offset + 1) * batch}/${batch}`);
        offset++;
      } while (rawData.length !== 0);
      callback(data);
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err.stack);
  }
}

async function insertPet2MongoDB(data) {
  try {
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      const ele = data[i];
      const id = `${ele.animal_id}-${ele.animal_subid}`;
      await Pets.findOneAndUpdate({ id }, {
        id,
        ref: ref.gov,
        area_id: ele.animal_area_pkid,
        shelter_id: ele.animal_shelter_pkid,
        kind: ele.animal_kind,
        sex: ele.animal_sex,
        color: ele.animal_colour,
        age: ageMapping(ele.animal_age),
        ligation: optionMapping(ele.animal_sterilization),
        rabies: optionMapping(ele.animal_bacterin),
        found_place: ele.animal_foundplace,
        title: ele.animal_title,
        status: petStatusMapping(ele.animal_status),
        remark: ele.animal_remark,
        open_date: ele.animal_opendate,
        close_date: ele.animal_closedate,
        address: ele.shelter_address,
        phone: ele.shelter_tel,
        images: ele.album_file,
        source_update_time: ele.animal_update,
        source_create_time: ele.animal_createtime
      }, {
        upsert: true,
        setDefaultsOnInsert: true
      });
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MongoDBError(err.stack));
  }
}

module.exports = main;
