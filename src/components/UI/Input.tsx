import React from 'react';
import classes from './Input.module.css';

type Props = {
    label: string,
    input: React.InputHTMLAttributes<HTMLElement>
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} ref={ref} />
    </div>
})

export default Input;