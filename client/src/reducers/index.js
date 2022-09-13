import {
    GET_RECIPES_BY_NAME,
    GET_ONE_RECIPE,
    FILTER_BY_DIET_TYPE,
    SET_FILTER_ACTIVE,
    SET_DIET_FILTER,
    SET_FILTER_INACTIVE,
    CLEAR_DETAIL
} from '../actions/index';

const initialState = {
    gotRecipes: [],
    activeFilter:false,
    filteredRecipes: [],
    detail: {},
    diets: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES_BY_NAME:
            if(typeof action.payload === 'string'){
                return {...state,gotRecipes:[]}
            } else return {
                ...state,
                gotRecipes:action.payload
            }    
        case GET_ONE_RECIPE:
            return {
                ...state,
                detail:action.payload
            }
        case SET_FILTER_ACTIVE:
            return {
                ...state,
                activeFilter:true
            }
        case SET_FILTER_INACTIVE:
            return {
                ...state,
                activeFilter:false
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                detail:[]
            };
        case SET_DIET_FILTER:
            return {
                ...state,
                diets:action.payload
            };
        case FILTER_BY_DIET_TYPE:
            let aux=[]
            for (let i = 0; i < state.gotRecipes.length; i++) {
                for (let j = 0; j < state.diets.length; j++) {
                    if(state.gotRecipes[i].dietTypes.includes(state.diets[j])){
                        aux.push(state.gotRecipes[i])
                        i++;
                        break;
                    }    
                }    
            }
            console.log('log from filter logic',aux)
            console.log('log from filter logic',state)
            return {
                ...state,
                filteredRecipes:aux
            };      
        default:
            return {
                ...state
            };
    };
};


export default reducer;