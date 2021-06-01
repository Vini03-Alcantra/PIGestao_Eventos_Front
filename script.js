var axiosConfig = {
    headers:{
        Authorization: "Bearer " +localStorage.getItem("token")
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
                document.getElementById("name").value = res.data.EventoNome                
                document.getElementById("quantidade").value = res.data.EventoQuantidade
                document.getElementById("description").value = res.data.description
                document.getElementById("DataIni").value = format.formatData(res.data.DataInicioEvento)
                document.getElementById("DataFim").value = format.formatData(res.data.DataFimEvento)
                document.getElementById("CargaHoraria").value = res.data.CargaHorarioTotal
                let local = getInformations.findLocal(res.data.Espaco_idEspaco);
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