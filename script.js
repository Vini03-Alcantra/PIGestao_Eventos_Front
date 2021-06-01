const Modal = {
    open(evento){        
        console.log(evento)
        document    
            .querySelector(".modal-overlay")
            .classList
            .add("active")

        axios.get(`http://localhost:3000/evento/${evento}`)
            .then(res => {
                console.log(res)
            })
    },
    close(){
        document
            .querySelector(".modal-overlay")
            .classList
            .remove("active")
    }
}


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
        eventos.forEach((data, index) => {            
            const tr = document.createElement("tr")
    
            tr.innerHTML = evento.innerHTMLEvent(data, index)
            tr.dataset.index = index
            evento.eventContainer.appendChild(tr)
        });
    },

    innerHTMLEvent(evento, index){
        var date = format.formatData(evento.DataInicioEvento)
        var id = evento.idEvento;

        console.log(evento)
        const html = `
            <td class="description">${evento.EventoNome}</td>
            <td class="">${evento.description}</td>
            <td class="date">${date}</td>
            <td>
                <img onclick="Modal.open(${id})" src="./assets/information.svg" alt="Detalhes de evento">
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