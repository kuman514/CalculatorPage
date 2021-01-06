var calculatorValue = {
  curValue: '',
  isDouble: false,
  isNeg: false,

  writeValue: function () {
    if (this.curValue === '') {
      $("#result").text('0')
    } else if (this.isNeg) {
      $("#result").text(['-', this.curValue].join(''))
    } else {
      $("#result").text(this.curValue)
    }
  },

  appendNumber: function (num) {
    switch (num) {
      case '0':
        if (this.curValue === '') {
          break
        }
      case '1': case '2': case '3':
      case '4': case '5': case '6':
      case '7': case '8': case '9':
        this.curValue = [this.curValue, num].join('')
        break
      case '.':
        if (!this.isDouble) {
          this.isDouble = true
          this.curValue = [this.curValue, num].join('')
        }
        break
      default:
    }
    this.writeValue()
  },

  negative: function() {
    if (this.curValue !== '') {
      this.isNeg = !this.isNeg
    }
    this.writeValue()
  },

  erase: function () {
    if (this.curValue !== '') {
      if (this.curValue[this.curValue.length - 1] === '.') {
        this.isDouble = false
      }
      this.curValue = this.curValue.slice(0, -1)
    }
    if (this.curValue === '') {
      this.isNeg = false
    }
    this.writeValue()
  },

  clear: function () {
    this.curValue = ''
    this.isDouble = false
    this.isNeg = false
    this.writeValue()
  },

  allClear: function () {
    this.clear()
    operation.reset()
  }
}

var operation = {
  unary: '',
  left: '',
  oper: '',
  right: '',

  writeValue: function () {
    $("#operation").text([this.unary, this.left, this.oper, this.right].join(' '))
  },

  equals: function () {
    let tmp = 0

    switch (this.unary) {
      case 'square':
        tmp = parseFloat(this.left)
        tmp = tmp * tmp
        break
      case 'sqrt':
        tmp = parseFloat(this.left)
        if (tmp < 0) {
          calculatorValue.clear()
          calculatorValue.curValue = "Imaginary"
          calculatorValue.writeValue()
          return
        }
        tmp = Math.sqrt(tmp)
        break
      case '1 /':
        tmp = parseFloat(this.left)
        tmp = 1 / tmp
        break
    }

    switch (this.oper) {
      case '+':
        tmp = parseFloat(this.left) + parseFloat(this.right)
        break
      case '-':
        tmp = parseFloat(this.left) - parseFloat(this.right)
        break
      case '*':
        tmp = parseFloat(this.left) * parseFloat(this.right)
        break
      case '/':
        tmp = parseFloat(this.left) / parseFloat(this.right)
        break
    }

    if (tmp < 0) {
      calculatorValue.isNeg = true
      tmp = -tmp
    } else {
      calculatorValue.isNeg = false
    }

    calculatorValue.curValue = String(tmp)
    if (tmp == parseInt(calculatorValue.curValue)) {
      calculatorValue.isDouble = false
    } else {
      calculatorValue.isDouble = true
    }

    calculatorValue.writeValue()
  },

  getValues: function (op) {
    switch (op) {
      case '+': case '-': case '*': case '/':
        if (this.left === '') {
          this.left = $("#result").text()
          this.oper = op
          calculatorValue.clear()
        } else if (this.right !== '') {
          this.reset()
          this.left = $("#result").text()
          this.oper = op
          calculatorValue.clear()
        }
        break
      case 'square': case 'sqrt': case '1 /':
        if (calculatorValue.curValue !== '') {
          this.reset()
          this.unary = op
          this.left = $("#result").text()
        }
        this.equals()
        break
      case '=':
        this.right = $("#result").text()
        this.equals()
      default:
    }
    this.writeValue()
  },

  reset: function () {
    this.unary = ''
    this.left = ''
    this.oper = ''
    this.right = ''
    this.writeValue()
  }
}
