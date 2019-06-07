import {combineReducers} from 'redux';
import PokedexView from './reducer-pokedex-view';

import PokemonReducer from './reducer-pokemon';

import ActiveIndexReducer from './reducer-active-index';
import ActiveEvolutionsReducer from './reducer-active-evolutions';
import PreviewIndexReducer from './reducer-preview-index';

import PokemonEncounteredReducer from './reducer-pokemon-encountered';
import PokemonCaughtReducer from './reducer-pokemon-caught';

import EventMessageReducer from './reducer-event-message';

import ShowEncounterReducer from './encounter-reducers/reducer-show-encounter';
import EncounterIDReducer from './encounter-reducers/reducer-pokemon-encounter';
import ThrowHitReducer from './encounter-reducers/reducer-throw-hit';
import ThrowMissReducer from './encounter-reducers/reducer-throw-miss';

import ShowEvolveReducer from './evolve-reducers/reducer-show-evolve';
import EvolveIndex1Reducer from './evolve-reducers/reducer-evolve-index-1';
import EvolveIndex2Reducer from './evolve-reducers/reducer-evolve-index-2';

const allReducers = combineReducers({
    pokedexView: PokedexView,
    pokemonList: PokemonReducer,
    activeIndex: ActiveIndexReducer,
    activeEvolutions: ActiveEvolutionsReducer,
    previewIndex: PreviewIndexReducer,
    pokemonEncountered: PokemonEncounteredReducer,
    pokemonCaught: PokemonCaughtReducer,
    eventMessage: EventMessageReducer,
    showEncounter: ShowEncounterReducer,
    encounterIndex: EncounterIDReducer,
    throwHit: ThrowHitReducer,
    throwMiss: ThrowMissReducer,
    showEvolve: ShowEvolveReducer,
    evolveIndex1: EvolveIndex1Reducer,
    evolveIndex2: EvolveIndex2Reducer
});


export default allReducers;
