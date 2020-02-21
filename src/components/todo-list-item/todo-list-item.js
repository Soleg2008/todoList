import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     done: false,
  //     important: false,
  //   }
    // this.onLabelClick = () => {
      // гарантировано меняем стейт, стейт может сразу не меняться при постоянной смене тру на фолс или счетчик...
    //   this.setState((state) => {
    //     return {
    //       done: !this.state.done
    //     };
    //   });
    // }
  // }


  // или синтаксис 2018 аналог конструктора
  // state = {
  //   done: false
  // }
  // onLabelClick = () => {
  //   console.log(`${this.props.label}`)
  // }

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, done, important } = this.props;//приняли функцию из пропсов
    let classNames = 'todo-list-item';

    if (done) {
      classNames += ' done';
    }
    if (important) {
      classNames += ' important'
    }
    return (

      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}
        >
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"

        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    )

  }
}