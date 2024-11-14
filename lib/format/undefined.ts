const $type = 'undefined';

const to = () => {
  return [
    $type,
    'undefined',
  ]
}

const from = () => {
  return undefined;
}

export default [$type, from, to];