
const words = process.argv.slice(2).join(' ')
const ora = require('ora')
const chalk = require('chalk')

;(async () => {
	const spinner = ora().start()
  try {
    const result = await require('./src/index.js')(words)
    spinner.succeed(chalk.green(result))
  } catch (err) {
    spinner.fail(chalk.red(`查询失败 ${ err }`))
  }
})()
