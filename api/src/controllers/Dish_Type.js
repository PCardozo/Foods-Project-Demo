const {Dish_type} = require('../db');

async function getDishTypesForRecipe(arrId){
    let result =[];
    for (let i = 0; i < arrId.length; i++) {
        const lecture = await Dish_type.findOne({
            attributes:['name'],
            where:{
                id:arrId[i],
            }
        })
        result.push(lecture.dataValues.name);  
    }
    return result;
}


/*async function getDiets(){
    try{
        const val = await Diet_type.findAll();
        //console.log('valor de FindAll es:',val);
        const result = val.map((elem)=>{return elem['dataValues']});
        return result;
    } catch(err) {
        console.log('An error ocurred while Getting Diet types:',err)
        return 'An error Occurred';
    }
}*/

function writeDishTypes(){
    let vars = [
        {name: "lunch"},
        {name: "main course"},
        {name: "main dish"},
        {name: "dinner"},
        {name: "side dish"},
        {name: "morning meal"},
        {name: "brunch"},
        {name: "breakfast"},
        {name: "soup"},
        {name: "salad"},
        {name: "condiment"},
        {name: "dip"},
        {name: "sauce"},
        {name: "spread"},
        {name: "No dish type available"}
    ];
    console.log('Writing dish types into database...')
    return Dish_type.bulkCreate(vars)
    .then(()=>{console.log('Dish types written into database.')})
    .catch((e)=>{console.log('An error occurred while writing dish types:',e)})
}

module.exports={
    writeDishTypes,
    getDishTypesForRecipe
}