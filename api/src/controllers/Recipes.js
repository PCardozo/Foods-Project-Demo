const {Recipe} = require('../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

function writeRecipes(arr){
    console.log('Writing recipes into database...')
    return Recipe.bulkCreate(arr)
    .then(()=>{console.log('Recipes written into database.')})
    .catch((e)=>{console.log('An error occurred while writing recipes: ',e)})
}

function writeNewRecipe(rec){
    console.log('Writing new recipe into database...')
    const reg = {
        name:rec.name,
        summary:rec.summary,
        steps:rec.steps,
        healthScore:rec.healthScore,
        picture:rec.picture,
    }
    return Recipe.create(reg)
    .then(()=>{console.log('New recipe written into database.')})
    .catch((e)=>{console.log('An error occurred while writing the recipes: ',e)})
}

async function getOneRecipe(recID){
        //console.log('Recipes Controller: get recipe query');
        const lecture = await Recipe.findOne({
            where:{
                id:recID,
            }
        })
        if(lecture){
            return lecture
        } else{
            return 'Not found';
        } 
}

async function getManyRecipes(str){
    const searchValue = '%'+str+'%';
    const lecture = await Recipe.findAll({
        where:{
            name:sequelize.where(sequelize.fn('LOWER', sequelize.col('name')),{
                [Op.like]:searchValue
            })
        }
    })
    if(lecture.length > 0){
        const aux = lecture.map((e)=>{
            return{
                id:e.dataValues.id,
                name:e.dataValues.name,
                picture:e.dataValues.picture,
                healthScore:e.dataValues.healthScore,
            }
        })
        return aux;
    } else{
        return 'Not found';
    } 
}

module.exports={
    writeNewRecipe,
    writeRecipes,
    getOneRecipe,
    getManyRecipes
};