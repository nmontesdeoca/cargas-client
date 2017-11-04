import expect from 'expect';
import * as actions from '../../app/actions';
import * as types from '../../app/constants/actionTypes';

describe('Fuels Actions', () => {

    it('addFuel should create ADD_FUEL action', () => {
        const name = 'Super';
        const cost = 42.5;

        expect(actions.addFuel(name, cost)).toEqual({
            type: types.ADD_FUEL,
            name,
            cost
        });
    });

    it('updateFuel should create UPDATE_FUEL action', () => {
        const id = 1;
        const name = 'Super 95';
        const cost = 45.0;

        expect(actions.updateFuel(id, name, cost)).toEqual({
            type: types.UPDATE_FUEL,
            id,
            name,
            cost
        });
    });

    it('removeFuel should create REMOVE_FUEL action', () => {
        const id = 1;

        expect(actions.removeFuel(id)).toEqual({
            type: types.REMOVE_FUEL,
            id
        });
    });
});
