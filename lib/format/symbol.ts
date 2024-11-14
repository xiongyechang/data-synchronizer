const $type = 'symbol';

const to = (value: symbol) => {
  return [
    $type,
    value.description
  ]
}

const from = (value: string) => {
  return Symbol.for(value);
}

export default [$type, from, to];