import {
    GET_RECIPES_BY_NAME,
    GET_ONE_RECIPE,
    FILTER_BY_DIET_TYPE,
    SET_FILTER_ACTIVE,
    SET_DIET_FILTER,
    SET_FILTER_INACTIVE,
    CLEAR_DETAIL,
    ORDER_ALPH_ASC,
    ORDER_ALPH_DESC,
    ORDER_HEALTH_ASC,
    ORDER_HEALTH_DESC
} from '../actions/index';

function sortAlphaAsc(param){
    let arr = param;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            if(arr[j].name>arr[j+1].name){
                let aux = arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=aux;
            }
        }    
    }
    return arr;
}

function sortHealthAsc(param){
    let arr = param;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            if(arr[j].healthScore>arr[j+1].healthScore){
                let aux = arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=aux;
            }
        }    
    }
    return arr;
}

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
            return {
                ...state,
                filteredRecipes:aux
            };
        case ORDER_ALPH_ASC:
            if(!state.activeFilter){
                let aux= [...state.gotRecipes];
                let aux2 = sortAlphaAsc(aux);
                return{
                    ...state,
                    gotRecipes:aux2
                }
            }else{
                let aux= [...state.filteredRecipes];
                let aux2 = sortAlphaAsc(aux);
                return{
                    ...state,
                    filteredRecipes:aux2
                }
            }
        case ORDER_ALPH_DESC:
            if(!state.activeFilter){
                let aux= [...state.gotRecipes];
                let aux2 = sortAlphaAsc(aux);
                aux2=aux2.reverse();
                return{
                    ...state,
                    gotRecipes:aux2
                }
            }else{
                let aux= [...state.filteredRecipes];
                let aux2 = sortAlphaAsc(aux);
                aux2=aux2.reverse();
                return{
                    ...state,
                    filteredRecipes:aux2
                }
            }
        case ORDER_HEALTH_ASC:
            if(!state.activeFilter){
                let aux= [...state.gotRecipes];
                let aux2 = sortHealthAsc(aux);
                return{
                    ...state,
                    gotRecipes:aux2
                }
            }else{
                let aux= [...state.filteredRecipes];
                let aux2 = sortHealthAsc(aux);
                return{
                    ...state,
                    filteredRecipes:aux2
                }
            }
        case ORDER_HEALTH_DESC:
            if(!state.activeFilter){
                let aux= [...state.gotRecipes];
                let aux2 = sortHealthAsc(aux);
                aux2=aux2.reverse();
                return{
                    ...state,
                    gotRecipes:aux2
                }
            }else{
                let aux= [...state.filteredRecipes];
                let aux2 = sortHealthAsc(aux);
                aux2=aux2.reverse();
                return{
                    ...state,
                    filteredRecipes:aux2
                }
            }     
        default:
            return {
                ...state
            };
    };
};


export default reducer;