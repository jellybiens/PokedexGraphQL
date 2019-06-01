import React, {Component} from 'react';
import {connect} from 'react-redux';


class EventEvolve extends Component {


    render() {
        let evolveId1 = this.props.evolveId1;
        let evolveId2 = this.props.evolveId2;

        let evolvePokemon1 = this.props.pokemonArr[evolveId1];
        let evolvePokemon2 = this.props.pokemonArr[evolveId2];

        let imgSource1 = "https://www.smogon.com/dex/media/sprites/xy/" + evolvePokemon1.Name.toLowerCase().replace(" ", "_") + ".gif";
        let imgSource2 = "https://www.smogon.com/dex/media/sprites/xy/" + evolvePokemon2.Name.toLowerCase().replace(" ", "_") + ".gif";


        let sunRays = [];
        for(let i = 0;i < 20;i++){
          sunRays.push(<div key={i} className="sunray"></div>);
        }

         return (
                  <div className={this.props.evolveShow ?
                                    "event-container evolve-container-active" :
                                    "event-container evolve-container-inactive"}>
                        <div  className="event-border-box ">
                          <div  className="evolve-background">
                            <div className="starbust-container">
                              <div className="starbust-wheel">
                                {sunRays}
                              </div>
                            </div>
                          </div>

                          <div  className="evolve-foreground-container">
                            <div className="evolve-sprites">
                              <div  className={this.props.evolveShow ?
                                                  "evolve-sprite1" :
                                                  "evolve-sprite1-disable"}>
                                  <img key={evolvePokemon1.id + "e1"} src={imgSource1} />
                              </div>
                              <div  className={this.props.evolveShow ?
                                                  "evolve-sprite2" :
                                                  "evolve-sprite2-disable"}>
                                  <img key={evolvePokemon2.id + "e2"} src={imgSource2} />
                              </div>

                              <div  className="evolve-base"></div>

                            </div>

                          </div>
                        </div>
                        <div  className={this.props.evolveShow ?
                                        "event-text-box" : "event-text-box-disable"}>
                          <span className="evolve-text" dangerouslySetInnerHTML={{__html: this.props.eventMsg}}></span>
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

        evolveId1: state.evolveIndex1,
        evolveId2: state.evolveIndex2,

        pokemonArr: state.pokemonList
      }

}

export default connect(mapStateToProps)(EventEvolve);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
