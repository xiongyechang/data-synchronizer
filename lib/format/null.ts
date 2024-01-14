const $type = 'null';

const to = (value: null) => {
  return {
    $type,
    $value: '' + value
  }
}

const from = (value: string) => {
  return null;
}

export default [$type, from, to];