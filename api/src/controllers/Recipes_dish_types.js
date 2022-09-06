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

async function createDataBulk(dietModel,recipeModel,dataArray){
    console.log('Writing recipes-dish-types...')
    let objArray=[];
    for (let i = 0; i < dataArray.length; i++) {
        //console.log('databulk:',dataArray[i].name)
        let recID = await IdGetter(recipeModel, dataArray[i].name);
        for (let t = 0; t < dataArray[i].diets.length; t++) {
            let dietID = await IdGetter(dietModel, dataArray[i].diets[t]);
            objArray.push({
                recipeId: recID,
                dietTypeId: dietID,
            })
        }     
    }
    //console.log('arreglo de objetos', objArray);
    return Recipes_dish_types.bulkCreate(objArray)
    .then(()=>{console.log('Writing complete.')})
    .catch((e)=>{console.log('An error occurred while doing stuff',e)})
}