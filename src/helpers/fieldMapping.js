const ref = {
  gov: 1,
  map: 2,
  own: 3
};

function ageMapping(age) {
  age = age ? age.toLowerCase() : age;
  switch (age) {
    case 'child':
      return 0;
    case 'adult':
      return 1;
    default:
      return -1;
  }
}

function optionMapping(option) {
  option = option ? option.toLowerCase() : option;
  switch (option) {
    case 'F':
      return 0;
    case 'T':
      return 1;
    default:
      return -1;
  }
}

function petStatusMapping(status) {
  status = status ? status.toLowerCase() : status;
  switch (status) {
    case 'open':
      return 1;
    case 'adopted':
      return 2;
    case 'other':
      return 3;
    case 'dead':
      return -1;
    default: // none
      return 0;
  }
}

module.exports = {
  ref,
  ageMapping,
  optionMapping,
  petStatusMapping
};
