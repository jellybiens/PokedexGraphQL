import React, {Component} from 'react';
import {connect} from 'react-redux';
import PokemonEvolutions from '../containers/pokemon-evolutions';
import {selectEvolutions} from '../actions/actions-index';
import { dragscroll } from 'dragscroll'


class PokemonDetail extends Component {

  componentDidMount(){

  }





    render() {

        if(!this.props.pokemon)
        {
            return(<div className="pokemon-info"></div>);
        }

        let imgSource = "https://www.smogon.com/dex/media/sprites/xy/" + this.props.pokemon.Name.toLowerCase().replace(" ", "_") + ".gif";

        return(
                <div className="pokemon-info">
                  <div className="info-name"><span>{this.props.pokemon.Name}</span></div>
                  {this.props.pokemon.Types[1] ? (<div className="info-types"><div className={this.props.pokemon.Types[0].toLowerCase()+"-2"}></div><div className={this.props.pokemon.Types[1].toLowerCase()+"-3"}></div></div>) : (<div className="info-types"><div className={this.props.pokemon.Types[0].toLowerCase()+"-1"}></div></div>)}
                  <div className="info-height"><span>{this.props.pokemon.Height}<br />{this.props.pokemon.Weight}</span></div>
                  <div className="info-img-bg"></div><div className="info-img"><img src={imgSource}  /></div>
                  <div className="info-evolutions"><PokemonEvolutions /></div>
                  <div className="info-about vertical dragscroll">
                      <span className="info-dragger" >
                        {this.props.pokemon.About}
                      </span>
                  </div>
                </div>
            );

}

}

function mapStateToProps(state){

    let pokemon = state.pokemonList[state.activeIndex];
    let encountered = state.pokemonEncountered.includes(state.activeIndex);
    let caught = state.pokemonCaught.includes(state.activeIndex);
    let nullInfo = "???";

    let pokemonInfo = {
       "id": encountered ? pokemon.id : nullInfo,
       "Name": encountered ? pokemon.Name : nullInfo,
       "About": caught ? pokemon.About : "",
       "Types": caught ? pokemon.Types : [nullInfo],
       "Weight": caught ? pokemon.Weight : nullInfo,
       "Height": caught ? pokemon.Height : nullInfo,
       "EvoLine": caught ? pokemon.EvoLine : [nullInfo]
    }

    return {
        pokemon: pokemonInfo
    }
}

export default connect(mapStateToProps)(PokemonDetail);
