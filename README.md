# data-synchronizer
---
A common library for transferring data to multi-page applications.

## Background
As we all know, every page run in diffurent Javascript context in multi-page applications. so that, we can't to transfer data in `global variable`、`publish-subscribe`、`observer` etc ways. so, I developed the lib to handle this problem. if your app is a single page app, please use others libs.

## Requirements
---
*ES5* & *Browser*

## Install
Using npm:
```
npm install data-synchronizer --save
```

Using yarn:
```
yarn add data-synchronizer
```

Using pnpm:
```
pnpm install data-synchronizer --save
```

## Functional Usage
For example, create two pages `list` and `details`

```typescript
// list.vue
import { ref } from 'vue';
import { useDataSynchronizer } from 'data-synchronizer';

const chan = 'cancelLike';

type Listitem = {
  id: number;
  title: string;
  like: number;
}

// Let's say the list contains 100 pieces of data
const list = ref<Listitem[]>([
  {
    id: 0,
    title: 'learning javascript',
    like: 2
  },
  ...
  {
    id: 99,
    title: 'learning javascript',
    like: 9
  },
])

const { onMessage, onSendMessageError, close } = useDataSynchronizer({
  chan,
  // engine: 'LocalStorage' | 'BroadcastChannel' // optional
});

onSendMessageError((event: DOMException | MessageEvent) => {
  console.error(event)
});

onMessage((params: Listitem) => {
  const target = list.value.find(item => item.id === params.id);
  target && target.like = params.like;
  // the like of target will decrease by 1.
})

close(); // execute close will cann't receive data
```

```typescript
// details.vue

import { useDataSynchronizer } from 'data-synchronizer';

const chan = 'cancelLike'; // the chan must be same with previous.

const { sendMessage } = useDataSynchronizer({
  chan,
  // engine: 'LocalStorage' | 'BroadcastChannel' // optional
});

type Listitem = {
  id: number;
  title: string;
  like: number;
}

const cancelLike = (item: Listitem) => {
  item.like--;
  sendMessage(item);
}
```

## Class Usage
```typescript
import { ref } from 'vue';
import { DataSynchronizer } from 'data-synchronizer';

const chan = 'cancelLike';

type Listitem = {
  id: number;
  title: string;
  like: number;
}

// Let's say the list contains 100 pieces of data
const list = ref<Listitem[]>([
  {
    id: 0,
    title: 'learning javascript',
    like: 2
  },
  ...
  {
    id: 99,
    title: 'learning javascript',
    like: 9
  },
])

const instance = new DataSynchronizer({
  chan // required
  // engine: 'LocalStorage' | 'BroadcastChannel' // optional
});

instance.onSendMessageError((event: DOMException | MessageEvent) => {
  console.error(event)
});

instance.onMessage((params: Listitem) => {
  const target = list.value.find(item => item.id === params.id);
  target && target.like = params.like;
  // the like of target will decrease by 1.
})

instance.close(); // execute close will cann't receive data
```


```typescript
// details.vue

import { DataSynchronizer } from 'data-synchronizer';

const chan = 'cancelLike'; // the chan must be same with previous.

const instance = new DataSynchronizer({
  chan,
  // engine: 'LocalStorage' | 'BroadcastChannel' // optional
});

type Listitem = {
  id: number;
  title: string;
  like: number;
}

const cancelLike = (item: Listitem) => {
  item.like--;
  instance.sendMessage(item);
}
```

## types
- DataSynchronizer
```typescript

type Engine = 'LocalStorage' | 'BroadcastChannel'

type Options = {
  chan: string;
  engine?: Engine; // default value is 'BroadcastChannel'
};

type Result = {
  onMessage: (args: any) => void;
  sendMessage: (o: any, target?: string | RegExp) => void,
  onSendMessageError: (args: any) => void;
  close: () => void;
}

type DataSynchronizer = (options: Options) => Result;
```

## Future

### appoint receive end. 
So far, the library sends data through broadcast, which means that every Same-Origin page will receive the data. This approach might be unreasonable. [accomplished]

### server end transfer data
Currently, the library can only transfer data within the same browser. Moving forward, I will consider the possibility of transferring data between different browsers!

### plugin or middleware

### custom engine


