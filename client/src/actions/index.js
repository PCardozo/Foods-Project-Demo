import axios from 'axios'

export const INDEX_PLUS = 'INDEX_PLUS';
export const INDEX_MINUS = 'INDEX_MINUS';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_ONE_RECIPE = 'GET_ONE_RECIPE';
export const SET_FILTER_ACTIVE = 'SET_FILTER_ACTIVE';
export const SET_FILTER_INACTIVE = 'SET_FILTER_INACTIVE';
export const SET_DIET_FILTER = 'SET_DIET_FILTER';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const ORDER_ALPH_ASC = 'ORDER_ALPH_ASC';
export const ORDER_ALPH_DESC = 'ORDER_ALPH_DESC';
export const ORDER_HEALTH_ASC = 'ORDER_HEALTH_ASC';
export const ORDER_HEALTH_DESC = 'ORDER_HEALTH_DESC';
export const SET_LOADING = 'SET_LOADING';
export const CLEAR_RECIPES = 'CLEAR_RECIPES';

export function getOneRecipe(recipeId){
    return function(dispatch){
        dispatch({type:CLEAR_DETAIL});
        dispatch({type:SET_LOADING});
        axios.get(`http://localhost:3001/recipes/${recipeId}`)
        .then((r)=>{console.log(r.data); return r.data})
        .then((payload)=>{dispatch({type:GET_ONE_RECIPE, payload});dispatch({type:SET_LOADING});})
        .catch((e)=>{console.log('the following error ocurred:',e);dispatch({type:SET_LOADING});})
    }
}

export function getRecipesByName(str){
    return function (dispatch){
        dispatch({type:SET_LOADING});
        axios.get(`http://localhost:3001/recipes?name=${str}`)
        .then((r)=>{console.log('Server response was:',r.data); return r.data})
        .then((payload)=>{dispatch({type:GET_RECIPES_BY_NAME, payload});dispatch({type:SET_LOADING});})
        .catch((e)=>{console.log('the following error ocurred:',e);dispatch({type:SET_LOADING});})
        
    }
}

export function setDietFilter(payload){
    return{
        type:SET_DIET_FILTER,
        payload
    }
}