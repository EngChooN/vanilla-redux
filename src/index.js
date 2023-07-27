import { legacy_createStore } from "redux";

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// -------------------- vanilla js example --------------------
// let count = 0;

// const updateText = () => {
//     number.innerText = count;
// };

// updateText(); // first paint count 0

// const clickPlus = () => {
//     console.log("plus");
//     count++;
//     updateText();
// };

// const clickMinus = () => {
//     console.log("minus");
//     count--;
//     updateText();
// };

// plus.addEventListener("click", clickPlus);
// minus.addEventListener("click", clickMinus);

// -------------------- pure redux example --------------------
// const countModifier = (state = 0, action) => {
//     console.log("action", action);
//     // plus action
//     if (action.type === "plus") {
//         console.log("plus");
//         return state + 1;
//     }
//     // minus action
//     if (action.type === "minus") {
//         console.log("minus");
//         return state - 1;
//     }

//     return state;
// };
// const countStore = legacy_createStore(countModifier);

// const clickPlus = () => {
//     countStore.dispatch({ type: "plus" });
// };

// const clickMinus = () => {
//     countStore.dispatch({ type: "minus" });
// };

// // subscribe: if change state value, run this function
// countStore.subscribe(() => {
//     number.innerText = countStore.getState();
// });

// plus.addEventListener("click", clickPlus);
// minus.addEventListener("click", clickMinus);

// number.innerText = countStore.getState(); // first paint count 0

// -------------------- refactor redux code --------------------
/*
✅ reducer : 현재 상태의 application과 함께 불려지는 function (+ with action)
return하는 것은 application의 state가 됨
✅ action : reducer와 소통하는 방법으로 Object여야 하며 그 key 이름은 항상 type임 (바꿀 수 없음)
✅ dispatch : reducer에게 action을 보내는 방법
✅ subscribe : store의 변화를 감지하면 인자값으로 준 함수를 실행
✅ switch가 자주 쓰임
switch(action.type){
case ..blah..:
return smth
case ..blah2..:
return smth2
default:
return smth3
}
✅ string으로 바로 쓰는 대신에 const variable로 선언해서 사용하기 -> 에러 발견 용이
*/

// action types variable
const PLUS = "plus";
const MINUS = "minus";

const countModifier = (state = 0, action) => {
    console.log("action", action);

    switch (action.type) {
        // plus action
        case PLUS: {
            console.log("plus");
            return state + 1;
        }
        // minus action
        case MINUS: {
            console.log("minus");
            return state - 1;
        }

        default:
            return state;
    }
};
const countStore = legacy_createStore(countModifier);

const clickPlus = () => {
    countStore.dispatch({ type: PLUS });
};

const clickMinus = () => {
    if (countStore.getState() <= 0) {
        return;
    } else {
        countStore.dispatch({ type: MINUS });
    }
};

// subscribe: if change state value, run this function
countStore.subscribe(() => {
    number.innerText = countStore.getState();
});

plus.addEventListener("click", clickPlus);
minus.addEventListener("click", clickMinus);

number.innerText = countStore.getState(); // first paint count 0

// -------------------- try use vanilla js, make to do list --------------------
// const form = document.querySelector("form");
// const input = document.querySelector("input");
// const ul = document.querySelector("ul");

// const createToDo = (toDo) => {
//     const li = document.createElement("li");
//     li.innerText = toDo;
//     ul.appendChild(li);
// };

// const onSubmit = (e) => {
//     e.preventDefault();
//     const toDo = input.value;
//     input.value = "";
//     createToDo(toDo);
// };

// form.addEventListener("submit", onSubmit);

// -------------------- try use pure redux, make to do list --------------------
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const addTodo = (toDo) => {
    todoStore.dispatch({ type: ADD, content: toDo, id: Date.now() });
};

const deleteTodo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    todoStore.dispatch({ type: Delete, id: id });
};

const onSubmit = (e) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    addTodo(toDo);
};

const ADD = "add";
const Delete = "delete";

const todoReducer = (todo = [], action) => {
    console.log(action);
    console.log(todo);
    switch (action.type) {
        case ADD:
            const newTodo = { content: action.content, id: Date.now() };
            return [newTodo, ...todo];
        case Delete: {
            const deletedTodo = todo.filter((el) => el.id !== action.id);
            return deletedTodo;
        }
        default:
            return todo;
    }
};

const todoStore = legacy_createStore(todoReducer);

todoStore.subscribe(() => {
    const todoList = todoStore.getState();
    ul.innerHTML = "";
    todoList.forEach((el) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerText = "del";
        button.addEventListener("click", deleteTodo);
        li.id = el.id;
        li.innerText = el.content;
        li.appendChild(button);
        ul.appendChild(li);
    });
});

form.addEventListener("submit", onSubmit);
