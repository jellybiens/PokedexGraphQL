import React, {Component} from 'react';
import {connect} from 'react-redux';

  import EventEncounter from './event-encounter';
  import EventEvolve from './event-evolve';

class PokedexEvents extends Component {


    render() {

         return (
           <div className={this.props.encounterShow ?
                             "events-outer-container events-outer-container-enable" :
                           this.props.evolveShow ?
                             "events-outer-container events-outer-container-enable" :
                             "events-outer-container events-outer-container-disable"}>
                      <EventEncounter />
                      <EventEvolve />

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
        evolveShow: state.showEvolve
      }

}




export default connect(mapStateToProps)(PokedexEvents);
// making userlist component aware of mapstatetoprops
// and therefor making it aware of the datastore
