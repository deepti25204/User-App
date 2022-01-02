import { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';

import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredUserAge, setEnteredUserAge] = useState('');

  const [error, setError] = useState();

  const isValid = () => {
    if(enteredUsername.trim().length === 0 || enteredUserAge.trim().length === 0 ) {
      setError({
        title: 'Invalid error',
        message: 'Please enter a valid name and age (non-empty values)'
      });
      return false;
    }
    if(+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).'
      })
      return false;
    }
    return true;
  }

  const addUserHandler = event => {
    event.preventDefault();
    if(!(isValid())) return;

    props.onAddUser(enteredUsername, enteredUserAge);
    
    setEnteredUsername('');
    setEnteredUserAge('');
  }

  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  }

  const userAgeChangeHandler = event => {
    setEnteredUserAge(event.target.value);
  }

  const errorhandler = () => {
    setError(null);
  }

  return (
    <div>
      {
        error && <ErrorModal title={error.title} message={error.message} onConfirm={errorhandler} />
      }
      
      <Card className={classes.card__form}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler} 
          />
          <label htmlFor="userage">Age (Years)</label>
          <input 
            id="userage" 
            type="number"
            value={enteredUserAge}
            onChange={userAgeChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser;