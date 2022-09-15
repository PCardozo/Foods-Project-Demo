import RecipeCard from "../recipeCard/recipeCard";
import IndexButtons from "../indexButtons/indexButtons";
import { useSelector } from "react-redux";
import styles from './recipeContainer.module.css';


export default function RecipeContainer(){
    const shownRecipes = useSelector((state)=>state.shownRecipes);
    const pageIndex= useSelector((state)=>state.pageIndex);

    return(
        <div className={styles.container}>
            {shownRecipes.length<1 && <p className={styles.noResults}>No results found.</p>}
            {shownRecipes.length>0 && shownRecipes[pageIndex].map((element)=>{
                return <RecipeCard
                id='recipeCard'
                key={element.id}
                numId={element.id}
                name={element.name}
                picture={element.picture}
                dietTypes={element.dietTypes}
                dishTypes={element.dishTypes}
                />
            })}
            {shownRecipes.length>1 && <IndexButtons/>}
        </div>
    )
}