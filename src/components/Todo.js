import React from "react";
import { connect } from "react-redux";
import { remove } from "../store";
import { Link } from "react-router-dom";

function Todo({ text, id, onClickDel }) {
    return (
        <li>
            <Link to={`/${id}`}>{text}</Link>
            <button onClick={onClickDel}>del</button>
        </li>
    );
}

const mapDispatchToProps = (dispatch, ownPros) => {
    // ownPros에는 모든 정보가 담겨있다. {text:"", id:""}
    return {
        onClickDel: () => dispatch(remove(ownPros.id)),
    };
};

export default connect(null, mapDispatchToProps)(Todo);
