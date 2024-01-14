import { DataSynchronizer } from 'lib/DataSynchronizer';

const instance = new DataSynchronizer({
  chan: 'chan',
})

type A = {
  hello: string;
  world: number;
}

instance.sendMessage<A>({
  hello: 'hello',
  world: 1111,
})

instance.onMessage((p) => {
  console.log(p);
})