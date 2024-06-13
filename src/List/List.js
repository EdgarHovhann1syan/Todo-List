import React, { useState, useEffect } from 'react';
import "./List.css";
import Todo from "../Todo/Todo";

function List() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (input.trim() === "") {
            return;
        }
        setTodos(prevTodos => [...prevTodos, input]);
        setInput("");
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
        setTodos(newTodos);
    };

    const updateDescription = (index, newDescription) => {
        const newTodos = [...todos];
        newTodos[index] = newDescription;
        setTodos(newTodos);
    };

    return (
        <div className="container">
            <div className="inputContainer">
                <input 
                    type="text" 
                    value={input} 
                    placeholder="Write Your Todo" 
                    onChange={(evt) => setInput(evt.target.value)}
                />
                <div className="Buttons">
                    <button className="addButton" onClick={addTodo}>Add</button>
                </div>
            </div>
            <div className="todoItemsContainer">
                {todos.map((todo, index) => (
                    <Todo 
                        key={index} 
                        index={index} 
                        description={todo} 
                        delete={deleteTodo} 
                        updateDescription={updateDescription}
                    />
                ))}
            </div>
        </div>
    );
}

export default List;
