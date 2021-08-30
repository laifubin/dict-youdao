
const words = process.argv.slice(2).join(' ')
const ora = require('ora')

;(async () => {
	const spinner = ora().start()
  try {
    const result = await require('./src/index.js')(words)
    spinner.succeed(result)
  } catch (err) {
    spinner.fail(`查询失败 ${ err }`)
  }
})()
