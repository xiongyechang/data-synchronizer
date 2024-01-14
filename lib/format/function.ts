const $type = 'function'

const to = (value: Function) => ({
  $type,
  $value: value.toString(),
})

const from = (value: string) => {
  const funcBody = value.startsWith('function') ? value: 'function ' + value;
  return new Function('...rest', 'return (' + funcBody + ')(...rest)');
}

export default [$type, from, to];