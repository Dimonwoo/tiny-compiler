const typeCodeMapping = new Map([
  [-1, '错误'],
  [1, '标识符'],
  [2, '整数'],
  [3, '浮点数'],
  [5, '字符串'],
  [6, '关键字'],
  [7, '分界符'],
  [8, '运算符'],
])
export class Token {
  constructor(code, value, err) {
    this.type = typeCodeMapping.get(code) + ' ' + (err ?? '')
    this.code = code
    this.value = value
    this.index = Token.prototype.index++
  }
}
Token.prototype.index = 1

// 产生式
export class Product {
  constructor(left, right) {
    this.left = left //左部
    this.right = right //右部
  }
}

// LR(0)项目
export class Item {
  constructor(left, right, index) {
    this.left = left //产生式左部
    this.right = right //产生式右部
    this.index = index //圆点坐标
  }
}
