// regex validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const NUMBER_REGEX = /^[0-9]{6,16}$/;

// selectors
const countries = document.querySelector('#countries');
const usernameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneCode = document.querySelector('#phone-code');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const submitBtn = document.querySelector('#submit-btn');

// estado de validaciones
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;

// Formatear opciones del select de países
[...countries.options].forEach(option => {
    if (option.value) {
        option.innerHTML = option.innerHTML.split('(')[0].trim();
    }
});

// Función centralizada para aplicar clases (verde/rojo) y actualizar el botón
function applyValidation(inputElement, isValid) {
    const parent = inputElement.closest('.form-group, .input-group, .input-div') || inputElement.parentElement;
    const information = parent.querySelector('.information-text');

    if (isValid) {
        inputElement.classList.add('correct');
        inputElement.classList.remove('incorrect');
        if (information) information.classList.remove('show-information');
    } else {
        inputElement.classList.add('incorrect');
        inputElement.classList.remove('correct');
        if (information) information.classList.add('show-information');
    }

    checkFormState();
}

// Habilitar / Deshabilitar botón
function checkFormState() {
    const isFormValid = usernameValidation && 
                        emailValidation && 
                        phoneValidation && 
                        passwordValidation && 
                        confirmPasswordValidation;
                        
    submitBtn.disabled = !isFormValid;
}

// Event Listeners
usernameInput.addEventListener('input', e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    applyValidation(usernameInput, usernameValidation);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    applyValidation(emailInput, emailValidation);
});

countries.addEventListener('change', e => {
    const optionSelected = e.target.options[e.target.selectedIndex];
    if (optionSelected && optionSelected.value) {
        phoneCode.innerHTML = `+${optionSelected.value}`;
    }
});

phoneInput.addEventListener('input', e => {
    phoneValidation = NUMBER_REGEX.test(e.target.value);
    applyValidation(phoneInput, phoneValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    applyValidation(passwordInput, passwordValidation);

    // Re-validar confirmación si la contraseña principal cambia
    if (confirmPasswordInput.value.length > 0) {
        confirmPasswordValidation = passwordInput.value === confirmPasswordInput.value;
        applyValidation(confirmPasswordInput, confirmPasswordValidation);
    }
});

confirmPasswordInput.addEventListener('input', e => {
    confirmPasswordValidation = passwordInput.value === e.target.value && e.target.value.length > 0;
    applyValidation(confirmPasswordInput, confirmPasswordValidation);
});

// Estado inicial del botón
checkFormState();