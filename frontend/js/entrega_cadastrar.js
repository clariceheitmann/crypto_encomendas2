const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) =>{
    e.preventDefault()

    const valores = {
        cidadeDestino: document.getElementById('cidadeDestino').value,
        statusAtual: document.getElementById('statusAtual').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: document.getElementById('idCarga').value
    }

    fetch(`http://localhost:3000/entrega`,{
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
        console.error('Erro ao cadastrar entrega!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar entrega!</p>'
    })
})