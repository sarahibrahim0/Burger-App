import React from 'react';

import classes from './ToggleButton.css';

const ToggleButton = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default ToggleButton;