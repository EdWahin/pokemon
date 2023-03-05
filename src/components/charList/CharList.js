import { useState, useEffect } from 'react';

import './charList.scss';

const CharList = (props) => {

    const [allPokemons, setAllPokemons] = useState([]);
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
    const [newItemLoading, setNewItemLoading] = useState(false);

    const getAllPokemons = async () => {
        setNewItemLoading(true);

        const res = await fetch(loadMore);
        const data = await res.json();

        setLoadMore(data.next);

        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();

                setAllPokemons(currentList => [...currentList, data]);

            });
        }
        createPokemonObject(data.results);
        setNewItemLoading(false);
    }

    useEffect(() => {
        getAllPokemons();
    }, [])

    const Pokemon = ({ name, image, type, id, index }) => {

        name = name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <li
                className="char__item"
                tabIndex={0}
                onClick={() => {
                    props.onPokemonSelected(id);
                }}
            >
                <img src={image} alt={name} />
                <div className="char__name">{name}</div>
                <ul className="char__type">
                    {
                        type.map((item) => {
                            let style = `char__type-item ${item}`
                            return <li className={style}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                        })
                    }
                </ul>
            </li>
        )
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {allPokemons.map((pokemon, i) =>
                    <Pokemon
                        key={i}
                        id={pokemon.id}
                        index={i}
                        name={pokemon.name}
                        image={pokemon.sprites.other.dream_world.front_default}
                        type={pokemon.types.map(item => item.type.name)}
                    />
                )}
            </ul>

            <button
                className="button"
                onClick={() => getAllPokemons()}
                disabled={newItemLoading}
            >
                <div className="button__inner">Load More</div>
            </button>
        </div>
    )
}

export default CharList;