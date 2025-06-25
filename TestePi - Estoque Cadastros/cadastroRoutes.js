const express = require('express');
const router = express.Router();
const CadastroController = require('../controllers/cadastroController');

router.get('/', CadastroController.listarTodos);
router.post('/', CadastroController.criar);
router.put('/:id', CadastroController.atualizar);
router.delete('/:id', CadastroController.deletar);

module.exports = router;