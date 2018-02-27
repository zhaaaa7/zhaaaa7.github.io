import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
    
};

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{   //deep clone the {}, immitability
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1 //payload data
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                building:true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{   //deep clone the {}, immitability
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1, //payload data
                    
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
                building:true
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                totalPrice:4,
                ingredients:action.ingredients, //the order of display id determined by the order the data is stored in database
                error:false,
                building:false
            };

        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error:true                                  
            };
        default:
             return state;
    }
};

export default reducer;