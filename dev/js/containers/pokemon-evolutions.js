import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {activeIndex} from '../actions/actions-index';
import {previewIndex} from '../actions/actions-index';
import Swiper from 'swiper';


class PokemonEvolutions extends Component {



  createEvolutionItems(evoArr) {
      return evoArr.map((evo, i) => {


        let slideIndex = parseInt(evo)-1;

        let evoClass = this.props.encounteredArr.includes(slideIndex) ? "evo-"+(i+1) : "evo-"+(i+1)+" blackout";
        let imgSource = "https://www.serebii.net/pokedex-xy/icon/" + evo + ".png";


        let clickFunc = () => { this.props.activeIndex(slideIndex);
                                this.props.previewIndex(slideIndex);
                                var swiper = document.querySelector('.swiper-container').swiper;
                                swiper.slideTo(slideIndex, 10);
                              }

         return (
                 <div key={"evo" + evo}
                      className={evoClass}
                      onClick={() => { this.props.encounteredArr.includes(slideIndex) ? clickFunc() : {} } } >
                     <img src={imgSource}  />
                 </div>
              );
      });
  }


    render() {

          let evoContainerClass = "info-evo-" + this.props.evolutionsArr.length;

        return(
                <div className={evoContainerClass}>
                    {this.createEvolutionItems(this.props.evolutionsArr)}
                </div>
            );

      }

}

function mapStateToProps(state){

    return {
        evolutionsArr: state.pokemonList[state.activeIndex].EvoLine,
        encounteredArr: state.pokemonEncountered,
        caughtArr: state.pokemonCaught
    }
  }

//Takes action for component and hooks it up
//Similar to above
//Dispatch refers to funciton being called
function matchDispatchToProps(dispatch){
    return bindActionCreators({activeIndex: activeIndex, previewIndex: previewIndex}, dispatch);


    //connect-function
    // prop : action/function
    // dispatch (behind the scenes with redux to call func)

  }

export default connect(mapStateToProps, matchDispatchToProps)(PokemonEvolutions);
