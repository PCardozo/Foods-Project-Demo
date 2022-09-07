//IMPORTS/////////////////////////////////////////////////////////////////////////////

require('dotenv').config();
const {API_KEY} = process.env;
const {conn} = require('./src/db.js');
const server = require('./src/app.js');
const {writeDiets} = require('./src/controllers/Diets.js');
const {writeRecipes} = require('./src/controllers/Recipes.js');
const {writeDishTypes} = require('./src/controllers/Dish_type.js');
const {apiFetch,propertyFetch} = require('./src/controllers/apiFetch.js');
const {writeRecipesDietTypes} = require('./src/controllers/Recipes_diet_types.js');
const {writeRecipesDishTypes} = require('./src/controllers/Recipes_dish_types.js');


//SERVER STARTUP//////////////////////////////////////////////////////////////////////

conn.sync({ force: true }) // Syncing all the models at once.
.then(async ()=>{ console.log('Fetching data...');return await apiFetch(API_KEY)})
.then((r)=>{return Promise.all([writeRecipes(r),writeDiets(),writeDishTypes()])})
.then(async ()=>{return await propertyFetch(API_KEY)})
.then((r)=>{return Promise.all([writeRecipesDietTypes(r),writeRecipesDishTypes(r)])})
.then(() => {
  server.listen(3001, () => {
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
