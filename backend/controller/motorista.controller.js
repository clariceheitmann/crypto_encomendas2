const Motorista = require('../models/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(404).json({message: 'Preencha todos os campos!'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'O CPF deve conter 11 dígitos!'})
    }

    try{
        const cnhCriptografada = CryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCriptografada,
            cpf: cpfCriptografado,
            telefone: valores.telefone
        })
        return res.status(200).json({message: 'Motorista cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar motorista!',err)
        res.status(500).json({message: 'Erro ao cadastrar motorista!'})
    }
}

const listar = async(req,res) =>{
    try{
        const motoristas = await Motorista.findAll()
        let resultado = []

        motoristas.forEach((el)=>{
            let cnhDescriptografada = ''
            let cpfDescriptografado = ''

            try{
                const bytesCNH = CryptoJS.AES.decrypt(el.cnh, CHAVE_SECRETA)
                cnhDescriptografada = bytesCNH.toString(CryptoJS.enc.Utf8)

                const bytesCPF = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytesCPF.toString(CryptoJS.enc.Utf8)

            }catch(err){
                cnhDescriptografada = 'Erro ao descriptografar CNH!'
                cpfDescriptografado = 'Erro ao descriptografar CPF!'
                console.error('Erro ao descriptografar os dados:', err)
            }

            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescriptografada,
                cpf: cpfDescriptografado,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)

    }catch(err){
        console.error('Erro ao listar motoristas!',err)
        res.status(500).json({message: 'Erro ao listar motoristas!'})
    }
}


const consultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const motorista = await Motorista.findOne({where: { nome: nome }})

        if (!motorista) {
            return res.status(404).json({message: 'Motorista não encontrado!'})
        }

        const bytesCNH = CryptoJS.AES.decrypt(motorista.cnh,CHAVE_SECRETA)
        const cnhDescriptografada = bytesCNH.toString(CryptoJS.enc.Utf8)

        const bytesCPF = CryptoJS.AES.decrypt(motorista.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytesCPF.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescriptografada,
            cpf: cpfDescriptografado,
            telefone: motorista.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar motorista!', err)
        return res.status(500).json({message: 'Erro ao consultar motorista!'})
    }
}

const atualizar = async(req,res) =>{
    const valores = req.body 
    const id = req.params.id 

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado!'})
        }

        const dadosAtualizados = {...valores}

        if(valores.cpf){
            if(valores.cpf.length !== 11){
                return res.status(400).json({message: 'O CPF deve conter 11 dígitos!'})
        }
        dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
    }

    if(valores.senha){
        dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
    }

    await Motorista.update(dadosAtualizados, {where: {codMotorista : id}})
    return res.status(200).json({message: 'Motorista atualizado com sucesso!'})

    }catch(err){
        console.error('Erro ao atualizar motorista!',err)
        res.status(500).json({message: 'Erro ao atualizar motorista!'})
    }
}

const apagar = async(req,res) =>{
    const id = req.params.id 

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado!'})
        }

        await Motorista.destroy({where: {codMotorista : id}})
        return res.status(200).json({message: 'Motorista excluído com sucesso!'})
    }catch(err){
        console.error('Erro ao excluir motorista!',err)
        res.status(500).json({message: 'Erro ao excluir motorista!'})
    }
}

module.exports = {cadastrar, listar, consultarNome, atualizar, apagar}