import DietFilterBar from "../dietFilterBar/dietFilteBar";
import HeaderBar from "../headerBar/headerBar";
import RecipeContainer from "../recipeContainer/recipeContainer";
import OrderBar from "../orderBar/orderBar";

export default function Homepage(){
    return(
        <div>
            <HeaderBar/>
            <DietFilterBar/>
            <OrderBar/>
            <RecipeContainer/>
        </div>
    )
}