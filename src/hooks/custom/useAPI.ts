import axios from "axios"

function useApi() {
    return axios.create({
        baseURL: "http://54.175.24.64:8080/",
    })
}

export default useApi