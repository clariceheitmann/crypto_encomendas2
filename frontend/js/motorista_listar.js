const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()

    fetch(`http://localhost:3000/motoristas`,{
        method: 'GET',
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
        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
        }else{
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
            `
        }
    })
    .catch((err)=>{
        console.error('Erro ao listar motoristas!',err)
        resposta.innerHTML = '<p>Erro ao listar motoristas!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codMotorista || el.id}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.cnh}</td>`
        corpo += `<td>${el.cpf}</td>`
        corpo += `<td>${el.telefone}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código do Motorista</th>
            <th>Nome</th>
            <th>CNH</th>
            <th>CPF</th>
            <th>Telefone</th>
        </tr>
    </thead>
    `
}