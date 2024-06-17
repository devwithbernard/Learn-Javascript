const LIMIT_FETCHING_POKEMON = 10;

const getPokemons = async (url) => {
    let errorMessage = null;
    try {
        const response = await fetch(url);
        return (await response.json()).results;
    } catch (e) {
        errorMessage = `
                        😓😓😓😓😓😓😓😓😓
            Something gets wrong while fetching pokemons!!!!
        `;
    }
    return errorMessage;
};

/**
 * Build a pokemon node
 * @param obj<{name: string, url: string}>
 * @return HTMLElement
 */
const pokemon = (obj) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('pokemon');

    const paragraph = document.createElement('p');
    paragraph.innerText = obj.name;

    const link = document.createElement('a');
    link.href = obj.url;
    link.classList.add('pokemon-link');
    link.textContent = 'More infos...';
    wrapper.append(paragraph, link);
    return wrapper;
};
const addPokemonsToDOM = (pokemons) => {
    const pokemonsNode = pokemons.map(pk => pokemon(pk));
    document.getElementById("list-of-pokemons").append(...pokemonsNode);
};
const errorParagraph = (message) => {
    const p = document.createElement('p');
    p.classList.add('error');
    p.innerText = message;
    return p;
};
const getPokemonInfos = async (url) => {
    let errorMessage = null;
    try {
        const response = await fetch(url);
        const results = await response.json();
        const {abilities, height, cries, forms, stats} = results;
        return {
            height, abilities, cries, forms, stats
        };
    } catch (e) {
        errorMessage = e.message;
    }
};
const randomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
};

const getPokemonFormsImages = async (url) => {
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results.sprites;
    } catch (e) {
        console.log(e.message);
    }
};

const pokemonInfos = (infos) => {
    // abilities, height, cries, forms, stats
    const {abilities, height, cries, forms, stats} = infos;
    console.log(forms);
    // Height
    const heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${height}`;
    // Abilities
    const abilitiesWrapperElement = document.createElement('div');
    abilities.forEach(obj => {
        const div = document.createElement('div');
        div.classList.add('flex-align-center');
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        if (obj.is_hidden) {
            circleDiv.style.backgroundColor = "#000000";
        } else {
            circleDiv.style.backgroundColor = randomHexColor();
        }
        const p = document.createElement('p');
        p.innerHTML = obj.ability.name;

        // add to container
        div.append(circleDiv, p);
        abilitiesWrapperElement.appendChild(div);
    });

    const containerInfos = document.createElement('div');
    containerInfos.append(heightElement, abilitiesWrapperElement);
    return containerInfos;
};
// entry points
document.addEventListener('DOMContentLoaded', async () => {
    const pokemons = await getPokemons(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_FETCHING_POKEMON}`);

    if (typeof pokemons === 'string') {
        document.getElementById('list-of-pokemons').appendChild(errorParagraph(pokemons));
        return;
    }

    addPokemonsToDOM(pokemons);

    const allLinks = document.querySelectorAll('.pokemon-link');
    for (let i = 0; i < allLinks.length; i++) {
        const link = allLinks[i];
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            link.classList.add('link-hidden');
            const infos = await getPokemonInfos(e.target.href);
            // forms
            const sprites = await getPokemonFormsImages(infos.forms[0].url);
            const mapSprites = [];
            for (let key in sprites) {
                if (sprites[key] !== null) {
                    mapSprites.push(sprites[key]);
                }
            }

            let randomIndex = (limit) => {
                return Math.floor(Math.random() * limit);
            }
            let randomSrc = mapSprites[randomIndex(mapSprites.length)];
            setInterval(() => {
                document.getElementById('pokemon-detail')?.remove();
                const img = document.createElement('img');
                img.id = 'pokemon-detail';
                img.alt = 'pokemon';
                link.insertAdjacentElement('beforebegin', img);
                img.src = randomSrc;
            }, 5 * 1000);
            const pokemonInfosNode = pokemonInfos(infos);
            link.insertAdjacentElement('afterend', pokemonInfosNode);

            const a = document.createElement('a');
            a.classList.add('hide-infos');
            a.innerText = 'Hide infos';
            link.insertAdjacentElement('afterend', a);
            a.addEventListener('click', e => {
                e.preventDefault();
                link.classList.remove('link-hidden');
                pokemonInfosNode.remove();
                a.remove();
            });
        });
    }
});

