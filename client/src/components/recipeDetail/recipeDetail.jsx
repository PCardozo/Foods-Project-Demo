import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getOneRecipe } from "../../actions";
import {useParams} from 'react-router-dom';

export default function RecipeDetail(){
    const detail = useSelector(state=>state.detail);
    const dispatch = useDispatch();
    let {id} = useParams();
    
    useEffect(()=>{
        dispatch(getOneRecipe(id))
    },[])

    return(
        <div>
            {Object.keys(detail).length>0 && 
            <div>
                <h3>{detail.name}</h3>
                <img src={detail.picture} alt='Food'/>
                <h3>Healthyness: {detail.healthScore}</h3>
                {detail.dietTypes.map((element, index)=>{
                    return<p
                    id='dietType'
                    key={index}>{element}</p>
                })}
                {detail.dishTypes.map((element, index)=>{
                    return<p
                    id='dishType'
                    key={index}>{element}</p>
                })}
                <div>
                    <h3>Summary</h3>
                    <p>{detail.summary}</p>
                </div>
                <div>
                    <h3>Step by step</h3>
                    <p>{detail.steps}</p>
                </div>
            </div>
            }
        </div>
    )
}