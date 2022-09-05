//IMPORTS/////////////////////////////////////////////////////////////////////////////

require('dotenv').config();
const {API_KEY} = process.env;
const server = require('./src/app.js');
const {writeDiets} = require('./src/controllers/Diets.js')
const {writeRecipes} = require('./src/controllers/Recipes.js')
const {apiFetch,dietFetch} = require('./src/controllers/apiFetch.js');
const {createDataBulk} = require('./src/controllers/Recipes_diet_types.js')
const { conn, Recipe,Diet_type, Recipes_diet_types } = require('./src/db.js');

//SERVER STARTUP//////////////////////////////////////////////////////////////////////

conn.sync({ force: true }) // Syncing all the models at once.
.then(async ()=>{ console.log('Fetching data...');return await apiFetch(API_KEY)})
.then((r)=>{return Promise.all([writeRecipes(r),writeDiets()])})
.then(async ()=>{console.log('Fetching diet properties...');return await dietFetch(API_KEY)})
.then((r)=>{return createDataBulk(Recipes_diet_types,Diet_type,Recipe,r)})
.then(() => {
  server.listen(3001, () => {
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
