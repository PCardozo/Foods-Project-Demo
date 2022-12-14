const {Recipes_diet_types,Diet_type,Recipe} = require('../db');

async function getDietRelation(id){
    const data = await Recipes_diet_types.findAll({
        attributes:['dietTypeId'],
        where:{
            recipeId:id,
        }
    })
    const value = data.map((el)=>{return el.dataValues.dietTypeId});
    return value;
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

async function writeRecipesDietTypes(dataArray){
    console.log('Writing recipes-diet-types...')
    let objArray=[];
    for (let i = 0; i < dataArray.length; i++) {
        //console.log('databulk:',dataArray[i].name)
        let recID = await IdGetter(Recipe, dataArray[i].name);
        for (let t = 0; t < dataArray[i].diets.length; t++) {
            let dietID = await IdGetter(Diet_type, dataArray[i].diets[t]);
            objArray.push({
                recipeId: recID,
                dietTypeId: dietID,
            })
        }     
    }
    //console.log('arreglo de objetos', objArray);
    return Recipes_diet_types.bulkCreate(objArray)
    .then(()=>{console.log('Writing complete.')})
    .catch((e)=>{console.log('An error occurred while doing stuff',e)})
}

module.exports={
    writeRecipesDietTypes,
    getDietRelation
}