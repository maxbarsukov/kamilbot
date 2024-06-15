export type Operation = ['+' | '-' | '*' | '/' | '^' | '%'];

export function containsMathExpr(text: string | undefined): boolean {
  if (text === undefined) {
    return false;
  }
  const re = /\s*([-+]?)(\d+)(?:\s*([-+*/^%])\s*((?:\s[-+])?\d+)\s*)+/gm;
  return text.match(re) != null;
}

const abs = (n: bigint): bigint => (n < 0n) ? -n : n;

export function getMathExprs(text: string | undefined): ([bigint, string, bigint])[] | null {
  if (text === undefined) {
    return null;
  }
  const re = /\s*([-+]?)(\d+)(?:\s*([-+*/^%])\s*((?:\s[-+])?\d+)\s*)+/gm;
  const mes = [...text.matchAll(re)];

  if (mes == null || mes?.length == 0) {
    return null;
  }

  return mes.map((groups) => {
    const op1 = (groups[1] == '-') ? -BigInt(groups[2]) : BigInt(groups[2]);
    const op2 = BigInt(groups[4]);
    return [op1, groups[3], op2];
  });
}

export function computeMathExpr(me: [bigint, string, bigint]): string {
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

function computeToExpr(op1: bigint, operator: string, op2: bigint): string {
  return `${op1} ${operator} ${op2} = ${compute(op1, operator, op2)}`;
}

function compute(op1: bigint, operator: string, op2: bigint): bigint | number | 'Fuck u!' {
  const ops = {
    '+': (op1: bigint, op2: bigint): bigint => op1 + op2,
    '^': (op1: bigint, op2: bigint): bigint => op1 ** op2,
    '-': (op1: bigint, op2: bigint): bigint => op1 - op2,
    '*': (op1: bigint, op2: bigint): bigint => op1 * op2,
    '%': (op1: bigint, op2: bigint): bigint => op1 % op2,
    '/': (op1: bigint, op2: bigint) => {
      if (op2 == 0n) {
        return 'Fuck u!';
      } else {
        return Number(op1) / Number(op2);
      }
    },
  };

  return ops[operator as keyof typeof ops](op1, op2);
}
