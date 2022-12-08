const fs = require('fs')


const ratelimit = function(ip) {
    var jsonFile = require('ratelimits.json')
    var oldtime = jsonFile[ip]["old"]
    if (typeof(oldtime) != "number") {
        oldtime = Date.now()
        jsonFile[ip]["old"] = oldtime
        fs.writeFile('ratelimits.json', jsonFile, err => {
          if (err) {
            throw err
          }
        })
    } else {
        var time = Date.now()
        if (time - oldtime > 5000) {
            return true
        } else {
            return false
        }
        jsonFile[ip]["old"] = oldtime
        fs.writeFile('ratelimits.json', jsonFile, err => {
          if (err) {
            throw err
          }
        })
    }
}
export ratelimit
