import React, { Component } from 'react';
import './item-add-form.css'

export default class ItemAddForm extends Component {
    state = {
        label:""
    }
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({//обнуляем поле
            label: ''
        });
    };
    render() {
        // const { onItemAdded } = this.props;

        return (
            <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}
            >
                <input type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="Todo"
                    value={this.state.label}//обнуляем поле
                />
                <button
                    className="btn btn-outline-secondary"
                    // onClick={() => { onItemAdded('ddddd') }}
                >
                    Add Item
                    </button>
            </form>
        )
    }
}