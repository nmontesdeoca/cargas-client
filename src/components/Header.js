import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const Header = ({ onMenuClick }) => (
    <AppBar>
        <Toolbar>
            <IconButton
                color="contrast"
                aria-label="Menu"
                onClick={onMenuClick}
            >
                <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
                CarGas
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;
