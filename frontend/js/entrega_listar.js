const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()

    fetch(`http://localhost:3000/entregas`,{
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
        console.error('Erro ao listar entregas!',err)
        resposta.innerHTML = '<p>Erro ao listar entregas!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codEntrega || el.id}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.statusAtual}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.idCarga}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código da Entrega</th>
            <th>Cidade Destino</th>
            <th>Status Atual</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Código da Carga</th>
        </tr>
    </thead>
    `
}