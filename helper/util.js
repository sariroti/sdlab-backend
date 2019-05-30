function parseJsonAsync(jsonString) {
    return new Promise(resolve => {
      setTimeout(() => {
          console.log(jsonString);
        resolve(JSON.parse(jsonString))
      })
    })
  }

  module.exports = parseJsonAsync;