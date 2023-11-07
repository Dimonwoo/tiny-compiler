import { Product } from '@/utils/types'

export const exampleSourceCode = `
// 单行注释shfuifhuo
int main(int a, int b){
  int res;
  res = a + b;
  char d = '1';
  /*
  if (a < 0){
      res = -a;
  }
  else{
      while (b > 0){
          b = b-1;
      }
      res = 0;
  }
  */ int xx = 1; /*
    ashdafgh
  */
}
`

// 关键字
export const keywords = new Set([
  'char', 'double', 'enum', 'float',  // 数据类型关键字
  'int', 'long', 'short', 'signed',
  'struct', 'union', 'unsigned', 'void',
  'for', 'do', 'while', 'break', 'continue',  // 控制语句关键字
  'if', 'else', 'goto',
  'switch', 'case', 'functionault', 'return',
  'auto', 'extern', 'register', 'static',  // 存储类型关键字
  'const', 'sizeof', 'typefunction', 'volatile'  // 其他关键字
])
// 运算符
export const operators = new Set(['+', '-', '*', '/', '%', '++', '--',  // 算术运算符
  '==', '!=', '>', '<', '>=', '<=',  // 关系运算符
  '&', '|', // 按位与，按位或（也是逻辑运算符的先导符）
  '&&', '||', '!',  // 逻辑运算符
  '=', '+=', '-=', '+=', '/=', '%=',  // 赋值运算符
])
// 分界符
export const delimiters = new Set(['{', '}', '[', ']', '(', ')', ',', '.', ';'])

// 文法
export const G = {
  // 文法的开始符号
  'S': '程序',
  // 非终结符集
  'V': ['程序', '函数定义', '形式参数', '代码块', '变量类型', '算术表达式', '布尔表达式', '比较运算符', '算术运算符'],
  // 终结符集
  'T': ['id', 'value', '(', ')', '{', '}', ',', ';', '=', 'while', 'if', 'else', 'return', 'int', 'float', 'double', 'bool', 'char', '&&', '||', '!', 'true', 'false', '<', '>', '<=', '>=', '==', '!=', '-', '+', '*', '/'],
  // 产生式集
  'P': [
    new Product('程序', ['函数定义']),
    new Product('函数定义', ['函数定义', '函数定义']),
    new Product('函数定义', ['变量类型', 'id', '(', ')', '{', '代码块', '}']),
    new Product('函数定义', ['变量类型', 'id', '(', '形式参数', ')', '{', '代码块', '}']),
    new Product('形式参数', ['变量类型', 'id']),
    new Product('形式参数', ['变量类型', 'id', ',', '形式参数']),

    new Product('代码块', ['代码块', '代码块']),
    new Product('代码块', ['变量类型', 'id', ';']),
    new Product('代码块', ['变量类型', 'id', '=', '算术表达式', ';']),
    new Product('代码块', ['id', '=', '算术表达式', ';']),
    new Product('代码块', ['while', '(', '布尔表达式', ')', '{', '代码块', '}']),
    new Product('代码块', ['if', '(', '布尔表达式', ')', '{', '代码块', '}']),
    new Product('代码块', ['if', '(', '布尔表达式', ')', '{', '代码块', '}', 'else', '{', '代码块', '}']),
    new Product('代码块', ['return', ';']),
    new Product('代码块', ['return', '算术表达式', ';']),
    new Product('变量类型', ['int']),
    new Product('变量类型', ['float']),
    new Product('变量类型', ['double']),
    new Product('变量类型', ['bool']),
    new Product('变量类型', ['char']),

    new Product('算术表达式', ['算术表达式', '算术运算符', '算术表达式']),
    new Product('算术表达式', ['-', '算术表达式']),
    new Product('算术表达式', ['(', '算术表达式', ')']),
    new Product('算术表达式', ['id']),
    new Product('算术表达式', ['value']),
    new Product('布尔表达式', ['算术表达式', '比较运算符', '算术表达式']),
    new Product('布尔表达式', ['布尔表达式', '&&', '布尔表达式']),
    new Product('布尔表达式', ['布尔表达式', '||', '布尔表达式']),
    new Product('布尔表达式', ['!', '布尔表达式']),
    new Product('布尔表达式', ['(', '布尔表达式', ')']),
    new Product('布尔表达式', ['true']),
    new Product('布尔表达式', ['false']),

    new Product('比较运算符', ['<']),
    new Product('比较运算符', ['>']),
    new Product('比较运算符', ['<=']),
    new Product('比较运算符', ['>=']),
    new Product('比较运算符', ['==']),
    new Product('比较运算符', ['!=']),
    new Product('算术运算符', ['+']),
    new Product('算术运算符', ['-']),
    new Product('算术运算符', ['*']),
    new Product('算术运算符', ['/']),
  ]
};