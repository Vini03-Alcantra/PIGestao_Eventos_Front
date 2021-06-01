var axiosConfig = {
    headers:{
        Authorization: "Bearer " +localStorage.getItem("token")
    }
}

const evento = {
    eventContainer: document.querySelector("tbody"),

    eventos() {
        axios.get("http://localhost:3000/evento/")
        .then(res => {
            evento.renderEvento(res.data)
        })
    },

    renderEvento(eventos){
        console.log(eventos)
        eventos.forEach((data, index) => {            
            const tr = document.createElement("tr")
    
            tr.innerHTML = evento.innerHTMLEvent(data, index)
            tr.dataset.index = index
            evento.eventContainer.appendChild(tr)
        });
    },

    innerHTMLEvent(evento, index){
        var data = format.formatData(evento.DataInicioEvento)
        const html = `
            <td class="description">${evento.EventoNome}</td>
            <td class="">${evento.description}</td>
            <td class="date">${data}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
            </td> 
        `

        return html;
    }
}

const format = {
    formatData(data){
        return data.substring(0, 10)
    }
}

const App = {
    init(){
        evento.eventos()
    }
}

App.init();