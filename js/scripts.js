const endPoint = "2b01ef743beb4caf95915ca46a696095";

class Validator {
    constructor() {
        this.validations = [
            'data-require',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-equal',
            'data-only-letters'
        ]
    }

    validate(form) {

        let currentValidation = document.querySelectorAll('form .error-validation');

        if (currentValidation.length > 0) {
            this.cleanValidation(currentValidation);
        }

        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

        inputsArray.forEach(function(input) {
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validations[i]);
                    this[method](input, value);
                }
            }
        }, this);
    }

    minlength(input, minValue) {
        let inputLength = input.value.trim(' ').length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    require(input) {
        let inputLength = input.value.length;
        let errorMessage = `O campo não pode ser nulo!`;
        if (inputLength == 0) {
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `O email ${email} não é um email valido`;
        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    printMessage(input, msg) {
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;

            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        }
    }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita numeros e caracteres especiais`;
        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    cleanValidation(validations) {
        validations.forEach(el => el.remove());
    }

    isAllFildsValid() {
        let currentValidation = document.querySelectorAll('form .error-validation');
        if (currentValidation.length > 0) {
            return false
        } else {
            return true
        }
    }
}



let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let submitLogin = document.getElementById("btn-submit-login");
let submitProduto = document.getElementById("btn-submit-produtos");

let validator = new Validator();

if (submit != null) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        validator.validate(form);
        if (validator.isAllFildsValid()) {
            cadastraCliente();
        } else {
            console.log("Nao validado");
        }
    });
}

if (submitProduto != null) {
    submitProduto.addEventListener('click', function(e) {
        e.preventDefault();
        validator.validate(form);
        if (validator.isAllFildsValid()) {
            cadastraProduto();
        } else {
            console.log("Nao validado");
        }
    });
}

if (submitLogin != null) {
    submitLogin.addEventListener('click', function(e) {
        e.preventDefault();
        validator.validate(form);
        if (validator.isAllFildsValid()) {
            logaCliente();
        } else {
            console.log("Login-Invalido");
        }
    });
}


async function cadastraCliente() {
    let nome = document.getElementsByName("name")[0];
    let sobrenome = document.getElementsByName("lastname")[0];
    let email = document.getElementsByName("email")[0];
    let senha = document.getElementsByName("password")[0];
    const dados = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        senha: senha.value,
    };
    console.log(dados);
    const resposta = await fetch(`https://crudcrud.com/api/${endPoint}/cliente`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    window.location.href = "../produtos.html";
}

async function cadastraProduto() {
    let nomeProduto = document.getElementsByName("name-produto")[0];
    let quantity = document.getElementsByName("quantity-produtos")[0];
    let preco = document.getElementsByName("preco")[0];

    console.log(nomeProduto);
    console.log(quantity);
    console.log(preco);

    const dados = {
        nome_produto: nomeProduto.value,
        quantidade: quantity.value,
        preco: preco.value,
    };
    console.log(dados);
    const resposta = await fetch(`https://crudcrud.com/api/${endPoint}/produtos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    window.location.href = "../produtos.html";
}

async function logaCliente() {
    const url = `https://crudcrud.com/api/${endPoint}/cliente`;
    const promiseData = await fetch(url);
    const dataJson = await promiseData.json();
    let loginValido = false;
    let usuario = [];
    let email = document.getElementsByName("email")[0];
    let senha = document.getElementsByName("password")[0];

    for (let i = 0; i < dataJson.length; i++) {
        if (dataJson[i].email === email.value && dataJson[i].senha === senha.value) {
            console.log("Login Correto");
            loginValido = true;
            usuario.push(dataJson[i]);
            break;
        }
    }

    if (!loginValido) {
        console.log("Login Errado");
    } else {
        window.location.href = "../produtos.html";
    }
}

async function alteraCliente() {
    let nome = document.getElementsByName("name-put")[0];
    let sobrenome = document.getElementsByName("lastname-put")[0];
    let email = document.getElementsByName("email-put")[0];
    let senha = document.getElementsByName("password-put")[0];
    const dados = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        senha: senha.value,
    };
    console.log(dados);
    const resposta = await fetch(`https://crudcrud.com/api/${endPoint}/cliente`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    window.location.href = "../produtos.html";
}