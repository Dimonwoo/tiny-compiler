import { Token } from '@/utils/types'
import { keywords, operators, delimiters } from '@/utils/constants'

const SINGLEDIGIT = /^[0-9]$/ //个位数，0-9
const SPACE = /^\s+$/ //空格
const SPACEINSTARTANDEND = /(^\s*)|(\s*$)/g
const LETTER = /[a-zA-Z]/
// 词法分析主函数
export function lexicalAnalyze(sourceCode) {
  console.log('源代码：\n', sourceCode)
  const lineList = preprocess(sourceCode)
  const token = tokenizer(lineList)
  return token
}

// 1，预处理：删除空白字符及注释
function preprocess(sourceCode) {
  const res = []
  const lineList = sourceCode.split('\n')
  let inMLComment = false //在多行注释内部

  // 遍历代码字符串的每一行->删除注释
  for (let line of lineList) {
    let index = -1
    // 当前处于多行注释中，且遇到多行注释结束符，改变当前行的值继续处理
    index = line.indexOf('*/')
    if (index !== -1 && inMLComment) {
      line = line.slice(index + 2, line.length)
      inMLComment = false
    }
    if (inMLComment) continue

    // 删除编译文件引入行，例如#include<stdlib.h>
    if (line.indexOf('#') !== -1) continue

    // 删除单行注释，保留之前内容
    index = line.indexOf('//')
    if (index !== -1) {
      if (!SPACE.test(line.slice(0, index))) res.push(line.slice(0, index))
      continue
    }
    // 删除多行注释
    index = line.indexOf('/*')
    if (index !== -1) {
      if (!SPACE.test(line.slice(0, index))) res.push(line.slice(0, index))
      inMLComment = true
      continue
    }
    // 最终将行处理一下插入到结果数组中
    res.push(
      line
        .split(/\s+/)
        .map((v) => v + ' ')
        .join('')
    )
  }
  const preprocessedCode = res.filter((v) => !SPACE.test(v))
  console.log('预处理后的源代码：\n', preprocessedCode)
  return preprocessedCode
}

// 2,tokenizer->词法分析过程
function tokenizer(lineList) {
  Token.prototype.index = 1

  const res = []

  for (const row of lineList) {
    const line = row.replace(SPACEINSTARTANDEND, '') // 删除句子前后空白字符

    for (let i = 0; i < line.length; i++) {
      let tempArray = []
      let tempString = ''
      if (line[i] === ' ' || !line[i]) continue
      // 第一优先级：分界符和运算符
      // 7 - 分界符：分界符均为单字符
      if (delimiters.has(line[i])) {
        res.push(new Token(7, line[i]))
        continue
      }
      // 8 - 运算符：分为单字符运算符和双字符运算符
      // 因为双字符运算符的第一个字符一定也是一个运算符，所以不用分开讨论
      if (operators.has(line[i])) {
        tempString = line[i++]
        // 双字符超前搜索
        if (operators.has(tempString + line[i])) tempString += line[i]
        res.push(new Token(8, tempString))
        continue
      }

      // 第二优先级：浮点数、整数、字符串
      // 3 - 浮点数，2 - 整数
      if (SINGLEDIGIT.test(line[i])) {
        tempArray = [] // 用以接收未知长度的数字
        while (SINGLEDIGIT.test(line[i]) || line[i] == '.') {
          tempArray.push(line[i++])
          if (i > line.length - 1) break
        }

        // 防止出现数字开头的非法标识符
        if (
          line[i] == ' ' ||
          i === line.length ||
          SINGLEDIGIT.test(line[i]) ||
          operators.has(line[i]) ||
          delimiters.has(line[i])
        ) {
          if (tempArray.indexOf('.') >= 0) {
            const index = tempArray.indexOf('.')
            if (tempArray.slice(index + 1).indexOf('.') > 0)
              res.push(new Token(-1, tempArray.join(''), '非法浮点数'))
            else res.push(new Token(3, tempArray.join('')))
          } else res.push(new Token(2, tempArray.join('')))
        } else {
          // 恐慌模式匹配错误
          while (true) {
            if (
              i > line.length - 1 ||
              line[i] == ' ' ||
              operators.has(line[i]) ||
              delimiters.has(line[i])
            )
              break
            else tempArray.push(line[i++])
          }
          res.push(new Token(-1, tempArray.join(''), '非法标识符'))
        }
        i--
        continue
      }

      // 5 - 字符串
      if (line[i] == '"' || line[i] == "'") {
        const mark = line[i++]
        tempArray = []
        while (line[i] != mark) {
          tempArray.push(line[i++])
          if (i >= line.length - 1) break
        }
        tempArray = tempArray.join('')
        // 引号闭合与未闭合的情况
        if (line[i] === mark) res.push(new Token(5, tempArray))
        else res.push(new Token(-1, tempArray, '引号未闭合'))
        continue
      }

      // 第三优先级：关键词、标识符
      // 6 - 关键词，1 - 标识符
      tempArray = []
      tempString = ''
      while (true) {
        if (
          i > line.length - 1 ||
          line[i] == ' ' ||
          operators.has(line[i]) ||
          delimiters.has(line[i])
        )
          break
        else tempArray.push(line[i++])
      }
      tempString = tempArray.join('')
      if (keywords.has(tempString)) res.push(new Token(6, tempString))
      else {
        if (!(tempString[0].match(LETTER) || tempString[0] == '_'))
          res.push(new Token(-1, tempArray, '非法标识符'))
        else res.push(new Token(1, tempArray))
      }
      i--
    }
  }
  console.log('词法分析后的Token：\n', res)
  return res
}
