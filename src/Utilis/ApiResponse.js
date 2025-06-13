class ApiResponse {
  constructor(statuscode, message = "SUCCESS", data = {}) {
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
    this.success = statuscode < 400;

    if (typeof data !== "object" || Array.isArray(data)) {
      this.data = { data };
    } else {
      this.data = data;
    }
  }
}

export { ApiResponse };
