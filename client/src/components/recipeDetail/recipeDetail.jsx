import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getOneRecipe } from "../../actions";
import {useParams} from 'react-router-dom';
import styles from './recipeDetail.module.css';

export default function RecipeDetail(){
    const detail = useSelector(state=>state.detail);
    const dispatch = useDispatch();
    let {id} = useParams();
    
    useEffect(()=>{
        dispatch(getOneRecipe(id))
    },[])

    return(
        <div >
            {Object.keys(detail).length>0 && 
            <div className={styles.container}>
                <h3 className={styles.title} >{detail.name}</h3>
                <img className={styles.img} src={detail.picture} alt='Food'/>
                <h3 className={styles.hScore}>Healthyness Score: {detail.healthScore}</h3>
                <div className={styles.dietSctn}>
                    <h3 className={styles.dietTypeTitle}>Diet Types</h3>
                    <div className={styles.dietsContainer}>
                        {detail.dietTypes.map((element, index)=>{
                            return<p
                            className={styles.dietTag}
                            id='dietType'
                            key={index}>{element}</p>
                        })}
                    </div>
                </div>
                <br></br>
                <div className={styles.dietSctn}>
                    <h3 className={styles.dietTypeTitle}>Dish Types</h3>
                    <div className={styles.dietsContainer}>
                        {detail.dishTypes.map((element, index)=>{
                            return<p
                            className={styles.dietTag}
                            id='dishType'
                            key={index}>{element}</p>
                        })}
                    </div>
                </div>
                <br></br>
                <div className={styles.dietSctn}>
                    <h3>Summary</h3>
                    <p>{detail.summary}</p>
                </div>
                <br></br>
                <div className={styles.dietSctn}>
                    <h3>Step by step</h3>
                    <p>{detail.steps}</p>
                </div>
            </div>
            }
        </div>
    )
}