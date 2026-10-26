const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')


const cadastrar = async (req, res) => {
    const valores = req.body

    if (
        !valores.descricao ||
        !valores.peso ||
        !valores.volume ||
        !valores.codigoRastreio ||
        !valores.codMotorista
    ) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        })
    }

    try {
        // Busca o motorista pelo código informado
        const motorista = await Motorista.findByPk(
            valores.codMotorista
        )

        if (!motorista) {
            return res.status(404).json({
                message: 'Motorista não encontrado!'
            })
        }

        // Cadastra a carga vinculada ao motorista
        await Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            codigoRastreio: valores.codigoRastreio,
            idMotorista: valores.codMotorista
        })

        return res.status(201).json({
            message: 'Carga cadastrada com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao cadastrar carga!', err)

        return res.status(500).json({
            message: 'Erro ao cadastrar carga!'
        })
    }
}


const listar = async (req, res) => {
    try {
        const cargas = await Carga.findAll({
            include: [{
                model: Motorista,
                as: 'motoristaCarga',
                attributes: ['codMotorista', 'nome']
            }]
        })

        return res.status(200).json(cargas)

    } catch (err) {
        console.error('Erro ao listar cargas!', err)
        return res.status(500).json({message: 'Erro ao listar cargas!'})
    }
}

module.exports = {cadastrar, listar}