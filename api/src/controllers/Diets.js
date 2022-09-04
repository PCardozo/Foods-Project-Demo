const {Diet_type} = require('../db');



function writeDiets(){
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
    ];
    console.log('Writing diet types into database...')
    return Diet_type.bulkCreate(vars)
    .then(()=>{console.log('Diet types written into database.')})
    .catch((e)=>{console.log('An error occurred while diet types recipes: ',e)})
}

module.exports={writeDiets:writeDiets}