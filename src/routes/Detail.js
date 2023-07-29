import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({ todo }) {
    const id = useParams().id;
    const findTodo = todo.find((el) => el.id === parseInt(id));

    return (
        <>
            <h1>{findTodo.text}</h1>
        </>
    );
}

const mapStateToProps = (state) => {
    return { todo: state };
};

export default connect(mapStateToProps)(Detail);
