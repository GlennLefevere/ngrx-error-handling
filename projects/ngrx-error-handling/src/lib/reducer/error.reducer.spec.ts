import {reducer} from './error.reducer';
import {addError, removeError} from '../actions/actions';

describe('error-reducer', () => {

  it('should persist on add error', () => {
    const error = {message: 'error'};
    const state = [] as any[];
    const expectedResult = [error];

    const result = reducer.errors(state, addError({error}));
    expect(result).toEqual(expectedResult);
  });

  it('should persist on remove error', () => {
    const error = {message: 'error'};
    const state = [error] as any[];
    const expectedResult = [] as any[];

    const result = reducer.errors(state, removeError({error}));
    expect(result).toEqual(expectedResult);
  });
});
