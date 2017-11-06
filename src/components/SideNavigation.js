import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = {
    noDecoration: {
        textDecoration: 'none'
    },
    sideNavigation: {
        width: 250
    }
};

const SideNavigation = ({ open, onRequestClose, classes }) => (
    <Drawer open={open} onRequestClose={onRequestClose}>
        <List className={classes.sideNavigation}>
            <Link to="/" className={classes.noDecoration}>
                <ListItem onClick={onRequestClose}>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            <Link to="/fuels" className={classes.noDecoration}>
                <ListItem onClick={onRequestClose}>
                    <ListItemText primary="Fuels" />
                </ListItem>
            </Link>
        </List>
    </Drawer>
);

export default withStyles(styles)(SideNavigation);
