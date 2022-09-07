const { Router } = require("express");
const express = require("express");
const {getOneRecipe,getManyRecipes} = require('../controllers/Recipes');
const {getDietRelation} = require('../controllers/Recipes_Diet_types');
const {getDietsForRecipe} = require('../controllers/Diets');
const {getDishTypeRelation} = require('../controllers/Recipes_dish_types');
const {getDishTypesForRecipe} = require('../controllers/Dish_type');
const router = Router();
router.use(express.json());


router.get('/:id',async (req,res)=>{
    const data = await getOneRecipe(req.params.id);
    //console.log('recipe router Log:',data);
    if(typeof data === 'string'){
        res.status(404).send(data);
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
    if(!name){res.status(400).send('Bad request: null name info');}
    else{
        let data = await getManyRecipes(name);
        if(typeof data === 'string'){
            res.status(404).send(data);
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

module.exports = router;