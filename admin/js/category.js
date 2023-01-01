import categoriesApi from "../../api/categoriesApi.js";


const renderCategoryList = (idElement, categoryList) => {
    if(!Array.isArray(categoryList) || categoryList.length === 0) return;
   const tbodyElementt = document.getElementById(idElement);
   let htmlString = '';
    categoryList.forEach(category => {
        htmlString+= `
        <tr class="">
            <td scope="row">${category.id}</td>
            <td>${category.categoryName}</td>
            <td><a class="btn btn-success mx-3" href="./editCategory.html?id=${category.id}">Edit</a><a class="btn btn-danger"
                    href="./deleteCategory.html?id=${category.id}" onclick="return confirm('Are you sure you want to delete this category ?')">Delete</a></td>
        </tr>
        `;
    })
    tbodyElementt.innerHTML = htmlString;
}


(async () => {
    try {
        const url = new URL(window.location);
    
        // update search params if needed
    
        // url.searchParams.set(filiterName, filterValue);
        const queryParams = url.searchParams;
        history.pushState({}, '', url);
    
    
        // set default pagination (_page, _limit) on URL
    
        // render post list based URL params
        // const queryParams = new URLSearchParams(window.location.search);
        const data = await categoriesApi.getAll(queryParams);
        console.log(data);
        renderCategoryList('categoryList', data);
      } catch (error) {
        console.log('error', error.response);
      }
})()

