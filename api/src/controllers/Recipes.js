const {Recipe} = require('../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

function writeRecipes(arr){
    console.log('Writing recipes into database...')
    return Recipe.bulkCreate(arr)
    .then(()=>{console.log('Recipes written into database.')})
    .catch((e)=>{console.log('An error occurred while writing recipes: ',e)})
}

function writeNewRecipe(rec){ // recibo ojeto de receta
    console.log('Writing new recipe into database...')
    const reg = { //elimino los datos que no seran escritos en la tabla recetas
        name:rec.name,
        summary:rec.summary,
        steps:rec.steps,
        healthScore:rec.healthScore,
        picture:rec.picture,
    }
    return Recipe.create(reg) //devuelvo promesa con manejo de exito y errores
    .then(()=>{console.log('New recipe written into database.')})
    .catch((e)=>{console.log('An error occurred while writing the recipes: ',e)})
}

async function getOneRecipe(recID){ //recibo id y busco en tabla.
        const lecture = await Recipe.findOne({
            where:{
                id:recID,
            }
        })
        if(lecture){ //si valor existe lo devuelvo, sino devuelvo string not found
            return lecture
        } else{
            return 'Not found';
        } 
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

async function getManyRecipes(str){ //recibo string y busco toda receta en tabla cuyo name lo contenga
    str = str.toLowerCase(); //paso a minusculas el string recibido para no tener errores
    const searchValue = '%'+str+'%'; // % es wildcard para existencia o no de caracteres
    const lecture = await Recipe.findAll({
        where:{
            name:sequelize.where(sequelize.fn('LOWER', sequelize.col('name')),{ //aplico funcion a columna para pasar a minusculas
                [Op.like]:searchValue
            })
        }
    })
    if(lecture.length > 0){ //si hubo algun resultado
        const aux = lecture.map((e)=>{ //genero arreglo con la info que necesito de cada objeto respondido
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