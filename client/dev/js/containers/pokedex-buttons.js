import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pokedexView, activeIndex, previewIndex,
        showEncounter, showEvolve,
        eventMessage,
        encounterIndex, evolveIndex1, evolveIndex2,
        pokemonEncountered, pokemonCaught} from '../actions/actions-index';

class PokedexButtons extends Component {

  showDetails(){
    let encArr = this.props.encounteredArr.slice();
    if(this.props.encounterShow == false && this.props.evolveShow == false){
      if(encArr.includes(this.props.indexPreview))
        this.props.dexView == 1 ? this.props.pokedexView(2) : this.props.pokedexView(1)
    }
  }

  updateEncounteredPokemon(id){
    let encounteredList = this.props.encounteredArr;


    this.props.pokemonEncountered(encounteredList);
  }
  updateArrPokemon(id, arr){
    if(!arr.includes(id)){
      arr.push(id);
    }
    return arr;
  }

  loadEncounter(){

    let pokeList = this.props.pokemonArr;
    let caughtList = this.props.caughtArr;
    let encounteredList = this.props.encounteredArr;

    let unCaughtArr = pokeList.filter( function( mon ) {
                    return !caughtList.includes( (parseInt(mon.id) - 1) );
      } );

    //// TODO: random between 1 and tot pokemon
    let randMon = unCaughtArr[Math.floor(Math.random() * unCaughtArr.length)]
    let randIndex = parseInt(randMon.id) - 1;

    let encounteredUpdated = this.updateArrPokemon(randIndex, encounteredList);
    this.props.pokemonEncountered(encounteredUpdated);
    //TODO
    // graphql update encounter list (if not encountered)

    this.props.encounterIndex(randIndex);
    this.props.eventMessage("A wild " + this.props.pokemonArr[randIndex].Name + " appeared!")
    this.props.showEncounter(true);

  }
  loadEvolve(){

    let evoPokemon = this.props.pokemonArr[this.props.indexActive];
    let evoLine = evoPokemon.EvoLine;
    let finalEvo = parseInt(evoLine[evoLine.length - 1]) - 1;

    let evoId1 = this.props.indexActive;

    if(evoId1 != finalEvo){
      let activeEvoId = evoLine.indexOf(evoPokemon.id);
      let evoId2 = parseInt(evoLine[activeEvoId + 1]) - 1;

      this.props.evolveIndex1(evoId1);
      this.props.evolveIndex2(evoId2);
      this.props.eventMessage("What?!<br />" + evoPokemon.Name + " is evolving!");
      this.props.showEvolve(true);

      let encounteredUpdated = this.updateArrPokemon(evoId2, this.props.encounteredArr);
      this.props.pokemonEncountered(encounteredUpdated);
      let caughtUpdated = this.updateArrPokemon(evoId2, this.props.caughtArr);
      this.props.pokemonCaught(caughtUpdated);

      var swiper = document.querySelector('.swiper-container').swiper;
      swiper.slideTo(evoId2);

      setTimeout(() => {

        this.props.eventMessage("Congratulations,<br />" + evoPokemon.Name +
                                " evolved into " +
                                this.props.pokemonArr[evoId2].Name + "!");

        setTimeout(() => {
          this.props.activeIndex(evoId2);
          this.props.previewIndex(evoId2);
          this.props.showEvolve(false);
        }, 3000);
      }, 8000);



    }
  }


    render() {

      let evoPokemon = this.props.pokemonArr[this.props.indexActive];
      let evoLine = evoPokemon.EvoLine;
      let finalEvo = parseInt(evoLine[evoLine.length - 1]) - 1;

      //ensure the pokemon isn't the final evolution
      let allowEvo = this.props.indexActive == finalEvo ? false : true;

      //ensure the pokemon is caught
      if(allowEvo)
        allowEvo = this.props.caughtArr.includes(this.props.indexActive) ? true : false;

        return(
              <div className="pokedex-button-row">
                <div className="pokedex-button-nav">
                  <div className={this.props.dexView == 0 ? "view-btn disable" :
                                  this.props.encounterShow ? "view-btn disable" :
                                  this.props.dexView == 1 ? "view-btn" :
                                  //we must be on page 2 then //check if evolve in progress
                                  this.props.evolveShow ? "rtrn-btn disable" : "rtrn-btn"}
                        onClick={() => {this.props.dexView == 0 ? {} : this.showDetails()}}
                  >
                  <span></span></div>
                </div>

                <div className="pokedex-button-action">
                  <div className={this.props.dexView == 0 ? "encounter-btn disable" :
                                  this.props.encounterShow ? "encounter-btn disable" :
                                  this.props.dexView == 1 ? "encounter-btn" :
                                  //we must be on page 2 then //check if evolve in progress
                                  this.props.evolveShow ? "evolve-btn disable" :
                                  //if not, check if about to evolve pokemon
                                  allowEvo ? "evolve-btn" : "evolve-btn disable" }
                        onClick={() => {
                                          this.props.dexView == 0 ? {} :
                                          this.props.dexView == 1 ? this.loadEncounter() :
                                          this.props.dexView == 2 ?
                                          allowEvo ? this.loadEvolve() : {} : {};

                                        }
                                }
                  ><span></span></div>
                </div>

                <Mutation mutation={UPDATE_SCORE_POS}>
                  {(updateCaught, { data }) => (
                      <form className="submitPos"
                        onSubmit={e => {
                          if(!this.context.userid) {; this.context.signout(); return <Redirect to="/" />}
                          e.preventDefault();
                          updateScorePos({ variables: { userid: this.context.userid, wordid: cardid } });
                        }}
                      >
                      </form>
                    )
                  }
                </Mutation>

              </div>
            );

}

}


//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
        dexView: state.pokedexView,
        indexActive: state.activeIndex,
        indexPreview: state.previewIndex,
        pokemonArr: state.pokemonList,

        encounterShow: state.showEncounter,
        evolveShow: state.showEvolve,

        encounteredArr: state.pokemonEncountered,
        caughtArr: state.pokemonCaught
      }

}

//Takes action for component and hooks it up
//Similar to above
//Dispatch refers to funciton being called
function matchDispatchToProps(dispatch){

return bindActionCreators({ pokedexView: pokedexView,
                            activeIndex: activeIndex,
                            previewIndex: previewIndex,

                            showEncounter: showEncounter,
                            showEvolve: showEvolve,

                            eventMessage: eventMessage,

                            encounterIndex: encounterIndex,
                            evolveIndex1: evolveIndex1,
                            evolveIndex2: evolveIndex2,

                            pokemonEncountered: pokemonEncountered,
                            pokemonCaught: pokemonCaught




                          }, dispatch);

    //connect-function
    // prop : action/function
    // dispatch (behind the scenes with redux to call func)

}


export default connect(mapStateToProps, matchDispatchToProps)(PokedexButtons);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
