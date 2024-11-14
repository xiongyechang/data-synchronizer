const $type = 'boolean';

const to = (value: boolean) => ({
  $type,
  $value: value
})

const from = (value: boolean) => value;

export default [$type, from, to];