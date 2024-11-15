const $type = 'generatorfunction';

const to = (value: Function) => {
  let funcString = value.toString();
  if (funcString.startsWith("*")) {
    funcString = `function ${funcString}`;
  }
  return [
    $type,
    funcString.toString(),
  ];
}

const from = (value: string) => {
  const arrowFunc = new Function(`return ${value}`);
  return arrowFunc();
}

export default [$type, from, to];