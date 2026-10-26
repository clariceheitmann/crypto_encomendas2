const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async (req,res) =>{
    const valores = req.body 

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})

        if(!funcionario){
            return res.status(404).json({message: 'Funcionario não encontrado!'})
        }

        const bytes = CryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        console.log(bytes)
        const senhaBD = bytes.toString(CryptoJS.enc.Utf8)
        console.log(senhaBD)

        if(valores.senha !== senhaBD){
            return res.status(401).json({message: 'Senha inválida!'})
        }

        const tresHoras = 3 * 60 * 60 * 1000
        const tempoExpiracao = Date.now() + tresHoras

        const payload = {
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoExpiracao
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })
    }catch(err){
        console.error('Erro ao realizar login!',err)
        return res.status(500).json({message: 'Erro ao realizar o login!'})
    }
}

module.exports = {login}