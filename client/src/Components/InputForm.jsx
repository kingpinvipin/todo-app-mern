import React from "react";
import { Button } from 'react-bootstrap';

const InputForm = props => {
    return (
      <form onSubmit={props.newItemSubmitHandler}  className="todoInput">
        <input
          className="input"
          type="text"
          onChange={props.handleItemInput}
          value={props.pendingItem}
          placeholder="Add an item"
      />
      <Button type="submit" name="submit" value="submit" className="btn">
        +
      </Button>
    </form>


  );
};

export default InputForm
