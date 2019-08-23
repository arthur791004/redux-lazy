import { combineReducers, createStore } from 'redux';
import reduxLazy from '../src';

type CounterState = {
  value: number;
};

type AppState = {
  counter: CounterState;
};

const initialState: CounterState = {
  value: 0,
};

const { actions, reducer } = reduxLazy<CounterState>(
  {
    increment: (state: CounterState, payload: number): CounterState => ({
      value: state.value + payload,
    }),

    decrement: (state: CounterState, payload: number): CounterState => ({
      value: state.value - payload,
    }),
  },
  initialState
);

const reducers = combineReducers<AppState>({
  counter: reducer,
});

const store = createStore(reducers);

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(actions.increment(5));
store.dispatch(actions.decrement(4));

unsubscribe();
