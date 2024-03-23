const request = require('request')
let url = 'https://dict.youdao.com/suggest?'
module.exports = (words, lang) => {
  const params = { q: words, num: 5, ver: 3.0, doctype: 'json', cache: false, le: lang || 'en' }
  Object.entries(params).forEach(([key, val]) => {
    url += `${key}=${val}&`
  })
  // console.log(url);
  return new Promise((resolve, reject)=>{
    request(url, function(err, httpResponse, body){ 
      if (err) {
        console.error('error:', err)
        reject(err)
      }
    
      resolve(body)
     })
  })
}