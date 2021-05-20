//variables
const formulario = document.getElementsByClassName('formulario');
const inputs = document.getElementsByClassName('inputField'); 
let pass1 = document.getElementById('inputPassword_2');
let pass2 = document.getElementById('inputPassword_3');
let searchBar = document.getElementById('inputSearch');
let regex = {
    correo: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    password: /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, //Almenos 8 caracteres una mayúscula y un número (Nivel 2)
    required: /(?=.{3,})(?=.*[a-zA-Z0-9])/ //Almenos 3 letras como mínimo para iniciar la búsqueda.
}
//eventos: eventos submit
document.querySelectorAll('.formulario').forEach(item => {
    item.addEventListener('submit', event => {
        validarFormulario;
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '' || inputs[i].value === false) {
                inputs[i].classList.add('is-invalid');
            }
        }
        event.preventDefault();        
    })
})

//limpiar clases
document.querySelectorAll('.formulario').forEach(item => {
        item.addEventListener('focusout', () => {
        for (i = 0; i < inputs.length; i++) {
           inputs[i].classList.remove('is-invalid');
        }
    })
})
searchBar.addEventListener('focusout', ()=>{
    searchBar.classList.remove('is-invalid');
})
//evento para validar campos
Array.from(inputs).forEach((input) => {
    input.addEventListener('submit', validarFormulario);
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    searchBar.addEventListener('change', validarFormulario);
    searchBar.addEventListener('submit', validarFormulario);
    searchBar.addEventListener('keyup', validarFormulario);
})
//funciones:Validacion de campos
function validarFormulario(e) {
    switch (e.target.name) {
        case 'correoLogin':
            validarCampo(regex.correo, e.target);
            document.getElementById('errorMail').textContent = "introduce una dirección de correo válida";
            break;
        case 'correoSignup':
            validarCampo(regex.correo, e.target);
            document.getElementById('errorMail').textContent = "introduce una dirección de correo válida";
            break;
        case 'loginPass':
            validarCampo(regex.password, e.target);
            document.getElementById('errorPassword').textContent = "la contraseña no concuerda";
            break;
        case 'signupPass':
            validarCampo(regex.password, e.target);
            document.getElementById('errorPassword').textContent = "la contraseña no concuerda";
            break;
        case 'signupPass2':
            pass2.value !== pass1.value ? pass2.classList.add('is-invalid') : pass2.classList.remove('is-invalid');
            document.getElementById('errorPassword_2').textContent = "la contraseña no concuerda";
            break;
        case 'provincia':
            validarCampo(regex.required, e.target);
            document.getElementById('errorProv').textContent = "el campo es obligatorio";        
            break;
        case 'search':
            validarCampo(regex.required, e.target);
            document.getElementById('errorSearch').textContent = "Tu búsqueda debe contener almenos 3 caracteres";
            break;    
    }
}
//prueba de campo valido usando expresiones regulares
const validarCampo = (expresion, input) => {
    if (expresion.test(input.value) == false) {
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
    }
}
