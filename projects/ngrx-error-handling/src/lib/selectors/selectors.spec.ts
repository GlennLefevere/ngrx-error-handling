import {initialState} from '../../../../demo/src/app/store/reducer';
import {selectErrors} from './selectors';

describe('selectors', () => {

  it('should select errors', () => {
    const errors = [{message: 'test'}];
    const state = {...initialState, errors};

    const result = selectErrors.projector(state);
    expect(result).toEqual(errors);
  });
});
