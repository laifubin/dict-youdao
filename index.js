
const params = process.argv.slice(2)
const ora = require('ora')
const chalk = require('chalk')
const packageJson = require('./package.json');
const lang = require('./src/lang.js')

;(async () => {
  const first = params.slice(0, 1).join()
  if(['-v', '-V', '--version'].includes(first)) {
    return console.log(packageJson.version)
  } else if(['-h', '--help', undefined].includes(first)) {
    return console.log(`Usage: dict [options] [<words>]\n
    -v, -V, --version       print dict-youdao version\n
    -h, -H, --help          print dict-youdao command line options\n
    --lang=[en|fr|ko|ja]    print or set translation lang (中英en、中法fr、中韩ko、中日ja)
    -d <words>              fuzzy query translation results\n
    <words>                 accurately query translation results `)
  } else if(first.startsWith('--lang')) {    
    if(first === '--lang') {
      const msg = {
        en: '中英',
        fr: '中法',
        ko: '中韩',
        ja: '中日'
      }[lang.lang]
      return console.log(msg)
    }
    const l = first.split('=').pop().trim()
    return lang.set(l)
  } 

  const spinner = ora().start()
  const isFuzzySearch = first === '-d'
  const words = isFuzzySearch ? params.slice(1).join(' ') : params.join(' ')  
  console.log(words, lang.lang);
  try {
    const response = await require('./src/index.js')(encodeURIComponent(words), lang.lang)
    const result = JSON.parse(response||"{}")
    
    console.log(result.result?.msg)

    if(result.result.code === 200) {
      const list = result.data?.entries ?? []
      const { entry, explain } = list.find(item => item.entry === words) ?? {}
      if(isFuzzySearch) {
        const text = list.map(item => {
          return item.explain ? `${item.entry}:  ${item.explain}\n` : false
        }).filter(Boolean)
        
        return spinner.succeed(chalk.green(text.join()))
      }
      
      spinner.succeed(chalk.green(`${entry}: ${explain}`))
    } else {
      spinner.fail(chalk.red(`查询无结果 ${words}`))
    }
  } catch (err) {
    spinner.fail(chalk.red(`查询失败 ${ err }`))
  }
})()
