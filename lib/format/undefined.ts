const $type = 'undefined';

const to = () => {
  return {
    $type,
    $value: 'undefined'
  }
}

const from = () => {
  return undefined;
}

export default [$type, from, to];