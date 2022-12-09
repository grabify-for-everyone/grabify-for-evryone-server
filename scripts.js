const fs = require('fs')
const https = require('https');

const writeToJsonFile = (filePath, data) => {
  const jsonData = JSON.stringify(data);

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        let json = {};
        try {
          json = JSON.parse(data);
        } catch (err) {
          reject(err);
          return;
        }
        resolve(json);
      });
    });
  });
}

const rateLimiter = (req, res, next) => {
  var data = JSON.parse(fs.readFileSync("./ratelimits.json", "utf-8"))
  const ip = req.ip;

  try {
    if (data[ip] != null) {
      var timeSinceLastRequest = Date.now() - parseInt(data[ip]);
      if (timeSinceLastRequest < 5 * 1000) {
        res.status(429).send('Too many requests from this IP, please try again later');
        return;
      }
    }
  } catch {}

  data[ip] = Date.now()
  writeToJsonFile("./ratelimits.json", data);
  next();
};
function ipinfo(userAgent, req) {
  
  //return makeRequest("https://ip.seeip.org/json/")
  //fetch("https://ip.seeip.org/json/").then(res => res.json()).then(data => Ip = data['ip'])
  //fetch(`https://vpnapi.io/api/${Ip}/`).then(res => res.json()).then(data => IpLog = data)
  //IpLog["userAgent"] = userAgent
  //fetch(`https://ipapi.co/${Ip}/json/`).then(res => res.json()).then(data => IpLog2 = data)

}
module.exports = { ipinfo, rateLimiter, writeToJsonFile }
