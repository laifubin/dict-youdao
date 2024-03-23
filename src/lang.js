const fs = require('fs');
require('dotenv').config()

module.exports = {
  lang: process.env.env_lang,
  set: function (v) {
     // 中英en、中法fr、中韩ko、中日ja
    if(['en', 'fr', 'ko', 'ja'].includes(v)) {
      // 读取文件内容
      fs.readFile('.env', 'utf8', (err, data) => {
        if (err) return
        const text = 'env_lang=' + v
        // 写入修改后的内容到文件
        fs.writeFile('.env', text, 'utf8', (err) => {
            if (err) return
        });
      });
    } else {
      console.error('仅支持中英en、中法fr、中韩ko、中日ja')
    }
  }
}