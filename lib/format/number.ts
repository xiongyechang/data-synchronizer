const $type = 'number';

const to = (value: number) => {
  return [
    $type,
    value.toString()
  ];
}

const from = (value: string) => +value;

export default [$type, from, to];