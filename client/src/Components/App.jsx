import React from 'react';
import axios from 'axios';
import'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import InputForm from './InputForm';
import List from './List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist : [],
      pendingItem : "",
      msg:"",
    };
  }

  handleItemInput = e => {
    this.setState({
      pendingItem:e.target.value,
    });
  }

  newItemSubmitHandler = e => {
    e.preventDefault();
    if(this.state.pendingItem.trim() !== '') {
      this.addItem();
    }
  };

  handleRemove = name => {
    this.delItem(name); 
  };

  getTodoList(){
    const url = 'http://localhost:5000';
    axios.get(url)
       .then(response => this.setState({todolist:response.data}))
       .catch(err => err);
  }

  addItem() {
    const options = {
      url : 'http://localhost:5000/add',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{
        name:this.state.pendingItem.trim()
      }
    };

    axios(options)
        .then(response => {
          if(response.data === "") {
            this.setState({pendingItem:""});
          }
          this.setState({
            msg:response.data,
          });
        })
        .catch(err => err);
  }

  delItem(name) {
    const options = {
      url : 'http://localhost:5000/del/' + name,
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    axios(options)
        .then(response => {
          this.setState({
            msg:"",
          });
        })
        .catch(err => err);
  }

  componentDidMount() {
    this.getTodoList();
  }

  componentDidUpdate() {
    this.getTodoList();
  }


  render() {
    return (
      <div className="wrapper">
        <InputForm
          handleItemInput={this.handleItemInput}
          newItemSubmitHandler={this.newItemSubmitHandler}
          pendingItem={this.state.pendingItem}
        />
        <div className="main">
        <List
            list={this.state.todolist}
            handleRemove={this.handleRemove}
            msg={this.state.msg}
        />
        </div>
      </div>
    );
  }
}

export default App
