const editField = document.getElementById('edit-field');
let list = [

  {title: 'First', done: true},
  {title: 'Second', done: false},
];
let currentIndex;

    renderList();

function makeDone(order){
    list[order].done = !list[order].done;
    renderList();
}

function addToDo() {
    let toDoInput = document.getElementById('input');
    let toDoInputValue = toDoInput.value;
    if (toDoInputValue) {
        list.push({title: toDoInputValue, done: false});
    }
    toDoInput.value = '';
    console.log(list);
    renderList();
}

function renderList() {

    const table = document.getElementById('list');

    table.innerHTML = '';

    list.forEach((item, i) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let done = document.createElement('i');
        done.className = 'far fa-square';
        done.setAttribute('order', i);
        done.addEventListener('click', e=> {

            makeDone(e.target.getAttribute('order'))
        });
        if(item.done) {
            tr.className = 'done';
            done.className = 'fas fa-square';
        }

        let td2 = document.createElement('td');


        td2.innerHTML = item.title;

        td1.appendChild(done);
        tr.appendChild(td1);
        tr.appendChild(td2);

        let td3 = document.createElement('td')
        let edit = document.createElement('i');
        edit.className = 'fas fa-user-edit';
        edit.setAttribute('order', i);
        edit.setAttribute('data-toggle', 'modal');
        edit.setAttribute('data-target', '#myModal');
        edit.addEventListener('click', e=> {
            currentIndex = e.target.getAttribute('order');
            editField.value = list[currentIndex].title
        });

        td3.appendChild(edit);
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        let del = document.createElement('i');
        del.className = 'fas fa-trash-alt';
        del.setAttribute('order', i);
        del.addEventListener('click', e=> {
            deleteTask(e.target.getAttribute('order'));
        } );

        td4.appendChild(del);
        tr.appendChild(td4);



    table.appendChild(tr);


    });

}

function deleteTask(index) {
    list.splice(index, 1);
    renderList();


}

function saveEditedTask() {
    list[currentIndex].title = editField.value;
    renderList();

}

function clearList() {
    list = [];
    renderList();
}

function loadTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhr.send();
    let loadedList = [];
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            loadedList = JSON.parse(xhr.response).map(e => ({
            ...e,
                    done: e.completed,
            }));
            list = [...list, ...loadedList];
        }
    };
    renderList();
}