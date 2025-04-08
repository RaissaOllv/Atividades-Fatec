function cadastrarProduto(event) {
    event.preventDefault();

    // Obter valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const validade = document.getElementById('validade').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const descricao = document.getElementById('descricao').value.trim();

    // Validações
    if (nome.length < 3) {
        showError('Erro de Validação', 'O nome do produto deve ter pelo menos 3 caracteres.');
        document.getElementById('nome').focus();
        return false;
    }

    if (isNaN(preco) || preco <= 0) {
        showError('Erro de Validação', 'Por favor, insira um preço válido maior que zero.');
        document.getElementById('preco').focus();
        return false;
    }

    if (!validade) {
        showError('Erro de Validação', 'Por favor, selecione uma data de validade.');
        document.getElementById('validade').focus();
        return false;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataValidade = new Date(validade);
    
    if (dataValidade < hoje) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            html: `A data de validade (${formatDate(dataValidade)}) está no passado.<br>Deseja continuar mesmo assim?`,
            showCancelButton: true,
            confirmButtonText: 'Sim, cadastrar',
            cancelButtonText: 'Corrigir',
            confirmButtonColor: '#ff6f61',
            cancelButtonColor: '#6c757d'
        }).then((result) => {
            if (!result.isConfirmed) {
                document.getElementById('validade').focus();
            } else {
                submitForm(nome, preco, dataValidade, quantidade, descricao);
            }
        });
        return false;
    }

    if (isNaN(quantidade) || quantidade < 0) {
        showError('Erro de Validação', 'A quantidade deve ser um número válido maior ou igual a zero.');
        document.getElementById('quantidade').focus();
        return false;
    }

    submitForm(nome, preco, dataValidade, quantidade, descricao);
    return false;
}

function submitForm(nome, preco, dataValidade, quantidade, descricao) {
    Swal.fire({
        icon: 'success',
        title: 'Produto Cadastrado!',
        html: `
            <div class="result-container">
                <div class="result-item">
                    <span class="result-label">Nome:</span>
                    <span class="result-value">${nome}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Preço:</span>
                    <span class="result-value">R$ ${preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Validade:</span>
                    <span class="result-value">${formatDate(dataValidade)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Quantidade:</span>
                    <span class="result-value">${quantidade}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Descrição:</span>
                    <span class="result-value">${descricao || 'Não informada'}</span>
                </div>
            </div>
        `,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6f61',
        customClass: {
            popup: 'result-popup',
            htmlContainer: 'result-html'
        }
    }).then(() => {
        document.getElementById('productForm').reset();
    });
}

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#ff6f61'
    });
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Adicionando máscara de preço
document.getElementById('preco').addEventListener('blur', function(e) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        e.target.value = value.toFixed(2);
    }
});

// Adicionando foco ao primeiro campo ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nome').focus();
});