const ModalAdmin = {
    openAdmin(){
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
    async postEvento(){            
            EventoNome = document.getElementById("EventoNome").value;
            EventoQuantidade = document.getElementById("EventoQuantidade").value;
            description = document.getElementById("description").value;
            DataInicioEvento = document.getElementById("DataInicioEvento").value;
            DataFimEvento = document.getElementById("DataFimEvento").value;
            CargaHorarioTotal = document.getElementById("CargaHorarioTotal").value;
            Espaco_idEspaco = document.getElementById("Espaco_idEspaco").value;

            console.log(EventoNome + EventoQuantidade +  description + DataInicioEvento + DataFimEvento + CargaHorarioTotal + Espaco_idEspaco)
            let evento = {EventoNome, EventoQuantidade, description, DataInicioEvento, DataFimEvento, CargaHorarioTotal, Espaco_idEspaco}
            var result = await axios.post("http://localhost:3000/evento", evento)
            console.log(result.data)
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
                <img onclick="evento.removeEvento(${id})" src="./assets/trash.png" alt="Detalhes de evento">
            </td> 
            <td>
                <img onclick="Modal.open(${id})" src="./assets/information.svg" alt="Detalhes de evento">
            </td>
        `   

        return html;
    },    

    async removeEvento(idEvento){
        const urlParams = new URLSearchParams(window.location.search)
        const myParams = urlParams.get("EventoNome")
        console.log(myParams)
        console.log(idEvento)
        var result = await axios.delete(`http://localhost:3000/evento/${idEvento}`)
        console.log(result)
    }
}

const Modal = {
    open(evento){        
        console.log(evento)
        document    
            .querySelector(".modal-overlay")
            .classList
            .add("active")

        axios.get(`http://localhost:3000/evento/${evento}`)
            .then(res => {
                console.log(res.data)
                document.getElementById("id").value = res.data.idEvento                
                document.getElementById("name").value = res.data.EventoNome                
                document.getElementById("quantidade").value = res.data.EventoQuantidade
                document.getElementById("description").value = res.data.description
                document.getElementById("DataIni").value = format.formatData(res.data.DataInicioEvento)
                document.getElementById("DataFim").value = format.formatData(res.data.DataFimEvento)
                document.getElementById("CargaHoraria").value = res.data.CargaHorarioTotal
                let local = getInformations.findLocal(res.data.Espaco_idEspaco).then((data) => {
                    return data
                });
                console.log(local)
                document.getElementById("espaco").value = local
                
            })
    },

    close(){
        document
            .querySelector(".modal-overlay")
            .classList
            .remove("active")
    }
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