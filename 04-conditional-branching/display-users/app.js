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
 * @param {string} url
 * @return Promise
 */
const getUsers = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Function that create the backbone of the map
 * @param {HTMLDivElement} element
 */
const createMap = (element) => {
    return L.map(element, {
        center: [0, 0], zoom: 2, attributionControl: true, zoomControl: true,
    });
};

/**
 * Create User Location Markers
 * @param {Array<User>} users
 * @return Object
 */
const createUserLocations = (users) => {
    const markers = [];
    for (let user of users) {
        const latLng = user.address.geo;
        const marker = L.marker(L.latLng(latLng.lat, latLng.lng));
        marker.bindPopup(`<div>
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
            </div>`).openPopup();
        markers.push(marker);
    }
    return markers;
};

/**
 * Function that displays the map
 * @return Object
 */
const addMapToDOM = () => {
    const divMap = document.getElementById('map');
    const map = createMap(divMap);
    const openStreetMapTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy;' + new Date().getFullYear(),
    });
    openStreetMapTileLayer.addTo(map);
    return map;
};


/**
 * Create table header
 * @param {User} user
 * @return HTMLElement
 */
const tableHeader = (user) => {
    const thead = document.createElement('thead');
    thead.innerHTML += `
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
        </tr>
    `;

    return thead;
};

/**
 *Create a table body
 * @param {Array<User>} users
 * @return {HTMLTableSectionElement}
 */
const tableBody = (users) => {
    const tbody = document.createElement('tbody');
    const userTableRow = (user) => {
        const tr = document.createElement('tr');
        const newUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: `${user.address.city} - ${user.address.street} - ${user.address.suite}`,
            phone: user.phone,
            website: user.website,
            company: user.company.name,
        };

        for (let key in newUser) {
            const td = document.createElement('td');
            if (String(key) === 'id') {
                td.innerHTML = `<a id="user-${user[key]}" class="user-id">${newUser[key]}</a>`;
            } else {
                td.innerHTML = newUser[key];
            }
            tr.append(td);
        }

        return tr;
    };
    const tableRows = users.map(user => userTableRow(user));
    tbody.append(...tableRows);
    return tbody;
};

/**
 * Display Users In the DOM
 * @param users
 * @return {HTMLTableElement}
 */
const displayUser = (users) => {
    const table = document.createElement('table');
    const thead = tableHeader(users[0]);
    const tbody = tableBody(users);
    table.append(thead, tbody);
    return table;
};

/**
 * Return user id
 * @param {string} textId
 */
const getUserId = (textId) => {
    // textId: 'user-1' or 'user-2', ...
    return Number(textId.split('-')[1]);
};

/**
 * Entry Point of program
 */
document.addEventListener('DOMContentLoaded', async () => {
    const map = addMapToDOM();
    const users = await getUsers("https://jsonplaceholder.typicode.com/users");
    const locations = createUserLocations(users);
    locations.forEach(location => {
        location.addTo(map);
    });

    let links;
    setTimeout(() => {
        links = document.querySelectorAll("a.user-id");
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();

                const userId = getUserId(e.target.id);
                const currentUser = users.find(user => user.id === userId);

                if (!currentUser) {
                    alert('User not locate on map');
                    return;
                }

                const latLng = currentUser.address.geo;
                map.setView(L.latLng(latLng.lat, latLng.lng), 3, {
                    animate: true, duration: 0.5
                });
            });
        });
    }, 1000);


    document.getElementById('user-infos').appendChild(displayUser(users));
});