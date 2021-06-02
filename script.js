'use strict';
// pattern
let nameRegExp = /^[A-Za-z]{4,16}$/;
let passwordRegExp = /\w.{3,16}$/;
let emailRegExp = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/
let getSelector = selector => document.querySelector(selector);
let myDate = {};
let arrDates = [];
let myObj = {};
let userIndex;

/* валідація форм початок */

// кнопка спочатку не активна.
function checkForms(element, pattern) {
    getSelector(element).oninput = function () {
        let test = pattern.test(this.value);
        if (test) {
            this.style.border = '1px solid green';
            getSelector('.add-user').removeAttribute("disabled");
        } else {
            this.style.border = '1px solid red';
            getSelector('.add-user').setAttribute("disabled", true);
        }
    }
}

checkForms('.login', nameRegExp);
checkForms('.email', emailRegExp);
checkForms('.password', passwordRegExp);

// дана функція перевіряє правильність і тільки після того добавляє об'єкт в масив
function addUser() {
    if (nameRegExp.test(getSelector('.login').value) && emailRegExp.test(getSelector('.email').value) && passwordRegExp.test(getSelector('.password').value)) {
        getSelector('.warn').classList.remove('active');
        createDate();
        clearInput();
    } else {
        getSelector('.warn').classList.toggle('active');
    }

}

/* валідація форм кінець */

/* функції початок */

// очищення полів вводу
function clearInput() {
    getSelector('.login').value = '';
    getSelector('.password').value = '';
    getSelector('.email').value = '';
}

// створення даних з полів
function createDate() {
    myDate = {
        login: getSelector('.login').value,
        password: getSelector('.password').value,
        email: getSelector('.email').value,
        edit: `<a class="edit">Edit</a>`,
        del: `<a class="delete">Delete</a>`
    }
    arrDates.push(myDate);
}


function render() {
    debugger
    getSelector('.table1').innerHTML = '';
    for (let i = 0; i < arrDates.length; i++) {
        getSelector('.table1').innerHTML +=
            `<table class="table1">
            <tr class="tr">
                <td class="td">${i + 1}</td>
                <td class="td">${arrDates[i].login}</td>
                <td class="td">${arrDates[i].password}</td>
                <td class="td">${arrDates[i].email}</td>
                <td class="td" onclick="editUser()">${arrDates[i].edit}</td>
                <td class="td" onclick="deleteUser()">${arrDates[i].del}</td>
            </tr>
      </table>`
    }
}

// видалення
function deleteUser() {
    let arr = Array.from(document.querySelectorAll('.delete'));
    let index = arr.indexOf(event.target);
    arrDates.splice(index, 1);
    render();
}

// заміна елементів
function editUser() {
    debugger
    let arr = Array.from(document.querySelectorAll('.edit'));
    let index = arr.indexOf(event.target);
    myObj = {
        userIndex: index,
        login: arrDates[index].login,
        password: arrDates[index].password,
        email: arrDates[index].email,
        edit: arrDates[index].edit,
        del: arrDates[index].del
    }
    getSelector('.login').value = arrDates[index].login;
    getSelector('.password').value = arrDates[index].password;
    getSelector('.email').value = arrDates[index].email;
    getSelector('.first').classList.add('active');
    getSelector('.two').classList.add('active');
    return userIndex = index;
}

// збереження зміни
function saveEditUser() {
    // arrDates[userIndex] = Object.assign({}, myObj);
    let myDate1 = {
        login: getSelector('.login').value,
        password: getSelector('.password').value,
        email: getSelector('.email').value,
        edit: `<a class="edit">Edit</a>`,
        del: `<a class="delete">Delete</a>`
    }
    arrDates[userIndex] = Object.assign({}, myDate1);
    clearInput()
    render();
    getSelector('.first').classList.remove('active');
    getSelector('.two').classList.remove('active');
}

/* функції кінець */


// добавлення по кліку
getSelector('.add-user').addEventListener('click', () => {
    addUser();
    render();
})
















