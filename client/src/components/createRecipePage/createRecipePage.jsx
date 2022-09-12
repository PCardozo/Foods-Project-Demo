import {useState,useEffect} from 'react';

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
                }
            }
            if(recProto.dietTypes.length<1)recProto.dietTypes.push('No diet types available');
            for (const element of dishes) {
                if (element.type==="checkbox" && element.checked) {
                    recProto.dishTypes.push(element.name)
                }
            }
            if(recProto.dishTypes.length<1)recProto.dishTypes.push("No dish types available");
            console.log(recProto)
        }
    }


    function validateName(string){
        if(string.length>40 || string.length<8){
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
        <div>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <label for="formDietTypes">Diet types:</label>
                <div id="formDietTypes" name="formDietTypes">
                    <input type="checkbox" id="glutenFree" name="gluten free"/>
                        <label for="glutenFree">Gluten free</label>
                    <input type="checkbox" id="dairyFree" name="dairy free"/>
                        <label for="dairyFree">Dairy free</label>
                    <input type="checkbox" id="lactoOvoVegetarian" name="lacto ovo vegetarian"/>
                        <label for="lactoOvoVegetarian">Lacto ovo vegetarian</label>
                    <input type="checkbox" id="lactoVegetarian" name="lacto vegetarian"/>
                        <label for="lactoVegetarian">Lacto vegetarian</label>
                    <input type="checkbox" id="vegan" name="vegan"/>
                        <label for="vegan">Vegan</label>
                    <input type="checkbox" id="paleolithic" name="paleolithic"/>
                        <label for="paleolithic">Paleolithic</label>
                    <input type="checkbox" id="primal" name="primal"/>
                        <label for="primal">Primal</label>
                    <input type="checkbox" id="pescatarian" name="pescatarian"/>
                        <label for="pescatarian">Pescatarian</label>
                    <input type="checkbox" id="fodmapFriendly" name="fodmap friendly"/>
                        <label for="fodmapFriendly">FODMAP friendly</label>
                    <input type="checkbox" id="whole30" name="whole 30"/>
                        <label for="whole30">Whole 30</label>
                    <input type="checkbox" id="vegetarian" name="vegetarian"/>
                        <label for="vegetarian">Vegetarian</label>
                    <input type="checkbox" id="ovoVegetarian" name="ovo vegetarian"/>
                        <label for="ovoVegetarian">Ovo vegetarian</label>
                </div>
                    <label for="formDishTypes">Dish types:</label>
                <div id="formDishTypes" name="formDishTypes">
                    <input type="checkbox" id="lunch" name="lunch"/>
                        <label for="lunch">Lunch</label>
                    <input type="checkbox" id="MainCourse" name="main course"/>
                        <label for="MainCourse">MainCourse</label>
                    <input type="checkbox" id="mainDish" name="main dish"/>
                        <label for="mainDish">Main dish</label>
                    <input type="checkbox" id="dinner" name="dinner"/>
                        <label for="dinner">Dinner</label>
                    <input type="checkbox" id="sideDish" name="side dish"/>
                        <label for="sideDish">Side dish</label>
                    <input type="checkbox" id="morningMeal" name="morning meal"/>
                        <label for="morningMeal">Morning Meal</label>
                    <input type="checkbox" id="brunch" name="brunch"/>
                        <label for="brunch">Brunch</label>
                    <input type="checkbox" id="breakfast" name="breakfast"/>
                        <label for="breakfast">Breakfast</label>
                    <input type="checkbox" id="soup" name="soup"/>
                        <label for="soup">Soup</label>
                    <input type="checkbox" id="salad" name="salad"/>
                        <label for="salad">Salad</label>
                    <input type="checkbox" id="condiment" name="condiment"/>
                        <label for="condiment">Condiment</label>
                    <input type="checkbox" id="dip" name="dip"/>
                        <label for="dip">Dip</label>
                    <input type="checkbox" id="sauce" name="sauce"/>
                        <label for="sauce">Sauce</label>
                    <input type="checkbox" id="spread" name="spread"/>
                        <label for="spread">Spread</label>
                </div>
                <div id="textValues" name="textValues">
                    <label for="recipeName">👨‍🍳Recipe Name:</label>
                        <input type="text" id="recipeName" name="recipeName" onChange={(e)=>{validateName(e.target.value)}}/>
                        {nameErr && <p className='errMsg'>❌Recipe name must be between 8 and 40 characters long</p>}
                    <label for="healthyness">💪Healthyness value:</label>
                        <input type="text" id="healthyness" name="healthyness" onChange={(e)=>{validateHealth(e.target.value)}}/>
                        {healthErr && <p className='errMsg'>❌Healthyness must be a numeric value between 0 and 100</p>}
                    <label for="summary">📃Recipe summary:</label>
                        <textarea id="summary" name="summary" rows="20" cols="33" onChange={(e)=>{validateSumm(e.target.value)}}/>
                        {summErr && <p className='errMsg'>❌Recipe summary must be between 8 and 300 characters long</p>}
                    <label for="stepByStep">👓Instructions to cook this recipe:</label>
                        <textarea id="stepByStep" name="stepByStep" rows="20" cols="33" onChange={(e)=>{validateSteps(e.target.value)}}/>
                        {stepsErr && <p className='errMsg'>❌Recipe instructions must be between 8 and 300 characters long</p>}
                    <input type="submit" value="✔Submit" disabled={errors}></input>
                </div>
            </form>
        </div>
    )
}