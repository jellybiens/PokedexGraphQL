import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PokemonSearch from '../containers/pokemon-search';
import PokemonDetail from '../containers/pokemon-detail';
import BubbleBackground from '../containers/bubble-background';
import PokedexButtons from '../containers/pokedex-buttons';
import PokedexEvents from '../containers/pokedex-events';
import {pokedexView} from '../actions/actions-index';

import githubImg from '../images/github.png';
import linkedinImg from '../images/linkedin.png';
import twitterImg from '../images/twitter.png';

class PokedexContainer extends Component {


  componentDidUpdate(){
    var search = document.querySelector('.pokemon-search');
    var details = document.querySelector('.pokemon-info');

    if(this.props.dexView == 1 || this.props.dexView == 0){
      search.style["transform"] = "translateX(0%)";
      details.style["transform"] = "translateX(100%)";
    }else if(this.props.dexView == 2){
      search.style["transform"] = "translateX(-100%)";
      details.style["transform"] = "translateX(0%)";
    }
  }
  throwPokeball(){
    var pokeball = document.querySelector(".catch-retical");
    var matrix = getComputedStyle(pokeball).transform.match(/(-?[0-9\.]+)/g);//.style.transform;
    var innerPos = Math.abs(parseInt(matrix[5]));

    var radius = document.querySelector(".catch-radius");
    var outerPos = parseInt(getComputedStyle(radius).width, 10);

    if(innerPos < outerPos/2){
      this.props.throwHit(true);

      let caughtArr = this.props.pokemonCaughtArr;
      caughtArr.push(this.props.encounterId);
      this.props.pokemonCaught(caughtArr);

      let pokemonId = parseInt(this.props.pokemon.id) - 1;

      this.props.activeIndex(pokemonId);
      this.props.previewIndex(pokemonId);

     }else{
       this.props.throwMiss(true);
     }

    setTimeout(() => {
      innerPos < outerPos/2 ? this.props.eventMessage(this.props.pokemon.Name + " was caught!") : this.props.eventMessage(this.props.pokemon.Name + " ran away!");
      setTimeout(() => {
        this.props.showEncounter(false);
        setTimeout(() => {
          this.props.throwHit(false);
          this.props.throwMiss(false);
          innerPos < outerPos/2 ? this.props.pokedexView(1) : {}
         }, 3000);
       }, 3000);
     }, 3000);

  }

  //// TODO:
  //Component mount, bring in all pokemon details from query into reducer-pokemon

    render() {

        return(
              <div className="pokedex">


                <div className="pokedex-container">
                  <div className="pokedex-header">


                      <div className="header-left">
                          <div className="led-box">
                            <div className={this.props.dexView == 0 ? "led-blue led-off" : "led-blue"}></div>
                          </div>
                      </div>

                      <div className="header-centre">
                      </div>

                      <div  className="header-right"
                            onClick={() => {
                              this.props.dexView == 0 ? this.props.pokedexView(1) : this.props.pokedexView(0)
                            }}>
                      <div className="sliderContainer">
                        <div className={this.props.dexView == 0 ? "switch-base-off" : "switch-base-on"}>
                            <div className="slider-circle"></div>
                        </div>
                      </div>
                      </div>

                  </div>

                  <div className="screen-shadow">
                    <div className="shadow-black"></div>
                    <div className="shadow-red"></div>
                  </div>

                  <div className="pokedex-screen-row">


                      <div className={
                        this.props.dexView == 0 ? "pokedex-screen-container container-off" : "pokedex-screen-container container-on"}
                      >
                        <div className="pokedex-screen-display">
                          <BubbleBackground />
                          <PokedexEvents />
                          <PokemonSearch />
                          <PokemonDetail />
                        </div>
                      </div>

                  </div>

                  <PokedexButtons />

                  <div className="links-container">
                      <a href="https://twitter.com/jellybiens_"><img src={twitterImg} /></a>
                      <a href="https://www.linkedin.com/in/ethan-w-a1676a92/"><img src={linkedinImg} /></a>
                      <a href="https://github.com/jellybiens"><img src={githubImg} /></a>
                      <a href="https://ethanwatsonreactcv.herokuapp.com/">Ethan Watson React CV</a>
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
        dexView: state.pokedexView
      }

}

//Takes action for component and hooks it up
//Similar to above
//Dispatch refers to funciton being called
function matchDispatchToProps(dispatch){

return bindActionCreators({pokedexView: pokedexView}, dispatch);

    //connect-function
    // prop : action/function
    // dispatch (behind the scenes with redux to call func)

}


export default connect(mapStateToProps, matchDispatchToProps)(PokedexContainer);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
