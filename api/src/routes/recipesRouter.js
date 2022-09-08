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

router.post('/',async (req,res)=>{
    console.log('Creating new recipe..');
    const {registrar} = req.body;
    if(!registrar)res.status(400).send('There was an error processing the request');
    /*testObj={
        name:'La polentovich del Momo',
        summary:'La polentovich del Momo es la comida ideal para cualquier gamer que no tiene puta idea de prender una cocina. Memepuntos extra si sos peronista, perry',
        steps:'Hervir leche, aniadir un caldo de gashina, espolvorear la fecula de maiz lentamente y revolver en modo NASHE. Si no podes seguir este par de instrucciones al pie de la letra sos medio pelotudo.',
        healthScore:17,
        dietTypes:["gluten free","vegetarian","ovo vegetarian","pescatarian",],
        dishTypes:["lunch","main course","main dish","dinner","brunch","dip"]
    };*/
    writeNewRecipe(registrar)
    .then(()=>{return writeRecipesDietTypes([{name:testObj.name,diets:testObj.dietTypes}])})
    .then(()=>{return writeRecipesDishTypes([{name:testObj.name,dishTypes:testObj.dishTypes}])})
    .then(()=>{res.send('Recipe created succesfully.');})
    .catch(()=>{res.status(400).send('There was an error processing the request');})
    //escribir en la db la info basica- no diet types ni dish types
    //recuperar id de receta nueva y escribir tipos de plato
    //recuperar id de receta nueva y escribir tipos de dieta
})

module.exports = router;