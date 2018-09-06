let list = [

  {title: 'First', done: true},
  {title: 'Second', done: false},
];


renderList();

function makeDone(order){
    list[order].done = true;
    renderList();
    
}


function addToDo() {
    let toDoInput = document.getElementById('input');
    let toDoInputValue = toDoInput.value;
    list.push({title: toDoInputValue, done: false});

    toDoInput.value = '';
    console.log(list);
    renderList();
    
}

function renderList() {

    const table = document.getElementById('list');
    let tr;

    table.innerHTML = '';

    list.forEach((item, i) => {
        tr = document.createElement('tr');
        let done = document.createElement('button');
        done.setAttribute('order', i);
        done.innerHTML = 'Done';
        done.addEventListener('click', e=> {

            makeDone(e.target.getAttribute('order'))
        });
        if(item.done) tr.className = 'done';

        let task = document.createElement('p');


        task.innerHTML = item.title;

    tr.appendChild(done);
    tr.appendChild(task);
    table.appendChild(tr);

    });
}