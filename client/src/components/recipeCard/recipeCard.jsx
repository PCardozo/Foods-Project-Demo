import { Link } from "react-router-dom";
import styles from './recipeCard.module.css';

export default function RecipeCard({numId,name,picture,dietTypes,dishTypes}){
    return(
        <div className={styles.wholeDiv}>
            <Link to={`/recipe/${numId}`}>
                <h3>{name}</h3>
                <img src={picture} alt='Food' className={styles.image}/>
            </Link>
            <div className={styles.dietTypeBox}>
                {dietTypes.length>0 && dietTypes.map((element, index)=>{
                    return<p
                    id='dietType'
                    key={index}>{element}</p>
                })}
            </div>
            <div className={styles.dietTypeBox}>
                {dishTypes.map((element, index)=>{
                    return<p
                    id='dishType'
                    key={index}>{element}</p>
                })}
            </div>
        </div>
    )
}