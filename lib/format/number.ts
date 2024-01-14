const $type = 'number';

const to = (value: number) => ({
  $type,
  $value: '' + value
})

const from = (value: string) => +value

export default [$type, from, to];