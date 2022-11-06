const {Recipes_diet_types,Diet_type,Recipe} = require('../db');

async function getDietRelation(id){ //recibo id de receta,busco en tabla valores asociados a ese id, y devuelvo arreglo con id de tipos de dieta
    const data = await Recipes_diet_types.findAll({
        attributes:['dietTypeId'],
        where:{
            recipeId:id,
        }
    })
    const value = data.map((el)=>{return el.dataValues.dietTypeId});// EL RESULTADO NUNCA ES NULO,SI LA RECETA NO TIENE TIPOS DE DIETA, SE LE ASIGNA EL TIPO 'SIN DIETAS'
    return value;
}


async function IdGetter(seqModel, nameValue){ //recibo una tabla y el name de un elemento
    const lecture = await seqModel.findOne({ //me traigo el id correspondiente a tal name
            attributes:['id'],                 //aca si me avive de refactorizar
            where:{
                name:nameValue,
            }
        })
    let value = lecture.dataValues.id;
    return value;
}

async function writeRecipesDietTypes(dataArray){ //recibo arreglo con objetos que contienen nombre de receta y arreglo de strings dieta
    console.log('Writing recipes-diet-types...')
    let objArray=[];
    for (let i = 0; i < dataArray.length; i++) { //recorro el arreglo de objeos
        let recID = await IdGetter(Recipe, dataArray[i].name); //busco id de receta en base a string name
        for (let t = 0; t < dataArray[i].diets.length; t++) { //recorro arreglo de tipos de dieta
            let dietID = await IdGetter(Diet_type, dataArray[i].diets[t]); //consigo id de la dieta usando la funcion que refactorice (lo bueno de que ambas tablas tengan el mismo nombre de columna)
            objArray.push({//guardo en arreglo objeto con id receta e id tipo dieta
                recipeId: recID,
                dietTypeId: dietID,
            })
        }     
    }
    //console.log('arreglo de objetos', objArray);
    return Recipes_diet_types.bulkCreate(objArray) // retorno promesa de crear los registros correspondientes
    .then(()=>{console.log('Writing complete.')})
    .catch((e)=>{console.log('An error occurred while doing stuff',e)})
}

module.exports={
    writeRecipesDietTypes,
    getDietRelation
}