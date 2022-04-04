import React from "react";

import classes from './Card.module.css';

type Props = {
    children: React.ReactChild | React.ReactChild[]
};

const Card: React.VFC<Props> = (props) => {
    return (<div className={classes.card}>{props.children}</div>);
};

export default Card;