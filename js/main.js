//variables
const formulario = document.getElementsByClassName('formulario');
let searchInput = document.getElementById('inputSearch');
const loginForm = [document.querySelectorAll('#loginForm input')];
const signupForm = [document.querySelectorAll('#signupForm input')];
const searchForm = document.getElementById('searchBar');
const login = document.getElementById('loginForm');
const signup = document.getElementById('signupForm');
const inputs = document.getElementsByClassName('inputField');
let pass1 = document.getElementById('inputPassword_2');
let pass2 = document.getElementById('inputPassword_3');
let errorMsj = document.getElementsByClassName('invalid-feedback');
const regex = {
    correo: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    password: /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, //Almenos 8 caracteres una mayúscula y un número (Nivel 2)
    required: /(?=.{3,})(?=.*[a-zA-Z0-9])/ //Almenos 3 letras como mínimo para iniciar la búsqueda.
}
const campos = {
    correo: false,
    correo2: false,
    password1: false,
    password2: false,
    password3: false,
    provincia: false,
    busqueda: false
}
//funciones:Validacion de campos
function validarFormulario(e) {
    switch (e.target.name) {
        case 'correoLogin':
            validarCampo(regex.correo, e.target, 'correo');
            document.getElementById('errorMail').textContent = "introduce una dirección de correo válida";
            break;
        case 'correoSignup':
            validarCampo(regex.correo, e.target, 'correo2');
            document.getElementById('errorMail').textContent = "introduce una dirección de correo válida";
            break;
        case 'loginPass':
            validarCampo(regex.password, e.target, 'password1');
            document.getElementById('errorPassword').textContent = "la contraseña no concuerda";
            break;
        case 'signupPass':
            validarCampo(regex.password, e.target, 'password2');
            document.getElementById('errorPassword').textContent = "la contraseña no concuerda";
            break;
        case 'signupPass2':
            validarCampo(regex.password, e.target, 'password3');
            pass2.value !== pass1.value ? pass2.classList.add('is-invalid') : pass2.classList.remove('is-invalid');
            document.getElementById('errorPassword_2').textContent = "la contraseña no es correcta";
            break;
        case 'provincia':
            validarCampo(regex.required, e.target, 'provincia');
            document.getElementById('errorProv').textContent = "el campo es obligatorio";
            break;
        case 'searchInput':
            validarCampo(regex.required, e.target, 'busqueda');
            document.getElementById('errorSearch').textContent = "Tu búsqueda debe contener almenos 3 caracteres";
            break;
        case 'loginForm':
            if (campos.correo === true && campos.password1 === true) {
                location = 'success.html';
            } else campoVacio();
                
            
            break;
        case 'signupForm':
            if (campos.correo2 === true && campos.password2 === true && campos.password3 === true && campos.provincia === true) {
                location = 'success.html';
            } else campoVacio();           
            break;

        case 'searchForm':
            if (campos.busqueda === false) {
                campoVacio();
            } else location = 'success.html';               
            break;
    }
}
//prueba de campo valido usando expresiones regulares
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        input.classList.remove('is-invalid');
        campos[campo] = true;
    } else {
        input.classList.add('is-invalid');
        campos[campo] = false;
    }
}
function campoVacio() {
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].classList.add('is-invalid');
            Array.from(errorMsj).forEach((msj) => {
                msj.textContent = "completa correctamente el formulario, uno de los campos presenta error";
            })
        }
    }
}
//eventos Submit de los 3 formularios
login.addEventListener('submit', (e) => {
    loginForm.forEach(() => {
        validarFormulario(e);
    })
    e.preventDefault();
})
signup.addEventListener('submit', (e) => {
    signupForm.forEach(() => {
        validarFormulario(e);
    })
    e.preventDefault();
})

searchForm.addEventListener('submit', (e) => {
    validarFormulario(e)
    e.preventDefault();
});

searchInput.addEventListener('focusout', () => {
    searchInput.classList.remove('is-invalid');
})

//evento para validar campos individualmente
Array.from(inputs).forEach((input) => {
    input.addEventListener('focusout', validarFormulario);
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    searchInput.addEventListener('change', validarFormulario);
    searchInput.addEventListener('keyup', validarFormulario);
})
