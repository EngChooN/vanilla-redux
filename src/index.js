import { legacy_createStore } from "redux";

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// vanilla js example
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

// pure redux example
const countModifier = (state = 0, action) => {
    console.log("action", action);
    // plus action
    if (action.type === "plus") {
        console.log("plus");
        return state + 1;
    }
    // minus action
    if (action.type === "minus") {
        console.log("minus");
        return state - 1;
    }

    return state;
};
const countStore = legacy_createStore(countModifier);

const clickPlus = () => {
    countStore.dispatch({ type: "plus" });
};

const clickMinus = () => {
    countStore.dispatch({ type: "minus" });
};

// subscribe: if change state value, run this function
countStore.subscribe(() => {
    number.innerText = countStore.getState();
});

plus.addEventListener("click", clickPlus);
minus.addEventListener("click", clickMinus);

number.innerText = countStore.getState(); // first paint count 0
