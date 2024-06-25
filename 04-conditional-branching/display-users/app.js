/**
 * An object that represents the type of coordinates location of a user
@typedef {{
    lat: number,
    lng: number
}} GeomPoint
 */
/**
 * An object that represents the address of a user
 * @typedef {{
 *     street: string,
 *     suite: string,
 *     city: string,
 *     zipcode: string,
 *     geo: GeomPoint
 * }} Address
 */
/**
 * @typedef {{
 *     name: string,
 *     catchPhrase: string,
 *     bs: string
 * }} Company
 */

/**
 * An object that represents a user
 * @typedef {{
 *      id: number,
 *      name: string,
 *      username: string,
 *      email: string,
 *      address: Address,
 *      phone: string,
 *      website: string,
 *      company: Company
 * }} User
 */

/**
 * Get users from this endpoint: https://jsonplaceholder.typicode.com/users
 * @param url
 * @return Promise
 */
const getUsers = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Function that create the backbone of the map
 * @param {HTMLDivElement} element
 */
const createMap = (element) => {
    return L.map(element, {
        center: [0, 0],
        zoom: 2,
        attributionControl: true,
        zoomControl: true,
    });
}

/**
 *
 * @param {Array<User>} users
 * @return Object
 */
const createUserLocations = (users) => {
    const markers = [];
    for (let user of users) {
        const latLng = user.address.geo;
        const marker = L.marker(L.latLng(latLng.lat, latLng.lng));
        marker.on('click', (e) => {
            // Display user informations here
            console.log(user);
        })
        markers.push(marker);
    }
    return markers;
}

/**
 * Function that displays the map
 */
const addMapToDOM = () => {
    const divMap = document.getElementById('map');
    const map = createMap(divMap);
    const openStreetMapTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;' + new Date().getFullYear(),
    });
    openStreetMapTileLayer.addTo(map);
    return map;
}

document.addEventListener('DOMContentLoaded', async () => {
    const map = addMapToDOM();
    const users = await getUsers("https://jsonplaceholder.typicode.com/users");
    const locations =  createUserLocations(users);
    locations.forEach(location => {
        location.addTo(map);
    });
    // document.getElementById('user-infos').appendChild(displayUser(users[0]))
})
/**
 * Create table header
 * @param {User} user
 * @return HTMLElement
 */
const tableHeader = (user) => {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let key of Object.keys(user)) {
        const th = document.createElement('th');
        th.innerHTML = key;
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    return thead;
}
const tableBody = (users) => {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');

    for (let user of users) {
        for (let key of Object.keys(user)) {
            const td = document.createElement('td');

            if (typeof user[key] === 'string') {
                td.innerHTML = user[key];
            }

            tr.appendChild(td)
        }

    }
    tbody.appendChild(tr);
}

const displayUser = (users) => {
    const table = document.createElement('table');
    const thead = tableHeader(users[0]);

    const tbody = tableBody(users);
    return table;
}
