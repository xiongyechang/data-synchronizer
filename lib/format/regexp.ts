const $type = 'regexp';

const to = (value: RegExp) => {
  return [
    $type,
    value.toString(),
  ]
}

const from = (value: string) => {
  // 去掉字符串中的前后斜杠
  const pattern = value.slice(1, value.lastIndexOf('/'));  // 获取模式部分
  const flags = value.slice(value.lastIndexOf('/') + 1);  // 获取标志部分
  // 使用 RegExp 构造函数创建正则表达式
  const regex = new RegExp(pattern, flags);
  return regex;
}

export default [$type, from, to];