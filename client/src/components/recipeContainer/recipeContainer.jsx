import RecipeCard from "../recipeCard/recipeCard";
import { useSelector } from "react-redux";
import styles from './recipeContainer.module.css';

export default function RecipeContainer(){
    const filteredRecipes = useSelector((state)=>state.filteredRecipes);
    const gotRecipes = useSelector((state)=>state.gotRecipes);
    const activeFilter = useSelector((state)=>state.activeFilter);

    return(
        <div className={styles.container}>
            {!activeFilter && gotRecipes.length<1 && <p id='noResults'>No results found.</p>}
            {!activeFilter && gotRecipes.length>0 && gotRecipes.map((element)=>{
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
            {activeFilter && filteredRecipes.length<1 && <p id='noResults'>No results found.</p>}
            {activeFilter && filteredRecipes.length>0 && filteredRecipes.map((element)=>{
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
        </div>
    )
}