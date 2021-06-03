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

const createEvento = {
    postEvento(){
        // document.getElementById("createEvent").addEventListener("submit", (event) => {
        //     event.preventDefault()

            EventoNome = document.getElementById("EventoNome").value;
            EventoQuantidade = document.getElementById("EventoQuantidade").value;
            description = document.getElementById("description").value;
            DataInicioEvento = document.getElementById("DataInicioEvento").value;
            DataFimEvento = document.getElementById("DataFimEvento").value;
            CargaHorarioTotal = document.getElementById("CargaHorarioTotal").value;
            Espaco_idEspaco = document.getElementById("Espaco_idEspaco").value;

            console.log(EventoNome + EventoQuantidade +  description + DataInicioEvento + DataFimEvento + CargaHorarioTotal + Espaco_idEspaco)
            alert(EventoNome)            
        // })
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