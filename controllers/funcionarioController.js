const { text } = require("body-parser");
const Funcionario = require("../models/funcionario");
const Servico = require("../models/servico");
const asyncHandler = require("express-async-handler");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');

exports.funcionario_lista = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    res.render('funcionario/listagem', { funcionario: await Funcionario.findAll() });
});

exports.funcionario_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('funcionario/cadastro');
});

exports.funcionario_editando = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    const funcionario = await Funcionario.findByPk(req.body.id);

    if (funcionario) {
        res.render('funcionario/edicao', { funcionario: funcionario.dataValues });
    } else {
        res.render('funcionario/listagem');
    }
});

exports.funcionario_inserir = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();

    try {
        const { nome, valorhora } = req.body;
        console.log(nome);
        if (nome && valorhora) {
            const funcionario = await Funcionario.create(req.body);
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados cadastrados!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao cadastrar!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});

exports.funcionario_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const funcionario = await Funcionario.findByPk(id);
        if (funcionario) {
            await Funcionario.destroy({ where: { id } });
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

exports.funcionario_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, nome, valorhora } = req.body;
        if (id && nome && valorhora) {
            await Funcionario.update({ nome, valorhora }, { where: { id } })
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados alterados!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao alterar!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});

exports.funcionario_servicos = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    await Servico.sync();

    sequelize.query(`SELECT funcionario.valorhora AS valorhora, servico.id AS id, funcionario.id AS idFuncionario, funcionario.nome AS nome, servico.qtd_horas AS qtd_horas, servico.data AS data, obra.endereco AS endereco 
        FROM funcionario 
        INNER JOIN servico ON funcionario.id = servico.idFuncionario 
        INNER JOIN obra ON servico.idObra = obra.id 
        WHERE funcionario.id = ${req.body.id} ORDER BY servico.id`, {
        type: Sequelize.QueryTypes.SELECT,
    }).then((funcionario) => {
        console.log(funcionario);
        if (funcionario.length > 0) {
            let soma = 0;
            for (let i = 0; i < funcionario.length; i++) {
                soma += funcionario[i].qtd_horas;
            }
            var relatorio = [
                { total_horas: soma, pgto_parcial: soma * funcionario[0].valorhora }
            ];
            console.log(relatorio);
            res.render('funcionario/servicos', { funcionario: funcionario, relatorio: relatorio });
        }else{
            res.redirect('/funcionario/listagem');
        }
    }).catch((error) => {
        console.error(error);
    });
});