const { Router } = require("express");
const express = require("express");
const {getOneRecipe,getManyRecipes,writeNewRecipe} = require('../controllers/Recipes');
const {getDietRelation,writeRecipesDietTypes} = require('../controllers/Recipes_Diet_types');
const {getDietsForRecipe} = require('../controllers/Diets');
const {getDishTypeRelation,writeRecipesDishTypes} = require('../controllers/Recipes_dish_types');
const {getDishTypesForRecipe} = require('../controllers/Dish_Type');
const router = Router();
router.use(express.json());


router.get('/:id',async (req,res)=>{
    const data = await getOneRecipe(req.params.id); //tomo id por params y envio a fn
    //console.log('recipe router Log:',data);
    if(typeof data === 'string'){ //si fn devolvio string, respondo con ello (mensaje error)
        res.send(data);
    } else { //si fn devolvio elemento busco diets y dishes con el id del elemento y respondo
        const value = data.dataValues;    
        value.dietTypes= await getDietsForRecipe(await getDietRelation(value.id));//busco las dietas en base a sus id
        value.dishTypes= await getDishTypesForRecipe(await getDishTypeRelation(value.id)); //idem pero con tipo plato
        res.send(value); //respondo con objeto que contiene info sacada de tabla recetas + arreglo dietas + arreglo plato
    }
    
    //console.log(value);
    
});

router.get('/',async (req,res)=>{//busqueda por string recibido via query
    const {name} = req.query;
    if(!name){res.send('Bad request: null name info');}//si name no existe respondo con mensaje error
    else{
        let data = await getManyRecipes(name); //busco recetas que contienen el string
        if(typeof data === 'string'){ //si recibi string es que no encontre, respondo
            res.send(data);
        } else { //si recibi arreglo...
            for (let i = 0; i < data.length; i++) {
                data[i].dietTypes=await getDietsForRecipe(await getDietRelation(data[i].id)); //genero arreglos de dietas y platos en base a id de cada elemento del arreglo
                data[i].dishTypes=await getDishTypesForRecipe(await getDishTypeRelation(data[i].id));        
            }
            res.send(data);
        }    
    };
    
})

router.get('/pablo/:aux/:id',async (req,res)=>{
        
        let {aux,id} = req.params;
        //let {data} = req.body;
        if(aux && id){
            let obj ={
            aux,
            id
            }
            res.send(obj)
        } else{
            res.status(404).send('Bad request')
        }
        
        /*let data = await getManyRecipes(name); //busco recetas que contienen el string
        if(typeof data === 'string'){ //si recibi string es que no encontre, respondo
            res.send(data);
        } else { //si recibi arreglo...
            for (let i = 0; i < data.length; i++) {
                data[i].dietTypes=await getDietsForRecipe(await getDietRelation(data[i].id)); //genero arreglos de dietas y platos en base a id de cada elemento del arreglo
                data[i].dishTypes=await getDishTypesForRecipe(await getDishTypeRelation(data[i].id));        
            }
            res.send(data);
        }*/    
    
})

router.post('/',async (req,res)=>{
    console.log('Creating new recipe..');
    const registrar = { //creo objeto con la info recibida por body de request
        name:req.body.name,
        healthScore:req.body.healthScore,
        summary:req.body.summary,
        steps: req.body.steps,
        dietTypes:req.body.dietTypes,
        dishTypes:req.body.dishTypes,
    }
    console.log(registrar)
    if(!registrar){res.send('There was an error processing the request');return}
    writeNewRecipe(registrar) //mando a escribir receta con el objeto creado
    .then(()=>{return writeRecipesDietTypes([{name:registrar.name,diets:registrar.dietTypes}])}) //si la receta se guardo, escribo sus tipos de dieta
    .then(()=>{return writeRecipesDishTypes([{name:registrar.name,dishTypes:registrar.dishTypes}])})//si se creo la relacion de dietas, pido la de tipo plato
    .then(()=>{res.send('Recipe created succesfully.');}) //si todo salio bien respondo que ok
    .catch(()=>{res.send('There was an error processing the request');}) //sino no
})

module.exports = router;
