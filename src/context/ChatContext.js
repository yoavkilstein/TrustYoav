import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext();


// This context can be accessed by any child component that is a 'consumer' of "ChatContext".
export const ChatContextProvider = ({children}) =>{
    const {currentUser} = useContext(AuthContext);
   const INITIAL_STATE = {
    chatId:"null",
    user:{}
   }; 


//Takes the current "state" and the "action" sent to update the current state.
   const chatReducer = (state, action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: 
                        currentUser.uid > action.payload.uid 
                            ? currentUser.uid + action.payload.uid 
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    }; 

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
        <ChatContext.Provider value={{ data:state, dispatch }}>
          {children}
        </ChatContext.Provider>
    );
};  
