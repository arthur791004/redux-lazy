# redux-lazy

a utils for user to create actions and reducer

## Installation

```sh
yarn add @arthur791004/redux-lazy
```

## Usages

### reduxLazy

```ts
type Action = {
  type: string;
  payload: Object;
};

type ActionCreator = (payload: Object): Action;

type ActionHandler = (state: Object, payload: Object): Object;

type Reducer = (state: Object, action: Action): Object;

type ReduxLazy = (
  reduxLazyActions: { [key: string]: ActionHandler },
  initialState: Object
): {
  actions: ActionCreator[];
  reducer: Reducer;
};
```

#### Examples

```js
import { createStore } from 'redux';
import reduxLazy from '@arthur791004/redux-lazy';

const initialState = {
  value: 0,
};

const { actions, reducer } = reduxLazy(
  {
    increment: (state, payload) => ({
      value: state.value + payload,
    }),

    decrement: (state, payload) => ({
      value: state.value - payload,
    }),
  },
  initialState
);

const store = createStore({
  counter: reducer,
});

store.dispatch(actions.increment(5)); // state: { counter: { value: 5 } }
store.dispatch(actions.decrement(4)); // state: { counter: { value: 1 } }
```
