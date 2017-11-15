import { connect } from 'react-redux';
import { addFuel } from '../actions';
import AddFuel from './AddFuel';

const mapDispatchToProps = dispatch => {
    return {
        addFuel: (name, cost) => {
            dispatch(addFuel(name, cost));
        }
    };
};

const AddFuelContainer = connect(null, mapDispatchToProps)(AddFuel);

export default AddFuelContainer;
