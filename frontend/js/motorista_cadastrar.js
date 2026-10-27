const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) =>{
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch(`http://localhost:3000/motorista`,{
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
        console.error('Erro ao cadastrar motorista!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar motorista!</p>'
    })
})