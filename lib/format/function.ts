const $type = 'function'

const to = (value: Function) => {
  return [
    $type,
    value.toString(),
  ]
}

const from = (value: string) => {
  const funcBody = value.startsWith('function') ? value: 'function ' + value;
  const func =  new Function(`return ${funcBody}`);
  return func();
}

export default [$type, from, to];