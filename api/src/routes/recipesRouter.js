const { Router } = require("express");
const express = require("express");
const {getOneRecipe,getManyRecipes,writeNewRecipe} = require('../controllers/Recipes');
const {getDietRelation,writeRecipesDietTypes} = require('../controllers/Recipes_Diet_types');
const {getDietsForRecipe} = require('../controllers/Diets');
const {getDishTypeRelation,writeRecipesDishTypes} = require('../controllers/Recipes_dish_types');
const {getDishTypesForRecipe} = require('../controllers/Dish_type');
const router = Router();
router.use(express.json());


router.get('/:id',async (req,res)=>{
    const data = await getOneRecipe(req.params.id);
    //console.log('recipe router Log:',data);
    if(typeof data === 'string'){
        res.send(data);
    } else {
        const value = data.dataValues;    
        value.dietTypes= await getDietsForRecipe(await getDietRelation(value.id));
        value.dishTypes= await getDishTypesForRecipe(await getDishTypeRelation(value.id));
        res.send(value);
    }
    
    //console.log(value);
    
});

router.get('/',async (req,res)=>{
    const {name} = req.query;
    if(!name){res.send('Bad request: null name info');}
    else{
        let data = await getManyRecipes(name);
        if(typeof data === 'string'){
            res.send(data);
        } else {
            for (let i = 0; i < data.length; i++) {
                data[i].dietTypes=await getDietsForRecipe(await getDietRelation(data[i].id));
                data[i].dishTypes=await getDishTypesForRecipe(await getDishTypeRelation(data[i].id));        
            }
            res.send(data);
        }    
    };
    //get recipes with name parameter
    
})

router.post('/',async (req,res)=>{
    console.log('Creating new recipe..');
    const registrar = {
        name:req.body.name,
        healthScore:req.body.healthScore,
        summary:req.body.summary,
        steps: req.body.steps,
        dietTypes:req.body.dietTypes,
        dishTypes:req.body.dishTypes,
    }
    console.log(registrar)
    if(!registrar)res.send('There was an error processing the request');
    writeNewRecipe(registrar)
    .then(()=>{return writeRecipesDietTypes([{name:registrar.name,diets:registrar.dietTypes}])})
    .then(()=>{return writeRecipesDishTypes([{name:registrar.name,dishTypes:registrar.dishTypes}])})
    .then(()=>{res.send('Recipe created succesfully.');})
    .catch(()=>{res.send('There was an error processing the request');})
})

module.exports = router;