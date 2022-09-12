import HeaderBar from "../headerBar/headerBar";
import RecipeContainer from "../recipeContainer/recipeContainer";

export default function Homepage(){
    return(
        <div>
            This is a homepage
            <HeaderBar/>
            <RecipeContainer/>
        </div>
    )
}