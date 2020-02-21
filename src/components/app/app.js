import React, { Component } from 'react';
import './app.css';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '..//item-add-form'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
            // { label: 'Drink Coffee', important: false, id: 1 },
            // { label: 'Make Awesome App', important: true, id: 2 },
            // { label: 'Have a lunch', important: false, id: 3 }
        ],
        term: '',
        filter: 'all',//active all done
    }
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);//findindex-стандартная ф-ция
            // реализация удаления элементов списка
            const before = todoData.slice(0, idx);//до удаленного эл-та не меняя исходный массив
            const after = todoData.slice(idx + 1);//после
            const newArray = [...before, ...after]
            return {
                todoData: newArray
            }
        })

    };
    addItem = (text) => {
        //generate id
        const newItem = this.createTodoItem(text);
        //add item
        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArray,

            };
        });

    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);//findindex-стандартная ф-ция
        //update object
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };//меняем значение на противоположное, предварительно заспредив существующие данные.
        //берем старый массив и меняем в нем элемент done, передавая его 2м аргументом

        // construct new array
        return [//меняем элемент в массиве на новый(выполненное дело в списке)
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {//эту ф-цию прокидываем => TodoList=>вызываем аж в Todo-ListItem, id передастся в компоненте TodoList
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });

    }
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item) => !item.done);
            case "done":
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onSearchChange = (term) => {
        this.setState({ term });
    };
    onFilterChange = (filter) =>{
        this.setState({filter})
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(//сначала проверяем на //active all done
            this.search(todoData, term), filter);//затем поиск
        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList todos={visibleItems}
                    onDeleted={this.deleteItem}//передаем функцию пропсой в компонент Todolist
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }

};