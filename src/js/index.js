import Search from './models/Search';

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
    const query = 'pizza';
    
    if(query){
        //2. create new search object
        //   add it to state
        state.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.recipes);

    }
    // else{

    // }
}

document.querySelector('.search').addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

// search.getResult();