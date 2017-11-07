import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
    button: {
        bottom: 20,
        position: 'fixed',
        right: 20
    }
});

const Fuels = ({ fuels, addFuel, removeFuel, classes }) => (
    <div>
        <List>
            {fuels.map((fuel, index) => (
                <ListItem key={fuel.id} divider={index + 1 !== fuels.length}>
                    <ListItemText
                        primary={`${fuel.name} ${fuel.id.substring(0, 4)}`}
                        secondary={fuel.cost}
                    />
                    <DeleteIcon onClick={() => removeFuel(fuel.id)} />
                </ListItem>
            ))}
        </List>
        <Button
            fab
            color="primary"
            aria-label="add"
            onClick={addFuel}
            className={classes.button}
        >
            <AddIcon />
        </Button>
    </div>
);

export default withStyles(styles)(Fuels);
