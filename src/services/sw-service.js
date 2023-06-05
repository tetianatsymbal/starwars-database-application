import axios from 'axios';

class SwService {
_apiBaseUrlData="https://swapi.dev/api/";
_apiBaseUrlImg="https://starwars-visualguide.com/assets/img/";

getResource = async (urlData, urlImg) => {
    let response = null;
    try {
        let resData = await axios.get(urlData);
        let resImg = await axios.get(urlImg);
        response = [resData, resImg];
    } catch (error) {
        response = {
            errorMessage: error.message,
            status: error.response.status
        }
    }
    return response;
}

getData = (id, category) => {
    let characters = null;
    if (category == "people") {characters = "characters"} else {characters = category}
    return this.getResource(`${this._apiBaseUrlData}${category}/${id}/`, `${this._apiBaseUrlImg}${characters}/${id}.jpg`)
}
}
export default SwService;