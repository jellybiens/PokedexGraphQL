import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showEncounter, eventMessage, encounterIndex, throwHit, throwMiss,
  pokemonEncountered, pokemonCaught,
  activeIndex, previewIndex, pokedexView} from '../actions/actions-index';

class EventEncounter extends Component {

  throwPokeball(){
    var pokeball = document.querySelector(".catch-retical");
    var matrix = getComputedStyle(pokeball).transform.match(/(-?[0-9\.]+)/g);//.style.transform;
    var innerPos = Math.abs(parseInt(matrix[5]));

    var radius = document.querySelector(".catch-radius");
    var outerPos = parseInt(getComputedStyle(radius).width, 10);

    let pokemonId = this.props.encounterId;
    let pokemon = this.props.pokemonArr[pokemonId];

    if(innerPos < outerPos/1.5){
      this.props.throwHit(true);

      let caughtArr = this.props.pokemonCaughtArr;
      caughtArr.push(this.props.encounterId);
      this.props.pokemonCaught(caughtArr);

      this.props.activeIndex(pokemonId);
      this.props.previewIndex(pokemonId);

      this.props.pokedexView(2)
      var swiper = document.querySelector('.swiper-container').swiper;
      swiper.slideTo(pokemonId);
      setTimeout(() => {
        this.props.eventMessage("Great throw!<br />" + pokemon.Name + " was caught!")
      }, 2000);
     }else{
       this.props.throwMiss(true);
       setTimeout(() => {
         this.props.eventMessage("You missed,<br />" + pokemon.Name + " ran away!");
       }, 2500);
     }



      setTimeout(() => {
        this.props.showEncounter(false);
        setTimeout(() => {
          this.props.throwHit(false);
          this.props.throwMiss(false);
        }, 500);
      }, 6000);


  }

  componentDidUpdate(){

  }


    render() {
        let pokemonId = this.props.encounterId;
        let encounterPokemon = this.props.pokemonArr[pokemonId];
        let imgSource = "https://www.smogon.com/dex/media/sprites/xy/" + encounterPokemon.Name.toLowerCase().replace(" ", "_") + ".gif";

        let linesTot = this.props.encounterShow ? 100 : 1;

        let speedLines = [];
        for(let i = 0;i < linesTot;i++){
          speedLines.push(<div key={i} className="rain"></div>);
        }

         return (
                      <div className={this.props.encounterShow ?
                                        "event-container catch-container-active" :
                                        "event-container catch-container-inactive"}>
                        <div  className="event-border-box">
                          <div  className="catch-background">
                            {speedLines}


                          </div>
                          <div  className="catch-foreground-container">

                            <div  className="catch-sprite">

                              <div className="pokeball-throw-animation">
                                      <img className={this.props.pokeballHit ?
                                                    "pokeball-throw-hit-img" : this.props.pokeballMiss ?
                                                    "pokeball-throw-miss-img" : "pokeball-hold-img"}
                                                    src="https://cdn.bulbagarden.net/upload/a/af/Pok%C3%A9_Ball_battle_IV.png" />
                              </div>

                              <img className={this.props.pokeballHit ?
                                                "wild-pokemon wild-pokemon-caught" : this.props.pokeballMiss ?
                                                  "wild-pokemon wild-pokemon-run" : "wild-pokemon"}
                                                  key={encounterPokemon.id + "x"}
                                                  src={imgSource}  />

                              <div  className="catch-base"></div>

                              <div className={this.props.pokeballHit ?
                                                "catch-radius-container-disable" : this.props.pokeballMiss ?
                                                "catch-radius-container-disable" : "catch-radius-container"}>

                                <div  className="catch-retical-container">
                                  <div  className={this.props.encounterShow ? "catch-retical" : "catch-retical-disable"}></div>
                                </div>

                                <div className="catch-radius-container">
                                  <div className="catch-radius"></div>
                                </div>

                              </div>

                            </div>

                          </div>
                        </div>
                        <div  className={this.props.encounterShow ?
                                          "event-text-box" : "event-text-box-disable"}>
                                            <span className="encounter-text" dangerouslySetInnerHTML={{__html: this.props.eventMsg}}></span>
                                            <div className="encounter-btn-container">
                                                <div className={this.props.pokeballHit ?
                                                                "throw-btn-hide" : this.props.pokeballMiss ?
                                                                  "throw-btn-hide" : "throw-btn"}
                                                                  onClick={() => this.throwPokeball()}>
                                                                    <span></span>
                                                  </div>
                                            </div>
                        </div>
                      </div>


              );

    }

}

//Takes application state(part of store),
//maps to props in component above
//gives access to this.state.props from store
function mapStateToProps(state){

    return {
        encounterShow: state.showEncounter,
        evolveShow: state.showEvolve,

        eventMsg: state.eventMessage,

        encounterId: state.encounterIndex,
        pokeballHit: state.throwHit,
        pokeballMiss: state.throwMiss,

        pokemonArr: state.pokemonList,
        pokemonEncounteredArr: state.pokemonEncountered,
        pokemonCaughtArr: state.pokemonCaught
      }

}

//Takes action for component and hooks it up
//Similar to above
//Dispatch refers to funciton being called
function matchDispatchToProps(dispatch){

return bindActionCreators({ showEncounter: showEncounter,
                            encounterIndex: encounterIndex,
                            eventMessage: eventMessage,
                            throwHit: throwHit,
                            throwMiss: throwMiss,

                            pokemonCaught: pokemonCaught,
                            pokemonEncountered: pokemonEncountered,

                            activeIndex: activeIndex,
                            previewIndex: previewIndex,
                            pokedexView: pokedexView
                            }, dispatch);

    //connect-function
    // prop : action/function
    // dispatch (behind the scenes with redux to call func)

}


export default connect(mapStateToProps, matchDispatchToProps)(EventEncounter);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
