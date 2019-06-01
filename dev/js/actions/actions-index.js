//Step 5
//Actions
//Action is part that is returned
    //Made of 2 parts,
    //1. type, explains action
    //2. payload, data to be used

    //Action Creator
    //The state to which the main view should switch
    //0 = search list
    //1 = pokemon info view
    //2 = encounter
    //3 = evolve
    export const pokedexView = (view) => {

        return{
            //Action
            type: "POKEDEX_VIEW",
            payload: view
        }
    };




    //Action Creator
    //active slide of pokemon being viewed on the
    //search slides view, used to detect if the Pokemon
    //ifnormation screen should be shown if the Pokemon
    //option that has been clicked on is the currently
    //active slide, if not, the dom will just slide
    //to the selected option.
    //(therefor if slide is already the active slide and
    //is clicked again, then information will show)
    export const activeIndex = (index) => {

        return{
            //Action
            type: "ACTIVE_INDEX",
            payload: index
        }
    };

    //Action Creator
    //pokemon to be show on the search lsit screen
    //use to be able to blackout if not yet encountered
    //or not
    export const previewIndex = (preview) => {

        return{
            //Action
            type: "PREVIEW_INDEX",
            payload: preview
        }
    };


    //Action Creator
    //list of evolutions of the selected pokemon to be
    //show on the info screen for links to those pokemon also
    export const selectEvolutions = (evolutions) => {
        return{
                //Action
                type: "EVOLUTIONS_SELECTED",
                payload: evolutions
              }
      };



      //Action Creator
      //list of evolutions of the selected pokemon to be
      //show on the info screen for links to those pokemon also
      export const pokemonEncountered = (pokemonAr) => {

          return{
                  //Action
                  type: "POKEMON_ENCOUNTERED",
                  payload: pokemonAr
                }
        };




        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const pokemonCaught = (pokemonAr) => {
            return{
                    //Action
                    type: "POKEMON_CAUGHT",
                    payload: pokemonAr
                  }
        };

        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const showEncounter = (show) => {
            return{
                    //Action
                    type: "SHOW_ENCOUNTER",
                    payload: show
                  }
        };

        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const eventMessage = (msg) => {
            return{
                    //Action
                    type: "EVENT_MESSAGE",
                    payload: msg
                  }
        };


        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const encounterIndex = (id) => {
            return{
                    //Action
                    type: "POKEMON_ENCOUNTER",
                    payload: id
                  }
        };


        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const throwHit = (hit) => {
            return{
                    //Action
                    type: "POKEBALL_CATCH",
                    payload: hit
                  }
        };


        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const throwMiss = (miss) => {
            return{
                    //Action
                    type: "POKEBALL_MISS",
                    payload: miss
                  }
        };

        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const showEvolve = (show) => {
            return{
                    //Action
                    type: "SHOW_EVOLVE",
                    payload: show
                  }
        };

        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const evolveIndex1 = (id) => {
            return{
                    //Action
                    type: "EVOLVE_INDEX_1",
                    payload: id
                  }
        };

        //Action Creator
        //list of evolutions of the selected pokemon to be
        //show on the info screen for links to those pokemon also
        export const evolveIndex2 = (id) => {
            return{
                    //Action
                    type: "EVOLVE_INDEX_2",
                    payload: id
                  }
        };
