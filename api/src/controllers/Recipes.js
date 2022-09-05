const {Recipe} = require('../db');

function writeRecipes(arr){
    console.log('Writing recipes into database...')
    return Recipe.bulkCreate(arr)
    .then(()=>{console.log('Recipes written into database.')})
    .catch((e)=>{console.log('An error occurred while writing recipes: ',e)})
}

async function getOneRecipe(recID){
        console.log('Recipes Controller: get recipe query');
        const lecture = await Recipe.findOne({
            where:{
                id:recID,
            }
        })
        if(lecture){
            return lecture
        } else{
            return 'Recipe not found';
        } 
}

module.exports={
    writeRecipes,
    getOneRecipe
};