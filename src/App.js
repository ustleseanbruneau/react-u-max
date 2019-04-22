import React, { Component } from 'react';
import './App.css';
//import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';


class App extends Component {
  // Lecture 42 - useState() example, or React Hooks
  // React 16.8 -> new functionality useState()
  //  first element is always the current state
  //  second element allows update
  state = {
    persons: [
      { id: 'asfa', name: 'Sean', age: 28},
      { id: 'bdsa', name: 'Mary', age: 34 },
      { id: 'cads', name: 'Tom', age: 53 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  // setState - only available in React Components, not in functions
  // Don't do this:  this.state.persons[0].name = 'LeSean';
  // Lecture 44 - adds a dynamic parameter to switchNameHandler
  // switchNameHandler = () => {
  //   this.setState({persons: [
  //     { name: 'LeSean', age: 28 },
  //     { name: 'Mary', age: 34 },
  //     { name: 'Tom', age: 21 }

  //   ]})
  // }

  deletePersonHandler = (personIndex) => {
    // JavaScript - Objects and Arrays are reference types
    // .slice() makes copy of array, rather than point to reference
    //const persons = this.state.persons.slice();
    // spread operator, same as above
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );

    // this.setState({
    //   persons: [
    //     { name: 'LeSean', age: 28 },
    //     { name: event.target.value, age: 34 },
    //     { name: 'Tom', age: 21 }
    //   ]
    // })    
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    // Lecture 47 - add styling to button
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
/*       ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
 */
    } 

    let persons = null;

    // Lecture 53 - turn into list
    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id} 
                    changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
/*       style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
 */
    }

    //let classes = ['red', 'bold'].join(' ');
    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');  //classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');  // classes = ['red', 'bold']
    }

    // JSX Format
    //  Note:  className instead of class - class is a reserve word in React
    //      compiler will translate className to class in HTML DOM
    //  onClick - if you add () to function name, function will execute on page load
    // Lecture 44 - can pass down click handlers to children as a property
    //            - dynamically passing arguments
    // Lecture 65 - basic class assignment
    //        <p className={classes}>This is really working!</p>
    // Lecture 68 - use Radium,       <StyleRoot>        </StyleRoot>

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );

    // Other React JavaScript formats for same code above
    //return React.createElement('div', null, 'h1', 'Hi, I\'m a React App!!!');
    //return React.createElement('div', null, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    //return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hi, I\'m a React App!!!'));
  }
}

//export default Radium(App);
export default App;
