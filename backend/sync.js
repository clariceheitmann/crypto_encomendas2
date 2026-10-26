const conn = require('./db/conn')
const {Funcionario, Motorista, Carga, Entrega} = require('./models/rel')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Criando e sincronizando tabelas!')
    }catch(err){
        console.error('Erro ao criar e sincronizar tabelas!',err)
    }finally{
        await conn.close()
        console.log('Fechando conexão com o banco de dados!')
    }
}

syncDataBase()