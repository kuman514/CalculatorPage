var calculatorValue = {
  curValue: '',
  isDouble: false,
  isNeg: false,
  writeValue: function () {
    if (this.curValue === '') {
      $("#result").text('0')
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
  erase: function () {
    if (this.curValue !== '') {
      if (this.curValue[this.curValue.length - 1] === '.') {
        this.isDouble = false
      }
      this.curValue = this.curValue.slice(0, -1)
    }
    this.writeValue()
  },
  clear: function () {
    this.curValue = ''
    this.isDouble = false
    this.isNeg = false
    this.writeValue()
  }
}
