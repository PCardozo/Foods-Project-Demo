import {
    GET_ALL_RECIPES,
    GET_RECIPES_BY_NAME,
    GET_ONE_RECIPE,
    CREATE_RECIPE,
    FILTER_BY_DIET_TYPE,
    ORDER_ALPHABETICALLY_ASC,
    ORDER_ALPHABETICALLY_DESC,
    ORDER_BY_HEALTHYNESS_ASC,
    ORDER_BY_HEALTHYNESS_DESC,
    CLEAR_DETAIL
} from '../actions/index';

const initialState = {
    allRecipes: [],
    shownRecipes: [],
    detail: [],
    diets: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state
            };
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
            }
        case GET_ONE_RECIPE:
            return {
                ...state,
            }
        case CREATE_RECIPE:
            return {
                ...state,
            }
        case FILTER_BY_DIET_TYPE:
            return {
                ...state,
            }
        case ORDER_ALPHABETICALLY_ASC:
            return {
                ...state,
            }
        case ORDER_ALPHABETICALLY_DESC:
            return {
                ...state,
            }
        case ORDER_BY_HEALTHYNESS_ASC:
            return {
                ...state,
            };
        case ORDER_BY_HEALTHYNESS_DESC:
            return {
                ...state,
            };
        case CLEAR_DETAIL:
            return {
                ...state,
            };      
        default:
            return {
                ...state
            };
    };
};


export default reducer;