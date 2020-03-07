import React from "react";
import { Button } from 'react-bootstrap';

const ListItem = props => {
  return (
    <li>
        {props.item}
        <Button className="action" onClick={() => {props.handleRemove(props.item)}}>
        Remove
        </Button>
    </li>
  );
};

export default ListItem
