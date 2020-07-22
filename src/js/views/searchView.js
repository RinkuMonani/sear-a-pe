import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const limitRecipeTitle = (title, limit = 17) => {
    
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

    return title;
}
const renderRecipe = recipe => {

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
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

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
        
    </button>
`;

const renderPageButtons = (page, totalResults, resultsPerPage) => {
    const numOfPages = Math.ceil(totalResults / resultsPerPage);

    let button;

    if(page === 1 && numOfPages > 1){
        // display only next button
        button = createButton(page, 'next');
    }
    else if(page === numOfPages){
        // display only prev button
        button = createButton(page, 'prev');
    }
    else if (page < numOfPages){
        // display both net and prev
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }

    elements.searchPages.insertAdjacentHTML('afterbegin', button);
    
};

export const renderResults = (recipes, page=1, resultsPerPage=10) => {

    // render results of current page
    const start=(page - 1) * resultsPerPage;
    const end=page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderPageButtons(page, recipes.length, resultsPerPage);


    // recipes.forEach(renderRecipe);
}

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResultList = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultArray = Array.from(document.querySelectorAll('.results__link'));
    resultArray.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}
