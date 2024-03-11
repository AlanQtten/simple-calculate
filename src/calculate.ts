import Big from 'big.js';

const countOf = (str: string, searchValue: string) => {
  return str
    .split('')
    .reduce((count, letter) => count + (searchValue === letter ? 1 : 0), 0);
};

const isCalcSymbol = (str: string) => /^[*/+-]*$/.test(str);

// 拆分算式为基础的数字和符号
const splitAsNumAndCalcSymbol = (str: string): string[] => {
  const list = [];
  const _list = str.split('');
  const l = _list.length;

  let temp = '';

  for (let i = 0; i < l; i++) {
    const letter = _list[i];

    if (
      !isCalcSymbol(letter) ||
      (letter === '-' && (i === 0 || isCalcSymbol(_list[i - 1])))
    ) {
      temp += letter;
    } else {
      list.push(temp, letter);
      temp = '';
    }
  }

  list.push(temp);

  return list;
};

// 计算不含括号的纯算式
const calcPureFormula = (formula: string) => {
  const _arr: Array<string | Big> = splitAsNumAndCalcSymbol(formula);

  const handler = (index: number, f: 'add' | 'minus' | 'div' | 'times') => {
    _arr.splice(
      index - 1,
      3,
      new Big(_arr[index - 1])[f](new Big(_arr[index + 1]))
    );
  };

  while (_arr.length > 1) {
    // 优先乘除法
    const firstIndexTimesOfDiv = _arr.findIndex(
      (letter) => letter === '*' || letter === '/'
    );
    if (firstIndexTimesOfDiv !== -1) {
      handler(
        firstIndexTimesOfDiv,
        _arr[firstIndexTimesOfDiv] === '*' ? 'times' : 'div'
      );
    } else {
      // 加减法
      const indexOfAddSymbol = _arr.indexOf('+');
      if (indexOfAddSymbol !== -1) {
        handler(indexOfAddSymbol, 'add');
      }

      const indexOfReduceSymbol = _arr.indexOf('-');
      if (indexOfReduceSymbol !== -1) {
        handler(indexOfReduceSymbol, 'minus');
      }
    }
  }

  return _arr.pop().toString();
};

// 计算函数
export default function calc(str: string) {
  let _str = str;
  if (countOf(_str, '(') !== countOf(_str, ')')) {
    return '';
  }

  while (_str.indexOf(')') !== -1) {
    const indexOfRightBracket = _str.indexOf(')');
    for (let i = indexOfRightBracket - 1; i >= 0; i--) {
      if (_str[i] === '(') {
        _str = `${_str.slice(0, i)}${calcPureFormula(
          _str.slice(i + 1, indexOfRightBracket)
        )}${_str.slice(indexOfRightBracket + 1)}`;
        break;
      }
    }
  }

  return calcPureFormula(_str);
}
