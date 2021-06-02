const ModalProf = {
    openProf(){
        document
            .querySelector(".modal-overlay-add")
            .classList
            .add("active")
    },

    close(){
        document
            .querySelector(".modal-overlay-add")
            .classList
            .remove("active")
    }
}



const evento = {
    eventContainer: document.querySelector("tbody"),

    eventos() {
        axios.get("http://localhost:3000/evento/")
        .then(res => {
            evento.renderEventos(res.data)
        })
    },

    renderEventos(eventos){        
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
    },    
}

const format = {
    formatData(data){
        return data.substring(0, 10)
    }
}

const getInformations = {
    findLocal(id){        
        axios.get(`http://localhost:3000/espaco/${id}`)
            .then(res => {
                let local = res.data.NomeEspaco
                return local
            })        
    }
}

const App = {
    init(){
        evento.eventos()
    }
}

App.init();