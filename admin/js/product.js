import productsApi from "../../api/productsApi.js";


const renderProductList = (idElement, productList) => {
    if(!Array.isArray(productList) || productList.length === 0) return;
   const tbodyElement = document.getElementById(idElement);
   let htmlString = '';
    productList.forEach(product => {
        htmlString+= `
        <tr class="">
            <td scope="row"><a href="productDetail.html">${product.id}</a></td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.discountPercentage}</td>
            <td>${product.price}</td>
            <td>${product.brand}</td>
            <td><img width=100 height=100 style="object-fit: cover" src="${product.thumbnail}"/></td>
            <td width= 200><a class="btn btn-success mx-3" href="./editProduct.html?id=${product.id}">Edit</a><a
                    href="./deleteProduct.html?id=${product.id}" class="btn btn-danger" href="" onclick="return confirm('Are you sure you want to delete this product?')" >Delete</a>
            </td>
        </tr>
        `;
    })
    tbodyElement.innerHTML = htmlString;
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
        const data = await productsApi.getAll(queryParams);
        console.log(data);
        renderProductList('productList', data);
      } catch (error) {
        console.log('error', error.response);
      }
})()

