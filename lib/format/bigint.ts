const $type = 'bigint';

const to = (value: bigint) => {
  return [
    $type,
    value.toString(),
  ]
}

const from = (value: string) => {
  return BigInt(value)
}

export default [$type, from, to];