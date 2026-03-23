# typescript-algorithm-and-data-structure

A lightweight TypeScript repository for learning and practicing classic data structures.

## Included modules

- Linked list
- Queue by array
- Queue by linked list
- Stack by array
- Stack by linked list
- Binary search tree

## Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build publishable files:

```bash
npm run build
```

## Usage

### ESM root import

```ts
import { BinarySearchTree, LinkedList } from 'typescript-algorithm-and-data-structure';

const bst = new BinarySearchTree<number>();
bst.insert(3);
bst.insert(1);
bst.insert(5);
```

### ESM subpath import

```ts
import { BinarySearchTree } from 'typescript-algorithm-and-data-structure/data-structure/tree';
import { Comparator } from 'typescript-algorithm-and-data-structure/utils/Comparator';
```

### Fine-grained direct import

```ts
import BinarySearchTree from 'typescript-algorithm-and-data-structure/data-structure/tree/BinarySearchTree';
import QueueByArray from 'typescript-algorithm-and-data-structure/data-structure/queue/QueueByArray';
import Comparator from 'typescript-algorithm-and-data-structure/utils/Comparator';
```

### Type import

```ts
import type {
  BinarySearchTreeInterface,
  BinaryTreeOrderCallbackType,
} from 'typescript-algorithm-and-data-structure/data-structure/tree';
```

### CommonJS require

```js
const {
  BinarySearchTree,
  LinkedList,
} = require('typescript-algorithm-and-data-structure');
```

## Source layout

- `src/data-structure/linked-list`
- `src/data-structure/queue`
- `src/data-structure/stack`
- `src/data-structure/tree`
- `src/utils`

## Package output

The repository provides:

- `src/index.ts` as the root source entry
- `dist/index.js` as the CommonJS runtime entry after build
- `dist/index.mjs` as the ESM runtime entry after build
- `dist/index.d.ts` as the package type entry after build

