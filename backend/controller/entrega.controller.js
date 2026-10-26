const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.cidadeDestino || !valores.statusAtual || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(404).json({message: 'Preencha todos os campos!'})
    }

    try{
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: 'Carga não encontrada!'})
        }

        const novaEntrega = await Entrega.create(valores)
        return res.status(200).json({message: 'Entrega cadastrada com sucesso!', entrega: novaEntrega})
    }catch(err){
        console.error('Erro ao cadastrar entrega!',err)
        res.status(500).json({message: 'Erro ao cadastrar entrega!'})
    }
}

const listar = async(req,res) =>{
    try{
        const entregas = await Entrega.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Carga,
                    as: 'cargaEntrega',
                    attributes: ['codCarga', 'descricao', 'peso', 'volume']
                }
            ]
        })

        return res.status(200).json(entregas)
    }catch(err){
        console.error('Erro ao listar entregas!',err)
        res.status(500).json({message: 'Erro ao listar entregas!'})
    }
}


const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id

    try {
        const entrega = await Entrega.findByPk(id)

        if (!entrega) {
            return res.status(404).json({
                message: 'Entrega não encontrada!'
            })
        }

        await Entrega.update(
            { statusAtual: valores.statusAtual },
            { where: { codEntrega: id } }
        )

        return res.status(200).json({
            message: 'Entrega atualizada com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao atualizar entrega!', err)
        return res.status(500).json({
            message: 'Erro ao atualizar entrega!'
        })
    }
}


module.exports = {cadastrar, listar, atualizar}