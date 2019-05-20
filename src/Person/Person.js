import React from 'react';
// Lecture 68 - Added Radium
// Lecture 69 - CSS Modules, remove Radium
//import Radium from 'radium';

// to install Radium:
//      npm install --save radium

// Lecture 70 - change to classes import
//import './Person.css';
import classes from './Person.css';

// ES6 function code format
// props - all attributes that are passed into function
const person = (props) => {
    //return <p>I'm a Person and I am {Math.floor(Math.random() * 30)} years old!</p>
    //return <p>I'm {props.name} and I am {props.age} years old!</p>
    // Lecture 68 - Radium
    //   <div className="Person" style={style}>

    return (
        // Lecture 70 - change to class object name instead of string
        //<div className="Person">
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

//export default Radium(person);
export default person;