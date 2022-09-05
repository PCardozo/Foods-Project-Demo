const { Router } = require("express");
const express = require("express");
const {getOneRecipe} = require('../controllers/Recipes');
const {getDietRelation} = require('../controllers/Recipes_Diet_types')
const {getDietsForRecipe} = require('../controllers/Diets')
const router = Router();
router.use(express.json());

router.get('/',(req,res)=>{

    res.send('hola desde recipes');
});

router.get('/:id',async (req,res)=>{
    const data = await getOneRecipe(req.params.id);
    //console.log('recipe router Log:',data);
    //res.send('ania dijo el mini pecca');
    if(typeof data === 'string'){
        res.send(data);
    } else {
        const value = data.dataValues;    
        value.dietTypes= await getDietsForRecipe(await getDietRelation(value.id));
        res.send(value);
    }
    
    //console.log(value);
    
});

module.exports = router;