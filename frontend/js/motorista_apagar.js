const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('id').value

    if(!id){
        resposta.innerHTML = '<p>Informe o código do motorista!</p>'
        return
    }

    if(!confirm('Tem certeza de que deseja excluir esse motorista?'))
        return

    fetch(`http://localhost:3000/motorista/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': token
        },
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
        console.error('Erro ao apagar motorista!',err)
        resposta.innerHTML = '<p>Erro ao apagar motorista!</p>'
    })
})