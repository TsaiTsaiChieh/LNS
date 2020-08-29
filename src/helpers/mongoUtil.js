const mongoose = require('mongoose');
const dbName = 'testing';
const URL = `mongodb://localhost:27017/${dbName}`;
// const assert = require('assert');

mongoose.connect(URL, {
  useNewUrlParser: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error'));

// Define a schema
const Schema = mongoose.Schema;

//
const petSchema = new Schema({
  id: { type: String, unique: true, index: true, require: true },
  ref: { type: Number, min: 1, max: 5 }, // 1: gov, 2: map, 3: own
  // _gov_id: { type: Number, unique: true },
  // _gov_subid: { type: String, unique: true },
  area_id: Number, // 動物所屬縣市代碼
  shelter_id: Number, // 動物實際所在地編號
  kind: String, // not just dog and cat
  sex: String,
  color: String,
  age: { type: Number, min: -1, max: 1 },
  ligation: { type: Number, min: -1, max: 1, default: -1 },
  rabies: { type: Number, min: -1, max: 1, default: -1 },
  found_place: String, // 尋獲地（文字描述）
  title: String,
  // None: 0, open: 1, adopted: 2, other: 3, dead: -1
  status: { type: Number, min: -1, max: 3 },
  remark: String,
  open_date: Date,
  close_date: Date,
  address: String,
  phone: String,
  images: [String],
  source_update_time: Date,
  source_create_time: Date
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);
const Pets = mongoose.model('pets', petSchema);
module.exports = { mongoDB, Pets };
