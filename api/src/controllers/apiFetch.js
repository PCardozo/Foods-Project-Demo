
////////////////////////////////////////////////////////////////////////////////////////////////////
const axios = require('axios');

function formatSteps(element){
    let obj = {
        ...element
    }
    if(element.steps[0]){
        let aux = element.steps[0].steps.map((elem)=>{return elem.step})
        obj.steps=aux.join(' ');
    } else{
        obj.steps='No steps available';
    }
    return obj;
};

function escapeHref(string){
  while(string.includes('<')){
    let pos = string.indexOf('<');
    let toReplace=[];
    for (let i = pos; i < string.length; i++) {
      toReplace.push(string[i]);
      if(string[i]==='>') break;
    }
    toReplace=toReplace.join('');
    string=string.replace(toReplace,'');
  }
  return string;
}

function summaryEscaper(elm){
    let regex= [/<b>/g,/<\/b>/g,/<\/a>/g,];
    let str = elm.summary.replace(regex[0],'').replace(regex[1],'').replace(regex[2],'');
    str=escapeHref(str);
    elm.summary=str;
    return elm;
};

function objCreator(elm){
    let mod={
        name:elm.title,
        summary:elm.summary,
        healthScore:elm.healthScore,
        steps:elm.analyzedInstructions,
        picture:elm.image,
        diets:[],
    }
    elm.vegetarian ? mod.diets.push('vegetarian') : false;
    elm.glutenFree ? mod.diets.push('gluten free') : false;
    elm.vegan ? mod.diets.push('vegan') : false;
    for (let i = 0; i < elm.diets.length; i++) {
        mod.diets.includes(elm.diets[i]) ? true : mod.diets.push(elm.diets[i]);    
    }
    mod=formatSteps(mod);
    mod=summaryEscaper(mod);
    return mod;

};


async function apiFetch(apiKey){
    let iGotData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    let r = iGotData.data.results;
    let r2 = r.map((el)=>{return objCreator(el)});
    //console.log(r2)
    console.log('Fetch complete.')
    return r2;
};

function propertyObjCreator(elm){
    let mod={
        name:elm.title,
        diets:[],
        dishTypes:elm.dishTypes
    }
    elm.vegetarian ? mod.diets.push('vegetarian') : false;
    elm.glutenFree ? mod.diets.push('gluten free') : false;
    elm.vegan ? mod.diets.push('vegan') : false;
    for (let i = 0; i < elm.diets.length; i++) {
        mod.diets.includes(elm.diets[i]) ? true : mod.diets.push(elm.diets[i]);    
    }
    return mod;

};

async function propertyFetch(apiKey){
    console.log('Fetching diet and Dish type properties...')
    let iGotData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    let r = iGotData.data.results;
    let r2 = r.map((el)=>{return propertyObjCreator(el)});
    //console.log(r2);
    console.log('Fetch complete.');
    return r2;
};

//apiFetch(key);

module.exports={
    apiFetch,
    propertyFetch
};