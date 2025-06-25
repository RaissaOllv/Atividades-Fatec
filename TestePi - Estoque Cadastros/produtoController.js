const db = require('../config/database');

const ProdutoController = {
    listarTodos: (req, res) => {
        db.query('SELECT * FROM produtos', (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Erro ao buscar produtos' });
            }
            res.json(results);
        });
    },

    criar: (req, res) => {
        const { nome, quantidade, preco } = req.body;
        
        if (!nome || !quantidade || !preco) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        db.query(
            'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
            [nome, quantidade, preco],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Erro ao cadastrar produto' });
                }
                res.status(201).json({ message: 'Produto cadastrado com sucesso', id: results.insertId });
            }
        );
    },

    atualizar: (req, res) => {
        const { id } = req.params;
        const { nome, quantidade, preco } = req.body;

        db.query(
            'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?',
            [nome, quantidade, preco, id],
            (error) => {
                if (error) {
                    return res.status(500).json({ error: 'Erro ao atualizar produto' });
                }
                res.json({ message: 'Produto atualizado com sucesso' });
            }
        );
    },

    deletar: (req, res) => {
        const { id } = req.params;

        db.query('DELETE FROM produtos WHERE id = ?', [id], (error) => {
            if (error) {
                return res.status(500).json({ error: 'Erro ao deletar produto' });
            }
            res.json({ message: 'Produto deletado com sucesso' });
        });
    }
};

module.exports = ProdutoController;