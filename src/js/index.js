import axios from 'axios';

async function getResult(query){
    try{
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`); //returns in json
        const recipes = result.data.recipes;
        console.log(recipes);
    }
    catch(error){
        alert(error);
    }
    
}

getResult("onion");

// https://forkify-api.herokuapp.com/api/search