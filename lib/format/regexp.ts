const $type = 'regexp';

const to = (value: RegExp) => {
  return [
    $type,
    value.source,
  ]
}

const from = (value: string) => new RegExp(value);

export default [$type, from, to];