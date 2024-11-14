const $type = 'date'

const to =  (value: Date) => {
  return [
    $type,
    '' + value.getTime(),
  ]
}

const from = (value: string) => new Date(+value);

export default [$type, from, to];