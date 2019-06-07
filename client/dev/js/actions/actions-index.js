
export const pokedexView = (view) => {
    return{
      //Action
      type: "POKEDEX_VIEW",
      payload: view
    }
};

export const activeIndex = (index) => {
    return{
      //Action
      type: "ACTIVE_INDEX",
      payload: index
    }
};

export const previewIndex = (preview) => {
    return{
      //Action
      type: "PREVIEW_INDEX",
      payload: preview
    }
};

export const selectEvolutions = (evolutions) => {
    return{
      //Action
      type: "EVOLUTIONS_SELECTED",
      payload: evolutions
    }
};

export const pokemonEncountered = (pokemonAr) => {
    return{
      //Action
      type: "POKEMON_ENCOUNTERED",
      payload: pokemonAr
    }
};

export const pokemonCaught = (pokemonAr) => {
    return{
      //Action
      type: "POKEMON_CAUGHT",
      payload: pokemonAr
    }
};

export const showEncounter = (show) => {
    return{
      //Action
      type: "SHOW_ENCOUNTER",
      payload: show
    }
};

export const eventMessage = (msg) => {
    return{
      //Action
      type: "EVENT_MESSAGE",
      payload: msg
    }
};

export const encounterIndex = (id) => {
    return{
      //Action
      type: "POKEMON_ENCOUNTER",
      payload: id
    }
};

export const throwHit = (hit) => {
    return{
      //Action
      type: "POKEBALL_CATCH",
      payload: hit
    }
};

export const throwMiss = (miss) => {
    return{
      //Action
      type: "POKEBALL_MISS",
      payload: miss
    }
};

export const showEvolve = (show) => {
    return{
      //Action
      type: "SHOW_EVOLVE",
      payload: show
    }
};

export const evolveIndex1 = (id) => {
    return{
      //Action
      type: "EVOLVE_INDEX_1",
      payload: id
    }
};

export const evolveIndex2 = (id) => {
    return{
      //Action
      type: "EVOLVE_INDEX_2",
      payload: id
    }
};
