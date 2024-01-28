export const chan1 = 'chan_1';

export const chan2 = 'chan_2';

export const chan3 = 'chan_3';

const set = new Set();

set.add(1).add('2').add(true).add([1, '2', false]).add({
  key: 'log',
  value: function (msg) { console.log(msg) }
})

const map = new Map();

map.set('name', 'xiongyechang').set(1, 1).set({
  lastname: 'xiong'
}, {
  firstname: 'yechang'
}).set([1,1,0], {
  a: 'a',
  b: 'b'
}).set('function', {
  handle(a, b, c) {
    console.log('handle:', a, b, c);
  }
})

export const data = {
  data: 110,
  name: 'huka',
  finished: true,
  store: {
    a: {
      b: 'data.a.b'
    }
  },
  bigint: BigInt(111),
  sy: Symbol('he'),
  reg: /hello world/,
  date: new Date(),
  set,
  map,
  array: [11, '22', set, true, false, {
    name: 'xiongyechang',
    getName() {
      return this.name;
    }
  }],
  printData: function(a, b, c) {
    console.log(a, b, c);
  },
  value: null,
  undef: undefined,
  // promise: new Promise((resolve) => {
  //   resolve(1);
  // })
  // 不支持
  // sayHello: () => {
  //   console.log('hello');
  // }
}
