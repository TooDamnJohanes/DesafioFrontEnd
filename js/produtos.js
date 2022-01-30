let tabelaSelecionados = document.querySelector('[data-js="itens-tabela-produtos-selecionados"]');
let tabela = document.querySelector('[data-js="itens-tabela"]');
const endPoint = "2b01ef743beb4caf95915ca46a696095";

async function produtosCliente() {

    const url = `https://crudcrud.com/api/${endPoint}/produtos`;
    const promiseData = await fetch(url);
    const dataJson = await promiseData.json();

    dataJson.forEach((element) => {
        tabela.innerHTML +=
            `<tr>
                <td>## ${element._id}</td>
                <td>${element.quantidade}</td>
                <td>${element.nome_produto}</td>
                <td>${element.preco}</td>
            </tr>`
    });
}

let selectBtn = document.getElementById("btn-select");
let deleteBtn = document.getElementById("btn-delete");

selectBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let produtoId = document.getElementsByName("produto-id")[0];
    tabelaSelecionados.innerHTML = '';
    selectItem(produtoId.value);

});

deleteBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let produtoId = document.getElementsByName("produto-id")[0];
    delItem(produtoId.value);

});

async function selectItem(produto) {
    const url = `https://crudcrud.com/api/${endPoint}/produtos/${produto}`;
    const promiseData = await fetch(url);
    const dataJson = await promiseData.json();
    tabelaSelecionados.innerHTML +=
        `<tr>
                <td>## ${dataJson._id}</td>
                <td>${dataJson.quantidade}</td>
                <td>${dataJson.nome_produto}</td>
                <td>${dataJson.preco}</td>
            </tr>`
}

async function delItem(produto) {
    const url = `https://crudcrud.com/api/${endPoint}/produtos/${produto}`;
    await fetch(url, {
        method: 'DELETE'
    });
    tabela.innerHTML = '';
    produtosCliente();
}