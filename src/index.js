const request = require('request')
const url = 'https://aidemo.youdao.com/trans'
module.exports = words => {
  const form = {q: words, from: 'Auto', to: 'Auto'}
  return new Promise((resolve, reject)=>{
    request.post({ url, form }, function(err, httpResponse, body){ 
      if (err) {
        console.error('error:', err)
        reject(err)
      }
      const res = JSON.parse(body)
      const { explains, 'uk-phonetic': uk, 'us-phonetic': us } = res.basic || { explains: res.translation }
      const data = `${ uk ? '英[' + uk + ']' : '' } ${ us ? '美[' + us + ']' : '' } ${ explains.join(' ') }`
      resolve(data)
     })
  })
}