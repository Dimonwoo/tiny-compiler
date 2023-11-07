import { Token } from '@/utils/types'
import { keywords, operators, delimiters } from '@/utils/constants'
// 总过程
export function lexicalAnalyse (str) {
  console.log('源代码：\n', str)
  const lineList = preprocess(str)
  const token = process(lineList)
  return token
}

function isDigit (ch) {
  return ch.charCodeAt() - 48 >= 0 && ch.charCodeAt() - 48 <= 9;
}

// 源代码串的预处理过程，删除空白字符及注释
function preprocess (str) {
  const res = [], space = /^\s+$/, lineList = str.split('\n')
  let inMLComment = false
  for (let line of lineList) {
    let index = -1
    // 当前处于多行注释中，且遇到多行注释结束符，改变当前行的值继续处理
    index = line.indexOf('*/')
    if (index !== -1 && inMLComment) {
      line = line.slice(index + 2, line.length)
      inMLComment = false
    }
    if (inMLComment) continue

    // 删除编译文件引入行
    if (line.indexOf('#') !== -1) continue
    // 删除注释，保留之前内容
    index = line.indexOf('//')
    if (index !== -1) {
      if (!space.test(line.slice(0, index))) res.push(line.slice(0, index))
      continue
    }
    index = line.indexOf('/*')
    if (index !== -1) {
      if (!space.test(line.slice(0, index))) res.push(line.slice(0, index))
      inMLComment = true
      continue
    }
    // 最终将行处理一下插入到结果数组中
    res.push(line.split(/\s+/).map(v => v + ' ').join(''))
  }
  console.log('预处理后的源代码：\n', res.filter(v => !space.test(v)))
  return res.filter(v => !space.test(v))
}

function process (lineList) {
  Token.prototype.index = 1
  const res = []
  for (const row of lineList) {
    const line = row.replace(/(^\s*)|(\s*$)/g, "")  // 删除句子前后空白字符
    for (let i = 0; i < line.length; i++) {
      let temp = ''
      if (line[i] === ' ' || !line[i]) continue
      // 7 - 分界符：分界符均为单字符，记录到单词序列中。优先级：1
      if (delimiters.has(line[i])) {
        res.push(new Token(7, line[i]))
        continue
      }

      // 8 - 运算符：分为单字符运算符和双字符运算符，解析后记录到单词序列中。优先级：1
      // 因为双字符运算符的第一个字符一定也是一个运算符，所以不用分开讨论
      if (operators.has(line[i])) {
        temp = line[i++]
        // 双字符超前搜索
        if (operators.has(temp + line[i])) temp += line[i]
        res.push(new Token(8, temp))
        continue
      }

      // 3 - 浮点数，2 - 整数。优先级：2
      if (isDigit(line[i])) {
        temp = []  // 用以接收未知长度的数字
        while (isDigit(line[i]) || line[i] == '.') {
          temp.push(line[i++])
          if (i > line.length - 1) break
        }

        // 防止出现数字开头的非法标识符
        if (line[i] == ' ' || i === line.length || isDigit(line[i]) || operators.has(line[i]) || delimiters.has(line[i])) {
          if (temp.indexOf('.') >= 0) {
            const index = temp.indexOf('.');
            if (temp.slice(index + 1).indexOf('.') > 0) res.push(new Token(-1, temp.join(''), "非法浮点数"))
            else res.push(new Token(3, temp.join('')))
          } else res.push(new Token(2, temp.join('')))
        } else {
          // 恐慌模式匹配错误
          while (true) {
            if (i > line.length - 1 || line[i] == ' ' || operators.has(line[i]) || delimiters.has(line[i])) break
            else temp.push(line[i++])
          }
          res.push(new Token(-1, temp.join(''), "非法标识符"))
        }
        i--
        continue
      }

      // 5 - 字符串.优先级：2
      if (line[i] == '"' || line[i] == "'") {
        const mark = line[i++]
        temp = []
        while (line[i] != mark) {
          temp.push(line[i++])
          if (i >= line.length - 1) break
        }
        temp = temp.join('')
        // 引号闭合与未闭合的情况
        if (line[i] === mark) res.push(new Token(5, temp))
        else res.push(new Token(-1, temp, "引号未闭合"))
        continue
      }

      // 6 - 关键词，1 - 标识符。优先级：3
      temp = []
      while (true) {
        if (i > line.length - 1 || line[i] == ' ' || operators.has(line[i]) || delimiters.has(line[i])) break
        else temp.push(line[i++])
      }
      temp = temp.join('')
      if (keywords.has(temp)) res.push(new Token(6, temp))
      else {
        if (!(temp[0].match(/[a-zA-Z]/) || temp[0] == "_")) res.push(new Token(-1, temp, "非法标识符"))
        else res.push(new Token(1, temp))
      }
      i--
    }
  }
  console.log('划分词类后的源代码：\n', res);
  return res
}