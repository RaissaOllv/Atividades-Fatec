const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Altere conforme sua configuração
    database: 'estoque_db'
});

// Rotas para Produtos
app.get('/api/produtos', (req, res) => {
    connection.query('SELECT * FROM produtos', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/api/produtos', (req, res) => {
    const { nome, quantidade, preco } = req.body;
    connection.query(
        'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
        [nome, quantidade, preco],
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Produto cadastrado com sucesso!' });
        }
    );
});

// Rotas para Cadastros
app.get('/api/cadastros', (req, res) => {
    connection.query('SELECT * FROM cadastros', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/api/cadastros', (req, res) => {
    const { nome, email, telefone } = req.body;
    connection.query(
        'INSERT INTO cadastros (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone],
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Cadastro realizado com sucesso!' });
        }
    );
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});