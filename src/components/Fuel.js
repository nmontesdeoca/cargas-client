import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import NumberFormat from 'react-number-format';

const Fuel = ({ fuel, isLast, onClickRemoveFuel }) => (
    <ListItem key={fuel.id} divider={!isLast}>
        <ListItemText
            primary={fuel.name}
            secondary={
                <NumberFormat
                    value={fuel.cost}
                    displayType={'text'}
                    decimalSeparator={','}
                    thousandSeparator={'.'}
                    prefix={'$'}
                />
            }
        />
        <DeleteIcon onClick={() => onClickRemoveFuel(fuel)} />
    </ListItem>
);

export default Fuel;
