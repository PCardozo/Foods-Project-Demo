
////////////////////////////////////////////////////////////////////////////////////////////////////
const axios = require('axios');

function formatSteps(element){
    let obj = { //copio el objeto
        ...element
    }
    if(element.steps[0]){ //si la receta tiene pasos (algunas no los tienen)
        let aux = element.steps[0].steps.map((elem)=>{return elem.step}) //genero arreglo de strings
        obj.steps=aux.join(' '); //concateno arreglo de strings en un solo string
    } else{
        obj.steps='No steps available'; //si no hay pasos determino este valor directamente
    }
    return obj;
};

function escapeHref(string){ //tomo el string con aperturas de hipervinculo
  while(string.includes('<')){ //si el string tiene este simbolo significa que aun contiene etiquetas
    let pos = string.indexOf('<');//busco la posicion del simbolo
    let toReplace=[];
    for (let i = pos; i < string.length; i++) {//voy guardando el string que viene siendo un link
      toReplace.push(string[i]);
      if(string[i]==='>') break; //al llegar al final de la etiqueta,dejo de guardar
    }
    toReplace=toReplace.join('');//creo el string que es un link
    string=string.replace(toReplace,'');//lo elimino buscando exactamente el link completo
  }
  return string;
}

function summaryEscaper(elm){ //recibo elemento sin formatear
    let regex= [/<b>/g,/<\/b>/g,/<\/a>/g,];//dicto las etiquetas html que quiero sacar (no elimino apertura de hipervinculo)
    let str = elm.summary.replace(regex[0],'').replace(regex[1],'').replace(regex[2],''); //las elimino
    str=escapeHref(str);//hay unos links en el resumen que hay que eliminar
    elm.summary=str;
    return elm;
};

function objCreator(elm){//recibo un elemento del arreglo respondido por la api externa
    let mod={
        name:elm.title,//tomo la info que necesito
        summary:elm.summary,
        healthScore:elm.healthScore,
        steps:elm.analyzedInstructions,
        picture:elm.image,
        diets:[],
    }
    elm.vegetarian ? mod.diets.push('vegetarian') : false;//chequeo los tipos de dieta que figuran con booleanos
    elm.glutenFree ? mod.diets.push('gluten free') : false;//si es propicio,los aniado
    elm.vegan ? mod.diets.push('vegan') : false;
    for (let i = 0; i < elm.diets.length; i++) {//recorro arreglo tipos dieta
        mod.diets.includes(elm.diets[i]) ? true : mod.diets.push(elm.diets[i]); //si el tipo dieta ya esta en mi nuevo arreglo, lo salteo   
    }
    mod=formatSteps(mod); //convierto el arreglo de steps en un solo string gigante
    mod=summaryEscaper(mod); //al resumen hay que sacarle etiquetas html
    return mod; //devuelvo el objeto ya formateado

};


async function apiFetch(apiKey){
    let iGotData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    let r = iGotData.data.results;
    let r2 = r.map((el)=>{return objCreator(el)}); //con la info que obtuve, creo arreglo de objetos que voy a usar para escribir en la db
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