import React, { useState, useEffect } from 'react';
import "./Todo.css";
import Modal from 'react-modal';

function Todo (props) {
    const [modalIsOpen, setModalState] = useState(false);
    const [inputValue, setInputValue] = useState(props.description);

    useEffect(() => {
        setInputValue(props.description);
    }, [props.description]);

    const openModal = (e) => {
        e.stopPropagation();
        setModalState(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setModalState(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        props.delete(props.index);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        props.updateDescription(props.index, e.target.value);
    };
  
    return (
        <div className="todoItem" onClick={openModal}>
            <p className="index">{props.index + 1}</p>
            <p>{props.description}</p>
            <button className="DeleteButton" onClick={handleDelete}>Delete</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Todo"
                ariaHideApp={false}
            >
                <div>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputChange}
                    />
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default Todo;
