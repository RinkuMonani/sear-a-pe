import axios from 'axios';
import APIurl from '../config';

export default class Recipe {

    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            // const result = await axios(`${APIurl}get?rId=123${this.id}`);
            const result = await axios(`${APIurl}get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        }
        catch(error){
            // console.log(error);
            alert("Something went wrong 😥");
        }
    }

    calculateTime(){
        // Assuming that for every 3 ingredients
        // 15 mins of cooking is required
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);
        this.time = periods*15;
    }

    calculateServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitLong = ['tablespoons', 'tablespoon','ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(element => {
            // uniform units
            let ingredient = element.toLowerCase();
            unitLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            });

            // remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // parse ingredients into count, unit, ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));

            let objIng;

            if(unitIndex > -1){
                // unit is present
                const arrCount = arrIng.slice(0, unitIndex);
                // console.log(`ARR COUNT : ${arrCount}`);

                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else if(arrCount.length > 1){
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')   
                };
            }
            else if(parseInt(arrIng[0], 10)){
                // no unit but first element in a number
                // console.log(`THIRD`);
                // console.log(`ARR SLICE : ${arrIng.slice(1)}`);
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit:'',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }

            else if(unitIndex === -1){
                //no unit
                
                objIng = {
                    count: 1,
                    unit:'',
                    ingredient
                }

            }

            return objIng;

        });
        // console.log(`NEW INGREDIENTS : ${newIngredients}`);
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
         
        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= [newServings / this.servings];
        });

        this.servings = newServings;

    }
}