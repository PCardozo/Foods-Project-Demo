const server = require('./src/app.js');
const { conn, Recipe,Diet_type, Recipes_diet_types } = require('./src/db.js');
require('dotenv').config();
const {apiFetch,dietFetch} = require('./src/controllers/apiFetch.js');
const writeRecipes = require('./src/controllers/Recipes.js')
const {writeDiets} = require('./src/controllers/Diets.js')
const {API_KEY} = process.env;
const {createDataBulk} = require('./src/controllers/Recipes_diet_types.js')
// Syncing all the models at once.


conn.sync({ force: true })
.then(async ()=>{ console.log('Fetching data...');return await apiFetch(API_KEY)})
.then((r)=>{return Promise.all([writeRecipes(r),writeDiets()])})
.then(async ()=>{console.log('Fetching diet properties...');return await dietFetch(API_KEY)})
.then((r)=>{return createDataBulk(Recipes_diet_types,Diet_type,Recipe,r)})
.then(() => {
  server.listen(3001, () => {
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
