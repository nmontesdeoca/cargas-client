import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    button: {
        bottom: 20,
        position: 'fixed',
        right: 20
    }
});

const Fuels = ({ fuels, onClick, classes }) => (
    <div>
        <List>
            {fuels.map(fuel => (
                <ListItem key={fuel.id}>
                    <ListItemText primary={fuel.name} secondary={fuel.cost} />
                </ListItem>
            ))}
        </List>
        <Button
            fab
            color="primary"
            aria-label="add"
            onClick={onClick}
            className={classes.button}
        >
            <AddIcon />
        </Button>
    </div>
);

export default withStyles(styles)(Fuels);
