import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Swiper from '../swiper';

import {activeIndex, previewIndex, pokedexView} from '../actions/actions-index';


class PokemonList extends Component{

  handleListSelect(pokemon, i){
    if(this.props.indexActive == i)
    {
      this.props.encounteredArr.includes(i) ? this.props.pokedexView(2) : {};
    }
      this.props.activeIndex(i);
  }

  createListItems() {

      return this.props.pokemonList.map((pokemon, i) => {

        let imgClass = this.props.caughtArr.includes(i) ? "" : "greyscale";
        this.props.encounteredArr.includes(i) ? {} : imgClass = "blackout dot";


         return (//if this has class active index open in view
                    <div
                        key={pokemon.id}
                        id={pokemon.id + pokemon.Name}
                        className="swiper-slide"
                        onClick={() => this.handleListSelect(pokemon, i) }
                    >
                      <div className="slide-contents">
                        <div className="pokeNo"><span>{pokemon.id}</span></div>
                        <div className="pokeName"><span>{pokemon.Name}</span></div>
                        <div className="catch-status-container">
                          <img className={imgClass} src="https://cdn.bulbagarden.net/upload/a/af/Pok%C3%A9_Ball_battle_IV.png" />
                        </div>
                      </div>
                    </div>
              );
      });
  }

    resize(){
      var slidesPerVue = window.innerWidth > 510 ? 7 : 4;
      var centered = window.innerWidth > 510 ? true : false;
      //var effect = window.innerWidth > 510 ? "coverflow" : "none";
      var swiper = document.querySelector('.swiper-container').swiper;
      swiper.params.slidesPerView = slidesPerVue;
      swiper.params.centeredSlides = centered;
      //swiper.params.effect = effect;
      swiper.update();
    }

    componentDidMount(){
      var slidesPerVue = window.innerWidth > 510 ? 7 : 4;
      var centered = window.innerWidth > 510 ? true : false;
      var effect = window.innerWidth > 510 ? "coverflow" : "none";
      var swiper = new Swiper('.swiper-container', {
            spaceBetween: 12,
            slidesPerView: slidesPerVue,
            mousewheel: true,
            direction: 'vertical',
            slideToClickedSlide: true,
            centeredSlides: centered,
            keyboard: {
              enabled: true,
              onlyInViewport: false,
            },
            //effect: effect,
            //coverflowEffect: {
                               //swiper.js coverflow line 7680 change
                               // var slideTransform = "translateX(" + (-Math.abs(offsetMultiplier * 10)+50) + "px)";
                               // $slideEl.transform(slideTransform);
             //                },
        });
          var swiper = document.querySelector('.swiper-container').swiper;
          swiper.on('slideChange', () => {
            this.props.previewIndex(swiper.realIndex);
            this.props.activeIndex(swiper.realIndex);


            let deg = ((360/251)*(parseInt(swiper.realIndex)));
            var pokeball = document.querySelector('.pokeball');
            pokeball.style["transform"] = "rotate(" + deg*10 + "deg)";

          });

          window.addEventListener("resize", this.resize.bind(this));
          this.resize();

    }


    render() {

        return (
                  <div className="pokemon-list">
                    <div className="swiper-container">
                      <div className="swiper-wrapper" >
                        {this.createListItems()}
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
        pokemonList: state.pokemonList,
        indexPreview: state.previewIndex,
        indexActive: state.activeIndex,
        encounteredArr: state.pokemonEncountered,
        caughtArr: state.pokemonCaught
      }

}

//Takes action for component and hooks it up
//Similar to above
//Dispatch refers to funciton being called
function matchDispatchToProps(dispatch){

return bindActionCreators({ activeIndex: activeIndex,
                            previewIndex: previewIndex,
                            pokedexView: pokedexView}, dispatch);

    //connect-function
    // prop : action/function
    // dispatch (behind the scenes with redux to call func)

}


export default connect(mapStateToProps, matchDispatchToProps)(PokemonList);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
