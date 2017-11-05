import React from 'react';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../css/Fuels.css';

const Fuels = ({ fuels, onClick }) => (
    <div>
        <List>
            {fuels.map(fuel => (
                <ListItem
                    key={fuel.id}
                    insetChildren={true}
                    primaryText={fuel.name}
                    secondaryText={fuel.cost}
                />
            ))}
        </List>
        <FloatingActionButton
            onClick={onClick}
            secondary={true}
            className="floating-action-button"
        >
            <ContentAdd />
        </FloatingActionButton>
    </div>
);

export default Fuels;
