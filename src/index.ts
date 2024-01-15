import { DataSynchronizer } from 'lib/DataSynchronizer';

const instance = new DataSynchronizer({
  chan: 'chan',
})

type A = {
  hello: string;
  world: number;
  map: Map<string, any>
}

const map = new Map()
map.set('name', {})
instance.sendMessage<A>({
  hello: 'hello',
  world: 1111,
  map,
})

instance.onMessage((p) => {
  console.log(p);
})