require('dotenv').config();

const {API_KEY} = process.env;

async function arrfetch(apiKey){
    let iGotData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=5`)
    let r = iGotData.data.results;
    let r2 = r.map((el)=>{return el.diets});
    //console.log(r2)
    console.log('Fetch complete.')
    return r2;
};