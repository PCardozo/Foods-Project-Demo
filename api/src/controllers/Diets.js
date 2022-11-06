const {Diet_type} = require('../db');

async function getDietsForRecipe(arrId){ //recibo arreglo con id de dietas
    let result =[];
    for (let i = 0; i < arrId.length; i++) { //recorro arreglo
        const lecture = await Diet_type.findOne({ //busco de a uno cada resultado
            attributes:['name'],//me traigo solamente el name de la dieta
            where:{
                id:arrId[i],
            }
        })
        result.push(lecture.dataValues.name);  
    }
    return result;  //retorno arreglo con strings de nombre dieta
}


async function getDiets(){ //recupera registros de diets y los retorna en un arreglo (id incluido)  
    try{
        const val = await Diet_type.findAll();
        //console.log('valor de FindAll es:',val);
        const result = val.map((elem)=>{return elem['dataValues']});
        return result;
    } catch(err) {
        console.log('An error ocurred while Getting Diet types:',err)
        return 'An error Occurred';
    }
}

function writeDiets(){ //escribo los siguientes valores en la tabla
    let vars = [
        {name: "gluten free"},
        {name: "dairy free"},
        {name: "lacto ovo vegetarian"},
        {name: "vegan"},
        {name: "paleolithic"},
        {name: "primal"},
        {name: "pescatarian"},
        {name: "fodmap friendly"},
        {name: "whole 30"},
        {name: "vegetarian"},
        {name: "ovo vegetarian"},
        {name: "lacto vegetarian"},
        {name: "ketogenic"},
        {name: "No diet types available"},
    ];
    console.log('Writing diet types into database...')
    return Diet_type.bulkCreate(vars)
    .then(()=>{console.log('Diet types written into database.')})
    .catch((e)=>{console.log('An error occurred while diet types recipes: ',e)})
}

module.exports={
    writeDiets,
    getDiets,
    getDietsForRecipe
}