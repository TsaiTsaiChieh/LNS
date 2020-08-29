const { getDataFromAPI } = require('../helpers/getDataUtil');
const ServerErrors = require('../helpers/ServerErrors');
const { Pets } = require('../helpers/mongoUtil');
const { ref, ageMapping, optionMapping, petStatusMapping } = require('../helpers/fieldMapping');
const configs = {
  API_URL: 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL'
};

async function main(req, res) {
  try {
    const data = await getDataFromAPI(configs.API_URL);
    await insertPet2MongoDB(data);

    return res.json('ok');
  } catch (err) {
    return Promise.reject(err);
  }
}

async function insertPet2MongoDB(data) {
  try {
    for (let i = 0; i < 10; i++) {
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
