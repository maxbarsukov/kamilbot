import { parentPort } from "worker_threads";

const abs = (n) => (n < 0n) ? -n : n;

function computeMathExpr(me) {
  const [ op1, operator, op2 ] = me;
  const res = compute(op1, operator, op2);
  if (res === 'Fuck u!') return `>> ${computeToExpr(op1, operator, op2)}`
  const result = Number(res);

  if ((result === 110 || result === 110) && operator == '+') return `${op1} ${operator} ${op2} = 100`;
  if (op1 == 2n && operator == '+' && op2 == 2n) return '>> 2 + 2 = 32 / 8';
  if (op1 == -2n && operator == '-' && op2 == 2n) return '>> -2 - 2 = -32 / 8';
  if (op1 == -2n && operator == '+' && op2 == -2n) return '>> -2 + (-2) = -32 / 8';
  if (abs(op1) == 2n && operator == '^' && abs(op2) == 2n) return `>> ${op1} ^ ${op2} = ${Math.abs(result) == result ? '' : '-'}32 / 8`;

  if (abs(op1) == 32n && operator == '/' && abs(op2) == 8n) return `>> ${op1} / ${op2} = ${5 * (Math.abs(result) / result)}`;
  if (abs(op1) == 32n && operator == '/' && abs(op2) == 5n) return `>> ${op1} / ${op2} = ${8 * (Math.abs(result) / result)}`;
  if (abs(op1) == 8n && operator == '*' && abs(op2) == 5n) return `>> ${op1} * ${op2} = ${32 * (Math.abs(result) / result)}`;
  if (abs(op1) == 5n && operator == '*' && abs(op2) == 8n) return `>> ${op1} * ${op2} = ${32 * (Math.abs(result) / result)}`;
  if (abs(op1) == 32n && operator == '%' && abs(op2) == 8n) return `>> ${op1} % ${op2} = 0`;
  if (abs(op1) == 32n && operator == '%' && abs(op2) == 5n) return `>> ${op1} % ${op2} = 0`;

  if (abs(op1) == 2n && operator == '^' && abs(op2) == 5n) return '!!! Forbidden operation'
  if (abs(op1) == 32n && operator == '/' && abs(op2) == 4n) return '!!! Forbidden operation'
  if (abs(op1) == 32n && operator == '%' && abs(op2) == 4n) return '!!! Forbidden operation'
  if (abs(op1) == 40n && operator == '/' && abs(op2) == 8n) return '!!! Forbidden operation'
  if (abs(op1) == 8n && operator == '*' && abs(op2) == 4n) return '!!! Forbidden operation'
  if (abs(op1) == 4n && operator == '*' && abs(op2) == 8n) return '!!! Forbidden operation'

  if (op1 == 1000n && operator == '-' && op2 == 7n) return `>> У меня нет проблем, кроме моей башки ${computeToExpr(op1, operator, op2)}, я умер, прости.`
  if (operator == '-' && op2 == 7n) return `>> ${(Math.random() < 0.5) ? 'Этот ёбаный дождь нагоняет тоски' : 'И им всем никогда меня не победить'} ${computeToExpr(op1, operator, op2)}, я уже погиб.`
  if (operator == '+' && op2 == 7n) return `>> ${(Math.random() < 0.5) ? 'Этот славный денёк нагоняет радости' : 'И нам с друзьями очень весело жить'} ${computeToExpr(op1, operator, op2)}, я воскрес, спасибо, Господи!`
  return `>> ${computeToExpr(op1, operator, op2)}`
}

function computeToExpr(op1, operator, op2) {
  return `${op1} ${operator} ${op2} = ${compute(op1, operator, op2)}`;
}

function compute(op1, operator, op2) {
  const ops = {
    '+': (op1, op2) => op1 + op2,
    '^': (op1, op2) => op1 ** op2,
    '-': (op1, op2) => op1 - op2,
    '*': (op1, op2) => op1 * op2,
    '%': (op1, op2) => op1 % op2,
    '/': (op1, op2) => {
      if (op2 == 0n) {
        return 'Fuck u!';
      } else {
        return Number(op1) / Number(op2);
      }
    },
  };

  return ops[operator](op1, op2);
}

parentPort.on("message", (mes) => {
  const result = mes.map(me => computeMathExpr(me));
  parentPort.postMessage(result);
});
