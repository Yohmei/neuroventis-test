const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const get = async (endpoint) => {
    const url = SERVER_URL + endpoint;
    const response = await fetch(url);
    console.log(response.status);
    if (response.ok) {
        return response.json();
    }

    return null;
}

module.exports = {
    get
};
