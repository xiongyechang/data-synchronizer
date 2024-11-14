const $type = 'asyncfunction';

const to = (value: Function) => {
  let funcString = value.toString();
  if (!funcString.startsWith('async function')) {
    funcString = funcString.replace('async', 'async function');
  }
  return ({
    $type,
    $value: funcString,
  });
}

const from = (value: string) => {
  const arrowFunc = new Function(`return ${value}`);
  return arrowFunc();
}

export default [$type, from, to];