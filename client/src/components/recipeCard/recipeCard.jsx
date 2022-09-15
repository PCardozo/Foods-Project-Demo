import { Link } from "react-router-dom";
import styles from './recipeCard.module.css';

export default function RecipeCard({numId,name,picture,dietTypes,dishTypes}){
    return(
        
        <Link to={`/recipe/${numId}`} className={styles.link}>
        <div className={styles.wholeDiv}>
            
                <h4 className={styles.name}>{name}</h4>
                <img src={picture} alt='Food' className={styles.image}/>
            
            <div className={styles.dietTypeBox}>
                {dietTypes.length>0 && dietTypes.map((element, index)=>{
                    return<p
                    id='dietType'
                    key={index}
                    className={styles.dietTag}>
                        {element}
                    </p>
                })}
            </div>
            <div className={styles.dishTypeBox}>
                {dishTypes.map((element, index)=>{
                    return<p
                    id='dishType'
                    key={index}
                    className={styles.dishTag}>
                        {element}
                    </p>
                })}
            </div>
        </div>
        </Link>
    
    )
}