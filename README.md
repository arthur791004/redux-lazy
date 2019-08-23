# redux-lazy

A syntax sugar for user to quickly create types, actions and reducer. You only need to give the mapping of action name and its handler, and then redux-lazy would generate all of you want.

## Installation

```sh
yarn add @arthur791004/redux-lazy
```

## Usages

### reduxLazy

a function needs `actions` and `initialState` as parameters and returns `types`, `actions` and `reducer` for you.

```ts
interface ActionHandler<State> {
  (state: State, payload: any): State;
}

type Actions<State> = {
  [key: string]: ActionHandler<State>;
};

type ActionCreators = {
  [key: string]: ActionCreator<AnyAction>;
};

type ActionTypes = {
  [key: string]: string;
};

interface ReduxLazy<State> {
  (actions: Actions<State>, initialState: State): {
    actions: ActionCreators;
    reducer: Reducer<State, AnyAction>;
    types: ActionTypes;
  };
}
```

#### Examples

```js
import { combineReducers, createStore } from 'redux';
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

const reducers = combineReducers({
  counter: reducer,
});

const store = createStore(reducers);

store.dispatch(actions.increment(5)); // state: { counter: { value: 5 } }
store.dispatch(actions.decrement(4)); // state: { counter: { value: 1 } }
```
