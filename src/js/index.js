import Search from './models/Search';
import { elements, renderLoader, stopLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';
import List from './models/List';
import * as listView from './views/listView';

/* 
GLOBAL STATE OF THE APP
- Search object
- Current recipe Object
- shopping list object
- liked recipes
*/
const state = {};
window.state = state;


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
    
    //  get id from url
    const id = window.location.hash.replace('#','');

    if(id){
        // prepare ui for changes
        renderLoader(elements.recipe);
        
        recipeView.clearRecipe(); //this also clears the loader

        // highlight the selected recipe
        if(state.search)
            searchView.highlightSelected(id);

        //  create new recipe object
        state.recipe = new Recipe(id);
        // window.r = state.recipe;
        // console.log(state.recipe);
    
        try{
            // get recipe data
            await state.recipe.getRecipe();
    
            //parse ingredients
            state.recipe.parseIngredients();
    
            // calctime and calcServings
            state.recipe.calculateTime();
            state.recipe.calculateServings();

            // render results on UI

            // console.log("recipe");
            // console.log(state.recipe);
            stopLoader();
            
            recipeView.renderRecipe(state.recipe);
        }
        catch(error){
            alert(`Error processing recipe.`);
        }
        

    }
    
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlShoppingList = () => {
    
    // create a new list if does not exist aleady
    if(!state.list){
        state.list = new List();
    }

    // clear the existing list

    // add each ingredient to the list
    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });


}

// handle delete and update shopping list item events

elements.shoppingList.addEventListener('click', e => {
    // console.log(e.target.closest('data-itemid'));
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // delete the item
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
    }
    else if(e.target.matches('.shopping__count--value')){
        const newValue = parseFloat(e.target.value);
        if(newValue > 0){
            state.list.updateCount(id, newValue);
        }
        else{
            alert("Cannot shop for less then current quantity");
            state.list.updateCount(id, 1);
            e. target.value = 1;
        }

        // e.target.addEventListener('change', alert("change"));
        
    }
});

/*
    LIKES CONTROLLER
*/

const controlLike = () =>{

    if(!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    // if recipe is not liked yet
    if(!state.likes.isLiked(currentID)){
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // toggle the likes button/icon

        // add the like to UI - likes list
        console.log(state.likes);
    }
    // if recipe is already liked
    else{

        // remove like to the state
        state.likes.deleteLike(currentID);

        // toggle the likes button/icon

        // remove the like to UI - likes list
        console.log(state.likes);

    }
}




// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn--decrease, .btn-decrease *')){
        // decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn--increase, .btn-increase *')){
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //add ingredients to shopping list
        controlShoppingList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        // call the like controller
        controlLike();
    }
    

});


// const l = new List();
// window.l = l;
// l.addItems()