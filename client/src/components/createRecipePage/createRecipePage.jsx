import {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './createRecipePage.module.css';
import tagStyles from '../dietFilterBar/dietFilterBar.module.css';

export default function CreateRecipePage(){
    
    const [errors,setErrors] = useState(true);
    const [nameErr,setNameErr] = useState(true);
    const [healthErr,setHealthErr] = useState(true);
    const [summErr,setSummErr] = useState(true);
    const [stepsErr,setStepsErr] = useState(true);

    useEffect(() => {
        if(nameErr || summErr || healthErr|| stepsErr){
            setErrors(true);
        }else{
            setErrors(false);
        }},
    [nameErr,summErr,healthErr,stepsErr]  
    );
    
    function handleSubmit(e){
        e.preventDefault();
        const textValues = e.target.children.textValues.children;
        const diets = e.target.children.formDietTypes.children;
        const dishes = e.target.children.formDishTypes.children;
        let recProto={
            name:'',
            healthScore:'',
            summary:'',
            steps:'',
            dietTypes:[],
            dishTypes:[],
        }
        if(errors){
            alert('The form contains errors')
        }else{
            recProto.name = textValues.recipeName.value;
            recProto.healthScore = parseInt(textValues.healthyness.value);
            recProto.summary = textValues.summary.value;
            recProto.steps = textValues.stepByStep.value;
            for (const element of diets) {
                if (element.type==="checkbox" && element.checked) {
                    recProto.dietTypes.push(element.name)
                    element.checked=false;
                }
            }
            if(recProto.dietTypes.length<1)recProto.dietTypes.push('No diet types available');
            for (const element of dishes) {
                if (element.type==="checkbox" && element.checked) {
                    recProto.dishTypes.push(element.name)
                    element.checked=false;
                }
            }
            if(recProto.dishTypes.length<1)recProto.dishTypes.push("No dish types available");
            textValues.recipeName.value='';
            textValues.healthyness.value='';
            textValues.summary.value='';
            textValues.stepByStep.value='';
            axios.post('http://localhost:3001/recipes',recProto)
            .then((r)=>{alert(r.data)})
            .catch(()=>{alert('an error occurred while creating the recipe')})
        }
    }


    function validateName(string){
        if(string.length>40 || string.length<8 || /\d/.test(string)){
            setNameErr(true);
        }else{
            setNameErr(false);
        }
    }

    function validateHealth(val){
        if(val.length<1 || val.length>3){
            setHealthErr(true);
            return;
        }
        if(isNaN(parseInt(val))){
            setHealthErr(true);
            return;
        }
        if(parseInt(val)<0 || parseInt(val)>100){
            setHealthErr(true);
            return;
        }
        setHealthErr(false);
    }
    
    function validateSumm(str){
        if(str.length<8 || str.length>300){
            setSummErr(true);
            return;
        } else{
            setSummErr(false);
        }
    }
    
    function validateSteps(str){
        if(str.length<8 ||str.length>300){
            setStepsErr(true);
            return;
        } else{
            setStepsErr(false);
        }
    }
    
    
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Create a Recipe:</h2>
            <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
                <h2 className={styles.dietsTitle}>Diet types:</h2>
                <div className={styles.dietsContainer} id="formDietTypes" name="formDietTypes">
                    <input  type="checkbox" id="glutenFree" name="gluten free"/>
                    <label className={tagStyles.tag} htmlFor="glutenFree">Gluten free</label>
                    <input type="checkbox" id="dairyFree" name="dairy free"/>
                    <label className={tagStyles.tag} htmlFor="dairyFree">Dairy free</label>
                    <input type="checkbox" id="lactoOvoVegetarian" name="lacto ovo vegetarian"/>
                    <label className={tagStyles.tag} htmlFor="lactoOvoVegetarian">Lacto ovo vegetarian</label>
                    <input type="checkbox" id="lactoVegetarian" name="lacto vegetarian"/>
                    <label className={tagStyles.tag} htmlFor="lactoVegetarian">Lacto vegetarian</label>
                    <input type="checkbox" id="vegan" name="vegan"/>
                    <label className={tagStyles.tag} htmlFor="vegan">Vegan</label>
                    <input type="checkbox" id="paleolithic" name="paleolithic"/>
                    <label className={tagStyles.tag} htmlFor="paleolithic">Paleolithic</label>
                    <input type="checkbox" id="primal" name="primal"/>
                    <label className={tagStyles.tag} htmlFor="primal">Primal</label>
                    <input type="checkbox" id="pescatarian" name="pescatarian"/>
                    <label className={tagStyles.tag} htmlFor="pescatarian">Pescatarian</label>
                    <input type="checkbox" id="fodmapFriendly" name="fodmap friendly"/>
                    <label className={tagStyles.tag} htmlFor="fodmapFriendly">FODMAP</label>
                    <input type="checkbox" id="whole30" name="whole 30"/>
                    <label className={tagStyles.tag} htmlFor="whole30">Whole 30</label>
                    <input type="checkbox" id="vegetarian" name="vegetarian"/>
                    <label className={tagStyles.tag} htmlFor="vegetarian">Vegetarian</label>
                    <input type="checkbox" id="ovoVegetarian" name="ovo vegetarian"/>
                    <label className={tagStyles.tag} htmlFor="ovoVegetarian">Ovo vegetarian</label>
                </div>
                <h2 className={styles.dietsTitle}>Dish types:</h2>
                <div className={styles.dietsContainer} id="formDishTypes" name="formDishTypes">
                    <input type="checkbox" id="lunch" name="lunch"/>
                    <label className={tagStyles.tag} htmlFor="lunch">Lunch</label>
                    <input type="checkbox" id="MainCourse" name="main course"/>
                    <label className={tagStyles.tag} htmlFor="MainCourse">MainCourse</label>
                    <input type="checkbox" id="mainDish" name="main dish"/>
                    <label className={tagStyles.tag} htmlFor="mainDish">Main dish</label>
                    <input type="checkbox" id="dinner" name="dinner"/>
                    <label className={tagStyles.tag} htmlFor="dinner">Dinner</label>
                    <input type="checkbox" id="sideDish" name="side dish"/>
                    <label className={tagStyles.tag} htmlFor="sideDish">Side dish</label>
                    <input type="checkbox" id="morningMeal" name="morning meal"/>
                    <label className={tagStyles.tag} htmlFor="morningMeal">Morning Meal</label>
                    <input type="checkbox" id="brunch" name="brunch"/>
                    <label className={tagStyles.tag} htmlFor="brunch">Brunch</label>
                    <input type="checkbox" id="breakfast" name="breakfast"/>
                    <label className={tagStyles.tag} htmlFor="breakfast">Breakfast</label>
                    <input type="checkbox" id="soup" name="soup"/>
                    <label className={tagStyles.tag} htmlFor="soup">Soup</label>
                    <input type="checkbox" id="salad" name="salad"/>
                    <label className={tagStyles.tag} htmlFor="salad">Salad</label>
                    <input type="checkbox" id="condiment" name="condiment"/>
                    <label className={tagStyles.tag} htmlFor="condiment">Condiment</label>
                    <input type="checkbox" id="dip" name="dip"/>
                    <label className={tagStyles.tag} htmlFor="dip">Dip</label>
                    <input type="checkbox" id="sauce" name="sauce"/>
                    <label className={tagStyles.tag} htmlFor="sauce">Sauce</label>
                    <input type="checkbox" id="spread" name="spread"/>
                    <label className={tagStyles.tag} htmlFor="spread">Spread</label>
                </div>
                <div className={styles.txtValContainer} id="textValues" name="textValues">
                    <h3 className={styles.sctnTitle}>👨‍🍳Recipe Name:</h3>
                    <input className={styles.name} type="text" id="recipeName" name="recipeName" autoComplete="off" onChange={(e)=>{validateName(e.target.value)}}/>
                    <br></br>
                    <h3 className={styles.sctnTitle}>💪Healthyness value:</h3>
                    <input className={styles.score} type="text" id="healthyness" name="healthyness" autoComplete="off" onChange={(e)=>{validateHealth(e.target.value)}}/>
                    <br></br>
                    <h3 className={styles.sctnTitle}>📃Recipe summary:</h3>
                    <textarea className={styles.txtBox} id="summary" name="summary" rows="20" cols="33" onChange={(e)=>{validateSumm(e.target.value)}}/>
                    <br></br>
                    <h3 className={styles.sctnTitle}>👓Instructions to cook this recipe:</h3>
                    <textarea className={styles.txtBox} id="stepByStep" name="stepByStep" rows="20" cols="33" onChange={(e)=>{validateSteps(e.target.value)}}/>
                    <input className={styles.submit} type="submit" value="✔Submit" disabled={errors}></input>
                    {nameErr && <p className={styles.errMsg}>❌Recipe name must be between 8 and 40 characters long. Must not contain numbers.</p>}
                    {healthErr && <p className={styles.errMsg}>❌Healthyness must be a numeric value between 0 and 100</p>}
                    {summErr && <p className={styles.errMsg}>❌Recipe summary must be between 8 and 300 characters long</p>}
                    {stepsErr && <p className={styles.errMsg}>❌Recipe instructions must be between 8 and 300 characters long</p>}
                </div>
            </form>
            <br></br>
        </div>
    )
}