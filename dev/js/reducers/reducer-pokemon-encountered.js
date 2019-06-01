//all reducers listen for actions announcement globally
export default function(state=[0,3,5,6,121], action){ // allow access to other files
    switch(action.type){
        case "POKEMON_ENCOUNTERED":
            return action.payload; //payload of the action that is fired
            break;
    }
    return state;

}
