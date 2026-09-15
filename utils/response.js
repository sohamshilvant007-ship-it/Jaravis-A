function success(data = null, message = "Success") {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

function failure(message = "Something went wrong", code = 500) {
  return {
    success: false,
    error: message,
    code,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  success,
  failure
};
