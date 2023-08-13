import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');


form.addEventListener("input", onSaveData)
form.addEventListener("submit", onSubmitForm)


const localStorageKey = 'feedback-form-state';
const dataLocalStorage = getLocalStorage(localStorageKey);


const objFormData = {
    email: '',
    message: '',
}

if (!!dataLocalStorage) {
    try {
        const { email: emailLocalStorage, message: messageLocalStorage } = dataLocalStorage;
        const { email: inputEmail, message: inputMessage } = form.elements; 
        if (emailLocalStorage) {
          inputEmail.value = emailLocalStorage;
          objFormData.email = emailLocalStorage;
        }

        if (messageLocalStorage) {
          inputMessage.value = messageLocalStorage;
          objFormData.message = messageLocalStorage;
        }
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
}

function onSaveData(event) {
    const target = event.target
    const { name, value } = target;
    objFormData[name] = value;
    setLocalStorage(localStorageKey, objFormData)
}

function onSubmitForm(event) {
  /*
        1 отменить поведние отправки формы
        2  проверить явл поля пустыми если поля пустые вывестисообщение - "поля должны быть заполнены"
        3 если поля заполнены мы должны вевести в консоль objFormData, 
          удалить ключ из локалстораджеб присвоить полям обьекта objFormData строка
        
    */
    
    event.preventDefault();
    const target = event.currentTarget
    const { email, message } = target.elements;
    if (!email.value || !message.value) {
        alert("fill all fields")
    } else {
        console.log(objFormData);
        target.reset();
        removeLocalStorage(localStorageKey);
        objFormData.email = "";
        objFormData.message = ""

    }
}

function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

function getLocalStorage(key) {
    
    return transformToJsObj(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, transformToJSON(data));
}

function transformToJSON(data) {
    return JSON.stringify(data);
}

function transformToJsObj(data) {
    return JSON.parse(data);
 }