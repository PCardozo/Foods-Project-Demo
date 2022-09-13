import DietFilterBar from "../dietFilterBar/dietFilteBar";
import HeaderBar from "../headerBar/headerBar";
import RecipeContainer from "../recipeContainer/recipeContainer";

export default function Homepage(){
    return(
        <div>
            <HeaderBar/>
            <DietFilterBar/>
            <RecipeContainer/>
        </div>
    )
}