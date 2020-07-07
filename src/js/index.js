import Search from './models/Search';
import { elements, renderLoader, stopLoader } from './views/base';
import * as searchView from './views/searchView';

/* 
GLOBAL STATE OF THE APP
- Search object
- Current recipe Object
- shopping list object
- liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    
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
        searchView.renderResults(state.search.recipes);
        stopLoader();

        

    }
}

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
        console.log(goToPage); 
    }
});
// search.getResult();