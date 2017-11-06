import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import '../css/SideNavigation.css';

const SideNavigation = ({ open, onRequestClose }) => (
    <Drawer open={open} onRequestClose={onRequestClose}>
        <List>
            <Link to="/" className="no-decoration">
                <ListItem onClick={onRequestClose}>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            <Link to="/fuels" className="no-decoration">
                <ListItem onClick={onRequestClose}>
                    <ListItemText primary="Fuels" />
                </ListItem>
            </Link>
        </List>
    </Drawer>
);

export default SideNavigation;
