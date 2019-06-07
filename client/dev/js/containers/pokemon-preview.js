import React, {Component} from 'react';
import {connect} from 'react-redux';

class PokemonPreview extends Component {


  componentDidUpdate(){
    document.querySelector(".preview-img").addEventListener('load', function() {

    });
  }

    render() {
        let pokemon = this.props.pokemon;
        let imgSource = "https://www.smogon.com/dex/media/sprites/xy/" + pokemon.Name.toLowerCase().replace(" ", "_") + ".gif";

        let imgClass = this.props.pokemonEncountered ? "preview-img" : "preview-img blackout";

         return ( 
                    <img className={imgClass}
                        key={pokemon.id + "x"}
                        src={imgSource}  />

              );

    }

}

function mapStateToProps(state){
    return {
        pokemon: state.pokemonList[state.previewIndex],
        pokemonEncountered: state.pokemonEncountered.includes(state.previewIndex)
    }
}

export default connect(mapStateToProps)(PokemonPreview);
