import { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const isValid = (enteredUsername, enteredUserAge) => {
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
    const enteredUsername = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if(!(isValid(enteredUsername, enteredUserAge ))) return;

    props.onAddUser(enteredUsername, enteredUserAge);
    
    // Note: Rarely use Ref to manipulate the DOM - avoid doing it.
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  }

  const errorhandler = () => {
    setError(null);
  }

  return (
    <Wrapper>
      {
        error && <ErrorModal title={error.title} message={error.message} onConfirm={errorhandler} />
      }
      
      <Card className={classes.card__form}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="userage">Age (Years)</label>
          <input 
            id="userage" 
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  )
}

export default AddUser;