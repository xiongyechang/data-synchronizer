const $type = 'boolean';

const to = (value: boolean) => ({
  $type,
  $value: value
})

const from = (value: string) =>  value === 'true'

export default [$type, from, to];