const ratelimit = function(ip) {
    var jsonFile = require('ratelimits.json')
    var oldtime = jsonFile[ip]["old"]
    if (typeof(window.oldTime) != "number") {
        window.oldTime = Date.now()   
    } else {
        var time = Date.now()
        if (time - window.oldTime > 5000) {
            return true
        } else {
            return false
        }
        fs.writeFile('ratelimits.json', data, err => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
    }
}
