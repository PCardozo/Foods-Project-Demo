import axios from 'axios'

export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_ONE_RECIPE = 'GET_ONE_RECIPE';
export const FILTER_BY_DIET_TYPE = 'FILTER_BY_DIET_TYPE';
export const SET_FILTER_ACTIVE = 'SET_FILTER_ACTIVE';
export const SET_FILTER_INACTIVE = 'SET_FILTER_INACTIVE';
export const SET_DIET_FILTER = 'SET_DIET_FILTER';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export function getOneRecipe(recipeId){
    return function(dispatch){
        dispatch({type:CLEAR_DETAIL});
        axios.get(`http://localhost:3001/recipes/${recipeId}`)
        .then((r)=>{console.log(r.data); return r.data})
        .then((payload)=>{dispatch({type:GET_ONE_RECIPE, payload})})
        .catch((e)=>{console.log('the following error ocurred:',e)})
    }
}

export function getRecipesByName(str){
    return function (dispatch){
        axios.get(`http://localhost:3001/recipes?name=${str}`)
        .then((r)=>{console.log(r.data); return r.data})
        .then((payload)=>{dispatch({type:GET_RECIPES_BY_NAME, payload})})
        .catch((e)=>{console.log('the following error ocurred:',e)})
    }
}

export function setDietFilter(payload){
    return{
        type:SET_DIET_FILTER,
        payload
    }
}