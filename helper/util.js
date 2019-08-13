function parseJsonAsync(jsonString) {
    return new Promise(resolve => {
      setTimeout(() => {
        
        resolve(JSON.parse(jsonString))
      })
    })
  }

  module.exports = parseJsonAsync;