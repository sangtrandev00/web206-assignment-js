import productsApi from "../api/productsApi.js";

console.log("hello from shoppage");


const renderProductList = async (idElement,productList) => {
    if(!Array.isArray(productList) || productList.length === 0) return;

    const divElement = document.getElementById(idElement);
    console.log(divElement);
    let htmlString = '';
    productList.forEach((product) => {
        htmlString += `
        <div class="col-md-3 col-sm-6">
            <div class="single-shop-product">
                <div class="product-upper">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <h2><a href="">${product.title}</a></h2>
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
    console.log(htmlString);
    divElement.innerHTML = htmlString;

}

// renderProductList();

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
        const data = await productsApi.getAll(queryParams);
        console.log(data);
        await renderProductList('productList', data);
      } catch (error) {
        console.log('error', error.response);
      }
})()