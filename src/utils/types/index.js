const typeCodeMapping = new Map([[-1, '错误'], [1, '标识符'], [2, '整数'], [3, '浮点数'], [5, '字符串'], [6, '关键字'], [7, '分界符'], [8, '运算符']])
export class Token {
  constructor(code, value, err) {
    this.type = typeCodeMapping.get(code) + ' ' + (err ?? '')
    this.code = code
    this.value = value
    this.index = Token.prototype.index++
  }
}
Token.prototype.index = 1

// 产生式，两个属性代表左部和右部
export class Product {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

// LR(0)项目，三个属性分别表示产生式左部、右部和圆点坐标（在对应坐标字符的左侧）
export class Item {
  constructor(left, right, index) {
    this.left = left;
    this.right = right;
    this.index = index;
  }
}