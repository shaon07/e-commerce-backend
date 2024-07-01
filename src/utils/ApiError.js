export class ApiError{
    constructor(statusCode, message="", status="",stack = '') {
      this.statusCode = statusCode;
      this.message = message;
      this.status= status || "fail";
    }
  }
  