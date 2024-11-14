const $type = 'null';

const to = (value: null) => {
  return {
    $type,
    $value: '' + value
  }
}

const from = () => {
  return null;
}

export default [$type, from, to];