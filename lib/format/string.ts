const $type = 'string';

const to = (value: string) => ([
  $type,
  value
])

const from = (value: string) => value

export default [$type, from, to];