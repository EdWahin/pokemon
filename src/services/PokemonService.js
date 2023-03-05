class PokemonService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');

        return await res.results.map(item => item.name)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return {
            id: res.id,
            name: res.name,
            thumbnail: res.sprites.other.dream_world.front_default,
            types: res.types.map(item => item.type.name),
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
            hp: res.stats[0].base_stat,
            sp_attack: res.stats[3].base_stat,
            sp_defense: res.stats[4].base_stat,
            speed: res.stats[5].base_stat,
            weight: res.weight,
            moves: res.moves.length 
        }
    }
}

export default PokemonService;