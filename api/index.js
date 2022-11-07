//IMPORTS/////////////////////////////////////////////////////////////////////////////

require('dotenv').config();
const {API_KEY} = process.env;
const {conn} = require('./src/db.js');
const server = require('./src/app.js');
const {writeDiets} = require('./src/controllers/Diets.js');
const {writeRecipes} = require('./src/controllers/Recipes.js');
const {writeDishTypes} = require('./src/controllers/Dish_Type.js');
const {apiFetch,propertyFetch} = require('./src/controllers/apiFetch.js');
const {writeRecipesDietTypes} = require('./src/controllers/Recipes_Diet_types.js');
const {writeRecipesDishTypes} = require('./src/controllers/Recipes_dish_types.js');


//SERVER STARTUP//////////////////////////////////////////////////////////////////////

conn.sync({ force: false }) // Syncing all the models at once.
/*.then(async ()=>{ console.log('Fetching data...');return await apiFetch(API_KEY)})//pido info a la api externa
.then((r)=>{return Promise.all([writeRecipes(r),writeDiets(),writeDishTypes()])}) //escribo en db en base a la info generada por mi fn
.then(async ()=>{return await propertyFetch(API_KEY)}) //pido info de nuevo para escribir relaciones porque originalmente no existen los datos en mi db y necesito los ids de los registros
.then((r)=>{return Promise.all([writeRecipesDietTypes(r),writeRecipesDishTypes(r)])})//escribo las relaciones en tablas conjuntas
.then(() => {*/
  server.listen(5432, () => {
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
