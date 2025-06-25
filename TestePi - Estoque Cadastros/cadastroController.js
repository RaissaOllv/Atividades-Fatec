const db = require('../config/database');

const CadastroController = {
    listarTodos: (req, res) => {
        db.query('SELECT * FROM cadastros', (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Erro ao buscar cadastros' });
            }
            res.json(results);
        });
    },

    criar: (req, res) => {
        const { nome, email, telefone } = req.body;
        
        if (!nome || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }

        db.query(
            'INSERT INTO cadastros (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Erro ao criar cadastro' });
                }
                res.status(201).json({ message: 'Cadastro realizado com sucesso', id: results.insertId });
            }
        );
    },

    atualizar: (req, res) => {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;

        db.query(
            'UPDATE cadastros SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, email, telefone, id],
            (error) => {
                if (error) {
                    return res.status(500).json({ error: 'Erro ao atualizar cadastro' });
                }
                res.json({ message: 'Cadastro atualizado com sucesso' });
            }
        );
    },

    deletar: (req, res) => {
        const { id } = req.params;

        db.query('DELETE FROM cadastros WHERE id = ?', [id], (error) => {
            if (error) {
                return res.status(500).json({ error: 'Erro ao deletar cadastro' });
            }
            res.json({ message: 'Cadastro deletado com sucesso' });
        });
    }
};

module.exports = CadastroController;