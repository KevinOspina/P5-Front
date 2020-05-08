import axios from "axios";

class ApiConnect{
    constructor(){
        this.url_api = 'http://localhost:3002/';
    }

    post = (url, params, headers) => {
        return axios.post(url, params, headers);
    }

    get = (url, params, headers) => {
        return axios.get(url, params, headers);
    }


//INSERTS
    insertEventos = (params) => {
        return axios.post(this.url_api + 'eventos/aa', params, {
            'Cookie': document.cookie,
            'Content-Type': 'application/json'
        });
    }

    insertCuadrillas = (params) => {
        return axios.post(this.url_api + 'cuadrillas/aa', params, {
            'Cookie': document.cookie,
            'Content-Type': 'application/json'
        });
    }

    
    insertActividad = (params) => {
        return axios.post(this.url_api + 'actividades/aa', params, {
            'Cookie': document.cookie,
            'Content-Type': 'application/json'
        });
    }


//GET
    getActividades = (params) => {
        return axios.get(this.url_api + 'actividades/g', params, {
            'Cookie': document.cookie,
            'Content-Type': 'application/json'
        });
    }



}

export default ApiConnect;