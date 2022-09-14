import {
    GET_RECIPES_BY_NAME,
    GET_ONE_RECIPE,
    SET_FILTER_ACTIVE,
    SET_DIET_FILTER,
    SET_FILTER_INACTIVE,
    CLEAR_DETAIL,
    ORDER_ALPH_ASC,
    ORDER_ALPH_DESC,
    ORDER_HEALTH_ASC,
    ORDER_HEALTH_DESC,
    INDEX_MINUS,
    INDEX_PLUS,
} from '../actions/index';

function sortByPropAsc(array,propName){
    let result = array;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length-i-1; j++) {
            if(result[j][propName]>result[j+1][propName]){
                let aux = result[j+1];
                result[j+1]=result[j];
                result[j]=aux;
            }
        }    
    }
    return result;
}

function pageArray(array){
    if(array.length<1) return array;
    let elemsPerPage = 9;
    let result = [];
    for (let i = 0; i < array.length; i+=elemsPerPage) {
        result.push(array.slice(i,i+elemsPerPage))
    }
    return result;
}

function filterRecipes(recipeArray,dietArray){
    let aux=[]
    for (let i = 0; i < recipeArray.length; i++) {
        for (let j = 0; j < dietArray.length; j++) {
            if(recipeArray[i].dietTypes.includes(dietArray[j])){
                aux.push(recipeArray[i])
                i++;
                break;
            }    
        }    
}
return aux;
}


const initialState = {
    gotRecipes: [],
    activeFilter:false,
    filteredRecipes: [],
    detail: {},
    diets: [],
    shownRecipes:[],
    pageIndex:0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES_BY_NAME:
            if(typeof action.payload === 'string'){
                return {...state,gotRecipes:[],shownRecipes:[]}
            } else {
                return {
                    ...state,
                    gotRecipes:action.payload,
                    shownRecipes:pageArray(action.payload)
                }
            }  
        case GET_ONE_RECIPE:
            return {
                ...state,
                detail:action.payload
            }
        case SET_FILTER_ACTIVE:
            return {
                ...state,
                activeFilter:true,
                shownRecipes:pageArray(filterRecipes(state.gotRecipes,state.diets))
            }
        case SET_FILTER_INACTIVE:
            return {
                ...state,
                diets:[],
                activeFilter:false,
                shownRecipes:pageArray(state.gotRecipes)
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
        case ORDER_ALPH_ASC:
            if(!state.activeFilter){
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc([...state.gotRecipes],'name'))
                }
            }else{
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc(filterRecipes(state.gotRecipes,state.diets),'name'))
                }
            }
        case ORDER_ALPH_DESC:
            if(!state.activeFilter){
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc([...state.gotRecipes],'name').reverse())
                }
            }else{
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc(filterRecipes(state.gotRecipes,state.diets),'name').reverse())
                }
            }
        case ORDER_HEALTH_ASC:
            if(!state.activeFilter){
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc([...state.gotRecipes],'healthScore'))
                }
            }else{
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc(filterRecipes(state.gotRecipes,state.diets),'healthScore'))
                }
            }
        case ORDER_HEALTH_DESC:
            if(!state.activeFilter){
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc([...state.gotRecipes],'healthScore').reverse())
                }
            }else{
                return{
                    ...state,
                    shownRecipes:pageArray(sortByPropAsc(filterRecipes(state.gotRecipes,state.diets),'healthScore').reverse())
                }
            }
        case INDEX_MINUS:
            if(state.pageIndex>0){
                return {
                ...state,
                pageIndex:state.pageIndex-1
                }
            }else{
                return {
                    ...state,
                    }
            }
        case INDEX_PLUS:
            if(state.pageIndex<state.shownRecipes.length){
                return {
                ...state,
                pageIndex:state.pageIndex+1
                }
            }else{
                return {
                    ...state,
                    }
            }  
        default:
            return {
                ...state
            };
    };
};


export default reducer;