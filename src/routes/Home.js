import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../store";
import Todo from "../components/Todo";

function Home({ todo, dispatchAddTodo }) {
    console.log(todo);

    const [text, setText] = useState("");

    const onChangeText = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(text);
        setText("");
        dispatchAddTodo(text);
    };

    return (
        <>
            <h1>To do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChangeText} />
                <button>+</button>
            </form>
            <ul>
                {todo.map((el) => (
                    <Todo {...el} key={el.id} />
                ))}
            </ul>
        </>
    );
}

const mapStateToProps = (state) => {
    return { todo: state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddTodo: (text) => {
            dispatch(addTodo(text));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
