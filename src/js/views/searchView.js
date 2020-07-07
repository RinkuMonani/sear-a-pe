import {elements} from './base';

export const getInput = () => elements.searchInput.value;

const limitRecipeTitle = (title, limit = 17) => {
    
    const newTitle = [];

    if(title.length > limit){
        title.split(' ').reduce((acc, current) => {
            if(acc + current.length <= limit){
                newTitle.push(current);
            }
            return current.length + acc;
        }, 0);

        return `${newTitle.join(' ')}...`;
    }

    console.log(title);
    return title;
}
const renderRecipe = recipe => {

    console.log('RECEPIE');
    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);

}
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResultList = () => {
    elements.searchResultList.innerHTML = '';
}
