const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) =>{
    e.preventDefault()

    const valores = {
        descricao: document.getElementById('descricao').value,
        peso: document.getElementById('peso').value,
        volume: document.getElementById('volume').value,
        codigoRastreio: document.getElementById('codigoRastreio').value,
        codMotorista: document.getElementById('idMotorista').value
    }

    fetch(`http://localhost:3000/carga`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => {
        if(!res.ok){
            localStorage.clear()
            alert('Faça o login novamente! Sessão expirada!')
            location.href = '../index.html'
            throw new Error('Sessão expirada!')
        }
        return res.json()
    })
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar carga!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar carga!</p>'
    })
})