const {Recipe} = require('../db');

function writeRecipes(arr){
    console.log('Writing recipes into database...')
    return Recipe.bulkCreate(arr)
    .then(()=>{console.log('Recipes written into database.')})
    .catch((e)=>{console.log('An error occurred while writing recipes: ',e)})
}

module.exports=writeRecipes;