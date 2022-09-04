var testArr = [
    {
      name: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
      diets: [
        'vegetarian',
        'gluten free',
        'vegan',
        'dairy free',
        'lacto ovo vegetarian'
      ]
    },
    {
      name: 'Homemade Garlic and Basil French Fries',
      diets: [ 'vegetarian', 'vegan', 'dairy free', 'lacto ovo vegetarian' ]
    },
    {
      name: 'Berry Banana Breakfast Smoothie',
      diets: [ 'vegetarian', 'lacto ovo vegetarian' ]
    },
    {
      name: 'Garlicky Kale',
      diets: [
        'vegetarian',
        'gluten free',
        'vegan',
        'dairy free',
        'paleolithic',
        'lacto ovo vegetarian',
        'primal',
        'whole 30'
      ]
    },
    {
      name: 'African Chicken Peanut Stew',
      diets: [ 'gluten free', 'dairy free' ]
    }
  ];


async function IdGetter(seqModel, nameValue){
    const lecture = await seqModel.findOne({
            attributes:['id'],
            where:{
                name:nameValue,
            }
        })/*.dataValues.id;*/
    //console.log('idgetter:',value)
    let value = lecture.dataValues.id;
    //console.log('idgetter:',value);
    return value;
}

async function createDataBulk(junctionTable, dietModel,recipeModel,dataArray){
    console.log('Writing recipes-diet-types...')
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
    return junctionTable.bulkCreate(objArray)
    .then(()=>{console.log('Writing complete.')})
    .catch((e)=>{console.log('An error occurred while doing stuff',e)})
}

module.exports={
    createDataBulk
}