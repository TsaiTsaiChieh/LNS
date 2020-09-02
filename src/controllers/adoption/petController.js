const ajv = require('../../helpers/ajvUtil');
const { BAD_REQUEST } = require('http-status');

async function controller(req, res) {
  const schema = {
    type: 'object',
    properties: {
      shelter_id: {
        type: 'string'
        // enum:
      },
      kind: {
        type: 'string'
      // enum: []
      },
      sex: {
        type: 'integer',
        enum: [-1, 0, 1]
      },
      age: {
        type: 'integer',
        enum: [-1, 0, 1]
      },
      ligation: {
        type: 'integer',
        enum: [-1, 0, 1]
      },
      rabies: {
        type: 'integer',
        enum: [-1, 0, 1]
      }
    }
  };

  const valid = ajv.validate(req.body, schema);
  if (!valid) return res.status(BAD_REQUEST).json(ajv.errors);
}

module.exports = controller;
