const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Servico = require("../models/servico");
const Funcionario = require("../models/funcionario");
const Obra = require("../models/obra");
const asyncHandler = require("express-async-handler");

exports.servico_lista = asyncHandler(async (req, res, next) => {
    await Servico.sync();
    await Funcionario.sync();
    await Obra.sync();

    sequelize.query('SELECT servico.id AS id, funcionario.nome AS nome, servico.qtd_horas AS qtd_horas, obra.endereco AS endereco FROM servico INNER JOIN obra ON servico.idObra = obra.id INNER JOIN funcionario On servico.idFuncionario = funcionario.id ORDER BY servico.id', {
        type: Sequelize.QueryTypes.SELECT,
    }).then((servico) => {
        console.log(servico)
        res.render('servico/listagem', { servico: servico });
    }).catch((error) => {
        console.error(error);
    });
});

exports.servico_cadastrar = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    await Obra.sync();
    res.render('servico/cadastro', { funcionario: await Funcionario.findAll(), obra: await Obra.findAll() });
});

exports.servico_inserir = asyncHandler(async (req, res, next) => {
    await Servico.sync();

    try {
        const { qtd_horas, data, idFuncionario, idObra } = req.body;
        if (qtd_horas && data && idFuncionario && idObra) {

            const servico = await Servico.create(req.body);
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados cadastrados!',
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao cadastrar 1!',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error,
        });
    }
});

exports.servico_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const servico = await Servico.findByPk(id);
        if (servico) {
            await Servico.destroy({ where: { id } });
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados excluídos!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao excluir!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});