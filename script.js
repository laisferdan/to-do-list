const form = document.querySelector('form[name="to-do-form"]');
const buttonSubmit = document.getElementById("button-submit");
const buttonClear = document.getElementById("button-clear");
const toDoList = document.getElementById("to-do-list");
let index = 0;

function submitInput() {
    const formDataEntries = new FormData(form).entries();

    const array = Array.from(formDataEntries);

    function callback([key, value]) {
        return { [key]: value }
    };

    const arrayObject = Array.from(array, callback);

    const objectForm = Object.assign(...arrayObject);
    addItem(objectForm);
}

function addItem(objectForm) {
    if (Object.values(objectForm)[0] === "") {
        return false;
    }
    else {
        const toDoItem = {
            value: Object.values(objectForm),
            checked: false,
            color: getPastelColor(),
        }

        toDoList.innerHTML += `
            <div class = "to-do-items" id= "${index}">
            <i 
                class="bi ${toDoItem.checked ? "bi-check-circle-fill" : "bi-circle"}"
                data-action="check"
            ></i>
            <p class="" data-action="check" style="background-color : ${toDoItem.color}; border-radius:"20px">${toDoItem.value[0]}</p>
            </div>
            `;

        index++;
    }
}

buttonSubmit.addEventListener("click", submitInput());

buttonClear.addEventListener("click", () => {
    const removeAllItems = document.querySelectorAll(".to-do-items");
    removeAllItems.forEach(item => {
        item.remove();
    });
});


function getPastelColor() {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}