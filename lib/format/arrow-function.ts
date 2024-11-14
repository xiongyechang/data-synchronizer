const $type = 'arrowFunction';

const to = (value: Function) => ({
  $type,
  $value: value.toString(),
})

const from = (value: string) => {
  const arrowFunc = new Function(`return ${value}`);
  return arrowFunc();
}

export default [$type, from, to];