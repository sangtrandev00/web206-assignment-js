import productsApi from "../../api/productsApi.js";
import categoriesApi from "../../api/categoriesApi.js";
import debounce from 'lodash.debounce';

function initSearch({ elementId, defaultParams, onChange }) {
    const searchInput = document.getElementById(elementId)
    if (!searchInput) return
  
    // set default values from query params
    if (defaultParams && defaultParams.get('title_like')) {
      searchInput.value = defaultParams.get('title_like')
    }
  
    const debounceSearch = debounce((event) => onChange?.(event.target.value), 500)
    searchInput.addEventListener('input', debounceSearch)
  }
  

const renderPagination = (elementId, pagination) =>{
    const ulPagination = document.getElementById(elementId)
    if (!pagination || !ulPagination) return
  
    // calc totalPages
    const { _page, _limit, _totalRows } = pagination
    const totalPages = Math.ceil(_totalRows / _limit)
  
    // save page and totalPages to ulPagination
    ulPagination.dataset.page = _page
    ulPagination.dataset.totalPages = totalPages
  
    // check if enable/disable prev links
    if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
    else ulPagination.firstElementChild?.classList.remove('disabled')
  
    // check if enable/disable next links
    if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
    else ulPagination.lastElementChild?.classList.remove('disabled')
  }
  
   const initPagination = ({ elementId, defaultParams, onChange }) => {
    // bind click event for prev/next link
    const ulPagination = document.getElementById(elementId)
    if (!ulPagination) return
  
    // set current active page
    // TODO: use default params
  
    // add click event for prev link
    const prevLink = ulPagination.firstElementChild?.firstElementChild
    if (prevLink) {
      prevLink.addEventListener('click', (e) => {
        e.preventDefault()
        const page = Number.parseInt(ulPagination.dataset.page) || 1
        if (page > 2) onChange?.(page - 1)
      })
    }
  
    // add click event for next link
    const nextLink = ulPagination.lastElementChild?.lastElementChild
    if (nextLink) {
      nextLink.addEventListener('click', (e) => {
        e.preventDefault()
        const page = Number.parseInt(ulPagination.dataset.page) || 1
        const totalPages = ulPagination.dataset.totalPages
        if (page < totalPages) onChange?.(page + 1)
      })
    }
  }  

async function handleFilterChange(filterName, filterValue) {
    try {
      // update query params
      const url = new URL(window.location)
      if (filterName) url.searchParams.set(filterName, filterValue)
  
      // reset page if needed
      if (filterName === 'title_like') url.searchParams.set('_page', 1)
      history.pushState({}, '', url)
  
      const { data, pagination } = await postApi.getAll(url.searchParams)
      renderProductList('productList', data)
      renderPagination('pagination', pagination)
    } catch (error) {
      console.log('failed to fetch post list', error)
    }
  }

const renderProductList = async (idElement,productList) => {
    // if(!Array.isArray(productList) || productList.length === 0) return;

    const divElement = document.getElementById(idElement);
    // console.log(divElement);
    let htmlString = '';
    productList.forEach((product) => {
        htmlString += `
        <div class="col-md-3 col-sm-6">
            <div class="single-shop-product box-shadow">
                <div class="product-upper">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <h2><a href="./single-product.html?id=${product.id}">${product.title}</a></h2>
                <div class="product-carousel-price">
                    <ins>$${product.price}</ins>
                </div>
                <div class="product-category">Category: ${product.category}</div>
                <div class="product-option-shop">
                    <a class="add_to_cart_button" data-quantity="${product.stock}" data-product_sku="" data-product_id="${product.id}"
                        rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                </div>
            </div>
        </div>
        `;
    })
    // console.log(htmlString);
    divElement.innerHTML = htmlString;

}

const renderCategoryList = (idElement, categoryList) => {
    if(!Array.isArray(categoryList) || categoryList.length === 0) return;

    const divElement = document.getElementById(idElement);
    // console.log(divElement);
    let htmlString = '';
    categoryList.forEach((category) => {
        htmlString += `
        <li data-id="${category.id}" ><a href="#" >${category.categoryName}</a></li>
        `;
    })
    // console.log(htmlString);
    divElement.innerHTML = htmlString;
}

const filterByCategory = () => {
    const categoryList = document.querySelectorAll('#categoryList > li');
    console.log(categoryList);

    [...categoryList].forEach((category) => {
        category.addEventListener('click', async ()=> {
        const url = new URL(window.location);
        const categoryId = category.getAttribute('data-id');
        // console.log(categoryId);
        url.searchParams.set('categoryId', categoryId);
        window.history.pushState({}, '', url);
        const queryParams = url.searchParams;
        const data = await productsApi.getAll(queryParams);

        if (data.length === 0) {
            url.searchParams.set('_page', 1)
        }

        renderProductList('productList',data);
        })
    })
}   

const filterBySort = () => {
    const sortByList = document.querySelectorAll('#sortList > li');
    console.log(sortByList);

    [...sortByList].forEach((category) => {
        category.addEventListener('click', async ()=> {
        const url = new URL(window.location);
        const order = category.getAttribute('data-order');
        // console.log(categoryId);
        url.searchParams.set('_sort', 'price');
        url.searchParams.set('_order', order);
        window.history.pushState({}, '', url);
        const queryParams = url.searchParams;
        const data = await productsApi.getAll(queryParams);

        if (data.length === 0) {
            url.searchParams.set('_page', 1)
        }

        renderProductList('productList',data);
        })
    })
}

const filterBySearch = () => {
    try {
        // update query params
        const url = new URL(window.location)
        // if (filterName) url.searchParams.set(filterName, filterValue)
        // reset page if needed
        // if (filterName === 'title_like') url.searchParams.set('_page', 1)

        history.pushState({}, '', url)
        
        const searchBtn = document.getElementById('searchBtn');
        console.log(searchBtn);
        searchBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const searchValue = document.getElementById('searchInput').value;
            url.searchParams.set('title_like', searchValue);
            window.history.pushState({}, '', url);
            const data  = await productsApi.getAll(url.searchParams);
            console.log(data);
            renderProductList('productList', data);
        })

        // renderPagination('pagination', pagination)
      } catch (error) {
        console.log('failed to fetch post list', error)
      }
}


(async ()=> {
    try {
        const url = new URL(window.location);
    
        // update search params if needed
        if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
        if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 12);
    
        // url.searchParams.set(filiterName, filterValue);
        const queryParams = url.searchParams;
        history.pushState({}, '', url);
    
    
        // set default pagination (_page, _limit) on URL
    
        // render post list based URL params
        // const queryParams = new URLSearchParams(window.location.search);
        const productList = await productsApi.getAll(queryParams);
        const categoryList = await categoriesApi.getAll();
        renderProductList('productList', productList);
        renderCategoryList('categoryList', categoryList);
        filterByCategory();
        filterBySearch();
        filterBySort();
        // initSearch({
        //     elementId: 'searchInput',
        //     defaultParams: queryParams,
        //     onChange: (value) => handleFilterChange('title_like', value),
        //   })

      } catch (error) {
        console.log('error', error.response);
      }
})()

