# a calculate function

## calculate
only support add,minus,div and times calc, with bracket and negative number 

```js
import { calculate } from 'simple-calculate'

calculate('1+2') // 3
calculate('6/2*3') // 9
calculate('0.1+0.2') // 0.3
calculate('(0.1+-0.1)+((1+2)*3)') // 9
```

## preCheck
pre-check your str has some illegal letter
```js
import { preCheck } from 'simple-calculate'

preCheck('1+2') // true
preCheck('1 + 2') // false
preCheck('some letter') // false
```