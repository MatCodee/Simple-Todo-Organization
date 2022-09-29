// variables globales:

const form = document.querySelector("#form-todo");

const input_add_homework = document.querySelector("#input_add");
const list_homework = document.getElementById('todo-list');

let homeworks = [];

// funciones:
function item_create(activity) {
    let item = {
        activity: activity,
        state: false,
    }
    homeworks.push(item);
    return item;
}

function save_to_db() {
    localStorage.setItem('homeworks',JSON.stringify(homeworks));
    startDB(); // actualizar le html en el momento que modificamos el local Store
}



const startDB = () => {
    list_homework.innerHTML = '';
    homeworks = JSON.parse(localStorage.getItem('homeworks'));
    if (homeworks == null) {
        homeworks = [];
    }else {
        console.log("entro en el foreach");
        homeworks.forEach((element) => {
            list_homework.innerHTML += 
            `  
                <div class="todo" id="todo_id">
                    <h3>${element.activity}</h3>
                    <P>Estado:  ${element.state == true ? "Realizado" : "No realizado"}</P>
                    <div>
                        <span id="button_check"> <i class="fa fa-check"></i> </span>
                        <span id="button_delete"> <i class="fa fa-trash"></i> </span>
                    </div>
                </div>
            `
        });
    }
}

const delete_db = (activity) => {
    let indexArray;    
    homeworks.forEach((e,index) => {
        if(e.activity === activity) {
            indexArray = index;
        }
    });
   console.log(indexArray);
    homeworks.splice(indexArray,1);
    save_to_db();
}
const check_db = (activity) => {
    let indexArray;
    homeworks.forEach((e,index) => {
        if(e.activity === activity) {
            indexArray = index;
        }
    });
    homeworks[indexArray].state = !homeworks[indexArray].state;
    save_to_db();
}



// EventListener:
form.addEventListener('submit',(e) => {
    e.preventDefault();
    if(input_add_homework.value != "") {
        let input_activity = input_add_homework.value;
        item_create(input_activity);
        save_to_db();
    }
    form.reset();  // reinicionando el formulario
});

// detectar el botton ene el momento que se debe
list_homework.addEventListener('click',(e) => {
    e.preventDefault();
    let name_homework = e.path[3].childNodes[1].innerHTML;

    if(e.target.className === "fa fa-check" || e.target.className === "fa fa-trash") {
        if(e.target.className === "fa fa-check") {
            check_db(name_homework);
        }
        if(e.target.className === "fa fa-trash") {
            delete_db(name_homework);
        }
    }

});

document.addEventListener('DOMContentLoaded',startDB);

