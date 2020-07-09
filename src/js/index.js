import Search from './models/Search';
import { elements, renderLoader, stopLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';

/* 
GLOBAL STATE OF THE APP
- Search object
- Current recipe Object
- shopping list object
- liked recipes
*/
const state = {};


/*
    SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    // const query = 'pizza';
    
    if(query){
        //2. create new search object
        //   add it to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearResultList();
        renderLoader(elements.searchResults);

        // 4. Search for recipes
        await state.search.getResults();
        searchView.clearInput();

        // 5. Render results on UI
        stopLoader();
        searchView.renderResults(state.search.recipes);

    }
}

// window.addEventListener('load', e =>{
//     e.preventDefault();
//     controlSearch();
// });

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});


elements.searchPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if(btn){
        searchView.clearResultList();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.recipes, goToPage);
        // console.log(goToPage); 
    }
});
// search.getResult();

/*
    RECIPE CONTROLLER
*/

const controlRecipe = async () => {
    
    renderLoader(elements.recipe);
    //  get id from url
    const id = window.location.hash.replace('#','');

    if(id){
        // prepare ui for changes
        renderLoader(elements.recipe);
        console.log("LOADING");
        recipeView.clearRecipe();

        //  create new recipe object
        state.recipe = new Recipe(id);
        // window.r = state.recipe;
    
        try{
            // get recipe data
            await state.recipe.getRecipe();
    
            //parse ingredients
            state.recipe.parseIngredients();
    
            // calctime and calcServings
            state.recipe.calculateTime();
            state.recipe.calculateServings();

            // render results on UI

            console.log("recipe");
            console.log(state.recipe);
            // stopLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch(error){
            alert(`Error processing recipe.`);
        }
        

    }
    
};

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));