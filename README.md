# List

---

## Index
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
  - [groupBy](#groupBy)
  - [mapBy](#mapBy)
  - [sum](#sum)

---

## Installation
```sh
yarn add @codura/list
```
---

## Usage
```ts
List.from([1, 2, 3]).toArray();
```
---

## Methods

### groupBy

Group an array to a map using a **key function**

```ts
const users = [
  {id: 1, group: 1, name: 'John'},
  {id: 2, group: 2, name: 'Jane'},
  {id: 3, group: 1, name: 'Joe'},
];
const usersByGroup = users.groupBy(user => user.group);
```

Group an array to a map using a **key function** and a **value function**

```ts
const users = [
  {id: 1, group: 1, name: 'John'},
  {id: 2, group: 2, name: 'Jane'},
  {id: 3, group: 1, name: 'Joe'},
];
const userNamesById = users.groupBy(user => user.group, user => user.name);
```

---

### mapBy

Map an array to a map using a **key function**

```ts
const users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Joe'},
];
const usersById = users.mapBy(user => user.id);
```

Map an array to a map using a **key function** and a **value function**

```ts
const users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Joe'},
];
const userNamesById = users.mapBy(user => user.id, user => user.name);
```

---

### sum

Sum addable objects in an array

```ts
class Payment {
  constructor(readonly note: string, readonly amount: number) {
  }

  add(payment: Payment) {
    return new Payment(this.note, this.amount + payment.amount);
  }
}

const payments = [
  new Payment('first', 100),
  new Payment('second', 200),
  new Payment('third', 300),
];
const sum = payments.sum(new Payment('sum', 0));
```
