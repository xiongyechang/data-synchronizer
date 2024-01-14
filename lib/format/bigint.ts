const $type = 'bigint';

const to = (value: bigint) => {
  return {
    $type,
    $value: '' + value
  }
}

const from = (value: string) => {
  return BigInt(value)
}

export default [$type, from, to];