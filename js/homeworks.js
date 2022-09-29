// variables globales:

const form = document.querySelector("#form-todo");

const input_add_homework = document.querySelector("#input_add");
const list_homework = document.getElementById('todo-list');

let homeworks = [];

// funciones:
function item_create(activity) {
    let item = {
        activity: activity,
        estado: false,
    }
    homeworks.push(item);
    return item;
}

function save_to_db() {
    localStorage.setItem('homeworks',JSON.stringify(homeworks)); 
}
const startDB = () => {
    list_homework.innerHTML = '';
    if (homeworks == null) {
        homeworks = [];
    }else {
        homeworks = JSON.parse(localStorage.getItem('homeworks'));
        console.log("entro en el foreach");
        homeworks.forEach((element) => {
            list_homework.innerHTML += 
            `  
                <div class="todo">
                    <h3>TareA 1</h3>
                    <P>Aprender los fundamentos de la programacio</P>
                </div>
            `
        });
    }
}


// EventListener:
form.addEventListener('submit',(e) => {
    e.preventDefault();
    let input_activity = input_add_homework.value;
    item_create(input_activity);
    save_to_db();
    form.reset();  // reinicionando el formulario
});


document.addEventListener('DOMContentLoaded',startDB);

