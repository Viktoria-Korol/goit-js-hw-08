
// 1. Відстежуй на формі подію input, 
//    і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. 
//    Нехай ключем для сховища буде рядок "feedback-form-state".
// 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
//    В іншому випадку поля повинні бути порожніми.
// 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та 
//    їхніми поточними значеннями.
// 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй
//    бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';


const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
};

// создаём константу с ключём в которой будем хранить данные + объект
const feedbackForm = "feedback-form-state";
const dataUser = {};

// присваеваем Слушатель событий input и submit
refs.form.addEventListener("input", throttle(setDataUser, 500));
refs.form.addEventListener("submit", submitForm);

getDataUser();

function save(key, value) {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    }
    catch (error) {
        console.error("Set state error: ", error.message);
    }
}

function load (key) {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    }
    catch (error) {
        console.error("Get state error: ", error.message);
    }
};

function setDataUser() {
    dataUser.email = refs.input.value;
    dataUser.message = refs.textarea.value;

    save(feedbackForm, dataUser);
}

function getDataUser () {
    if (load(feedbackForm)) {
        const localDataUser = load(feedbackForm);

        refs.input.value = localDataUser.email;
        refs.textarea.value = localDataUser.message;
    }
}

function submitForm(event) {
    event.preventDefault();

    if (refs.input.value !== "" && refs.textarea.value !== "") {
        console.log(load(feedbackForm));

        event.currentTarget.reset();

        localStorage.removeItem(feedbackForm);
    }
}


