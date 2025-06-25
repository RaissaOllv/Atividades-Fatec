const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');
const cadastroRoutes = require('./routes/cadastroRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/cadastros', cadastroRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});