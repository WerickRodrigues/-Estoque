let itensValores = JSON.parse(localStorage.getItem('itensValores')) || [];

function adicionarItemValor() {
    let itemInput = document.getElementById('itemInput');
    let valorInput = document.getElementById('valorInput');
    let item = itemInput.value.trim();
    let valor = parseFloat(valorInput.value);

    if (item === '' || isNaN(valor) || valor < 0) {
        alert('Por favor, insira um item válido e um valor positivo.');
        return;
    }

    if (valor > 1000000000) {
        alert('O valor não pode exceder 1 bilhão.');
        return;
    }

    itensValores.push({ item: item, valor: valor, quantidade: 1, status: 'Disponível' });
    localStorage.setItem('itensValores', JSON.stringify(itensValores));

    itemInput.value = '';
    valorInput.value = '';
    atualizarTabela();
}

function atualizarTabela(query = '') {
    let tabelaBody = document.querySelector('#tabela tbody');
    tabelaBody.innerHTML = '';

    itensValores
        .filter(({ item }) => item.toLowerCase().includes(query))
        .forEach(({ item, valor, quantidade, status }, index) => {
            let row = document.createElement('tr');
            let itemCell = document.createElement('td');
            let valorCell = document.createElement('td');
            let quantidadeCell = document.createElement('td');
            let statusCell = document.createElement('td');
            let actionCell = document.createElement('td'); 

            itemCell.textContent = item;
            valorCell.textContent = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            quantidadeCell.textContent = quantidade;

            let statusButton = document.createElement('button');
            statusButton.classList.add('status-button');
            statusButton.textContent = status;
            statusButton.classList.add(status === 'Disponível' ? 'disponivel' : 'indisponivel');
            statusButton.onclick = () => toggleStatus(statusButton, index);

            statusCell.appendChild(statusButton);

            let incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.classList.add('btn-increment');
            incrementButton.onclick = () => alterarQuantidade(index, 1);

            let decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.classList.add('btn-decrement');
            decrementButton.onclick = () => alterarQuantidade(index, -1);

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('btn-delete'); 
            deleteButton.onclick = () => excluirItem(index);

            actionCell.appendChild(incrementButton);
            actionCell.appendChild(decrementButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(itemCell);
            row.appendChild(valorCell);
            row.appendChild(quantidadeCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);
            tabelaBody.appendChild(row);
        });
}

function carregarDadosIniciais() {
    atualizarTabela();
}

function limparItens() {
    itensValores = [];
    localStorage.removeItem('itensValores');
    atualizarTabela();
}

function alterarQuantidade(index, change) {
    itensValores[index].quantidade += change;
    if (itensValores[index].quantidade <= 0) {
        itensValores[index].quantidade = 0;
        itensValores[index].status = 'Indisponível';
    } else {
        itensValores[index].status = 'Disponível';
    }
    localStorage.setItem('itensValores', JSON.stringify(itensValores));
    atualizarTabela();
}

function excluirItem(index) {
    itensValores.splice(index, 1);
    localStorage.setItem('itensValores', JSON.stringify(itensValores));
    atualizarTabela();
}

function toggleStatus( index) {
    let currentStatus =textContent;
    let newStatus = currentStatus === 'Disponível' ? 'Indisponível' : 'Disponível';

    button.textContent = newStatus;
    button.classList.toggle('disponivel', newStatus === 'Disponível');
    button.classList.toggle('indisponivel', newStatus === 'Indisponível');

    itensValores[index].status = newStatus;
    localStorage.setItem('itensValores', JSON.stringify(itensValores));
    atualizarTabela();
}

carregarDadosIniciais();

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    atualizarTabela(query);
});
