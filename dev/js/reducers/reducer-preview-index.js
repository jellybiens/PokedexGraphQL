//all reducers listen for actions announcement globally
export default function(state=0, action){ // allow access to other files
    switch(action.type){
        case "PREVIEW_INDEX":
            return action.payload; //payload of the action that is fired
            break;
    }
    return state;

}
