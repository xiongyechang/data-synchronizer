const $type = 'number';

const to = (value: number) => ([
  $type,
  value
])

const from = (value: number) => value

export default [$type, from, to];