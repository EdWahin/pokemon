import { useState } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharHeader from "../charHeader/CharHeader";

function App() {

    const [selectedPokemon, setPokemon] = useState(null);

    const onPokemonSelected = (id) => {
        setPokemon(id);
    }

    return (
        <div className="app">
            <main>
                <CharHeader />
                <div className="char__content">
                    <CharList onPokemonSelected={onPokemonSelected} />
                    <CharInfo pokemonId={selectedPokemon} />
                </div>
            </main>
        </div>
    );
}

export default App;
