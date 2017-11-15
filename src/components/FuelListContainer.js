import { connect } from 'react-redux';
import { removeFuel } from '../actions';
import FuelList from './FuelList';

const mapStateToProps = (state, ownProps) => {
    return {
        fuels: state.fuels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeFuel: id => {
            dispatch(removeFuel(id));
        }
    };
};

const FuelListContainer = connect(mapStateToProps, mapDispatchToProps)(
    FuelList
);

export default FuelListContainer;
