const {Recipes_dish_types, Dish_type, Recipe} = require('../db');

async function getDishTypeRelation(id){
    const data = await Recipes_dish_types.findAll({
        attributes:['dishTypeId'],
        where:{
            recipeId:id,
        }
    })
    const value = data.map((el)=>{return el.dataValues.dishTypeId});
    return value;
}

async function writeRecipesDishTypes(dataArray){
    console.log('Writing recipes-dish-types...');
    let objArray=[];
    for (let i = 0; i < dataArray.length; i++) {
        //console.log('databulk:',dataArray[i].name)
        let recipeId = await IdGetter(Recipe, dataArray[i].name);
        for (let t = 0; t < dataArray[i].dishTypes.length; t++) {
            let dishTypeId = await IdGetter(Dish_type, dataArray[i].dishTypes[t]);
            objArray.push({
                recipeId,
                dishTypeId,
            })
        }     
    }
    //console.log('arreglo de objetos', objArray);
    return Recipes_dish_types.bulkCreate(objArray)
    .then(()=>{console.log('Writing complete.')})
    .catch((e)=>{console.log('An error occurred while doing stuff',e)})
}

async function IdGetter(seqModel, nameValue){
    const lecture = await seqModel.findOne({
            attributes:['id'],
            where:{
                name:nameValue,
            }
        })
    let value = lecture.dataValues.id;
    return value;
}

module.exports={
    writeRecipesDishTypes,
    getDishTypeRelation
}