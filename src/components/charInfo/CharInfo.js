import { useState, useEffect } from 'react';

import PokemonService from '../../services/PokemonService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);

    const pokemonService = new PokemonService();

    useEffect(() => {
        updateChar();
    }, [props.pokemonId])

    const updateChar = () => {
        const { pokemonId } = props;

        if (!pokemonId) {
            return;
        }

        onCharLoading();

        pokemonService.getCharacter(pokemonId)
            .then(onCharLoaded)
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const skeleton = !char ? <Skeleton/> : null;
    const spinner = loading ? <Spinner/> : null
    const content = !(!char || loading) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    let { name, thumbnail, types, attack, defense, hp, sp_attack, sp_defense, speed, weight, moves } = char;

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <>
            <div className="char__img">
                <img src={thumbnail} alt={name} />
            </div>
            <div className="char__info-name">{name}</div>
            <table className="char__table">
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td>{types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>{attack}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{defense}</td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{hp}</td>
                    </tr>
                    <tr>
                        <td>SP Attack</td>
                        <td>{sp_attack}</td>
                    </tr>
                    <tr>
                        <td>SP Defence</td>
                        <td>{sp_defense}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{speed}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{weight}</td>
                    </tr>
                    <tr>
                        <td>Total moves</td>
                        <td>{moves}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default CharInfo;