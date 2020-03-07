import React from "react" ;
import ListItem from "./ListItem";

const List = props => {
    return (
      <ul>
      <h4 className="msg">{props.msg}</h4>
        {props.list.map((item, index) => (
          <ListItem
            key={index}
            item={item.name}
            handleRemove={props.handleRemove}
          />
        ))}
      </ul>
    );
  };

export default List
