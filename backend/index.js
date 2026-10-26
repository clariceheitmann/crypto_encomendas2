const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res) =>{
    res.status(200).json({message: 'Aplicação rodando!'})
})

app.use(authMiddleware)

app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/buscar/:nome', motoristaController.consultarNome)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

app.post('/carga', cargaController.cadastrar)
app.get('/cargas', cargaController.listar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)
app.put('/entrega/:id', entregaController.atualizar)

conn.sync()
    .then(()=>{
        app.listen(PORT, hostname, ()=>{
            console.log(`Aplicação rodando em: http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao se conectar com o banco de dados!',err)
    })