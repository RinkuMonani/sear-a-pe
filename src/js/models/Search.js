import axios from 'axios';

export default class Seach{

    constructor(query){
        this.query = query;
    }

    async getResults(){
        try{
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); //returns in json
            this.recipes = result.data.recipes;
            // console.log(this.recipes);
        }
        catch(error){
            alert(error);
        }
        
    }
}


// https://forkify-api.herokuapp.com/api/search