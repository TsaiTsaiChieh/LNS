const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class AxiosGetMethodError extends ExtendableError {
  constructor(message = 'Axios GET 請求失敗', status = 50000, isPublic = true, code = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status, isPublic, code);
    // this.name = 'LoginError';
  }
}

class MongoDBError extends ExtendableError {
  constructor(message = 'MongoDB 錯誤', status = 50001, isPublic = true, code = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status, isPublic, code);
    // this.name = 'LoginError';
  }
}
module.exports = {
  AxiosGetMethodError,
  MongoDBError
};
