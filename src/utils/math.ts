export type Operation = ['+' | '-' | '*' | '/' | '^' | '%'];

export function containsMathExpr(text: string | undefined): boolean {
  if (text === undefined) {
    return false;
  }
  const re = /\s*([-+]?)(\d+)(?:\s*([-+*/^%])\s*((?:\s[-+])?\d+)\s*)+/gm;
  return text.match(re) != null;
}

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
