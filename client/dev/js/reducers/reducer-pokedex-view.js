//all reducers listen for actions announcement globally
export default function(state=1, action){ // allow access to other files
    switch(action.type){
        case "POKEDEX_VIEW":
            return action.payload; //payload of the action that is fired
            break;
    }
    return state;

}
