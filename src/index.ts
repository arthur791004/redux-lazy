import { AnyAction, ActionCreator, Reducer } from 'redux';
import generateUniqueId from './utils/generateUniqueId';
import { mapObjKey, mapObjValue } from './utils/object';

/**
 * Types
 */
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

/**
 * Utils
 */
const createActionTypes = <State>(actions: Actions<State>): ActionTypes => {
  const uniqueId = generateUniqueId();

  return mapObjValue(actions, actionName => `${uniqueId}/${actionName}`);
};

const createAction = (type: string): ActionCreator<AnyAction> => (
  payload: any
): AnyAction => ({
  type,
  payload,
});

const createReducer = <State>(
  types: ActionTypes,
  actions: Actions<State>,
  initialState: State
): Reducer<State> => (
  state: State = initialState,
  action: AnyAction
): State => {
  const { type, payload } = action;
  const uniqueActions = mapObjKey(actions, actionName => types[actionName]);
  if (Object.prototype.hasOwnProperty.call(uniqueActions, type)) {
    return uniqueActions[type](state, payload);
  }

  return state;
};

/**
 * Main
 */
const reduxLazy = <State>(
  actions: Actions<State>,
  initialState: State
): {
  actions: ActionCreators;
  reducer: Reducer<State, AnyAction>;
  types: ActionTypes;
} => {
  const types = createActionTypes<State>(actions);
  const reducer = createReducer<State>(types, actions, initialState);
  const reduxActions = mapObjValue(actions, actionName =>
    createAction(types[actionName])
  );

  return { actions: reduxActions, reducer, types };
};

export default reduxLazy;
