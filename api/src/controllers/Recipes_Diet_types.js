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
    const value = await seqModel.findOne({
            attributes:['id'],
            where:{
                name:nameValue,
            }
        }).dataValues.id;
    return await value;
}

async function createDataBulk(dietModel,recipeModel,dataArray){
    console.log('log from crdatabulk ',dataArray)
    let objArray=[];
    for (let i = 0; i < dataArray.length; i++) {
        let recID = await IdGetter(recipeModel, dataArray[i].name);
        for (let t = 0; t < dataArray[i].diets.length; t++) {
            let dietID = await IdGetter(dietModel, dataArray[i].diets[t]);
            objArray.push({
                recipeId: recID,
                dietId: dietID,
            })
        }        
    }
    console.log(objArray);
    return objArray;
}

module.exports={
    createDataBulk
}