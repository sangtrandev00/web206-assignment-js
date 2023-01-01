
// CRUD cart list here!!!

// haven't checkout --> pending order in status
// have checkouted --> completed order in status



const renderCartList = () => {
    const cartListElement = document.getElementById('cartList');
    if(!cartListElement) return;

    let cartHtmlString = '';
    const cartList = JSON.parse(localStorage.getItem('cart'));
    cartList.forEach((cart,index) => {
        cartHtmlString+= `
        <tr class="cart_item" data-id="${cart.productId}">
            <td class="product-remove">
                <a title="Remove this item" class="remove" href="cart.html?idcart=${index}">×</a>
            </td>

            <td class="product-thumbnail">
                <a href="single-product.html"><img width="145" height="145"
                        alt="poster_1_up" class="shop_thumbnail"
                        src="${cart.imageUrl}"></a>
            </td>

            <td class="product-name">
                <a href="single-product.html">${cart.productName}</a>
            </td>

            <td class="product-price">
                <span class="amount">${cart.price}</span>
            </td>

            <td class="product-quantity">
                <div class="quantity buttons_added">
                    <input type="button" class="minus" onclick="plusQuantity(-1)" value="-">
                    <input type="number" size="1" class="input-text qty text"
                        title="Qty" value="${cart.quantity}" min="0" step="1">
                    <input type="button" class="plus" onclick="plusQuantity(+1)" value="+">
                </div>
            </td>

            <td class="product-subtotal">
                <span class="amount">$${Number(cart.price.substring(1)) * cart.quantity}</span>
            </td>
        </tr>
        `;
    })
    // cartListElement.prepend(cartHtmlString);
    cartListElement.innerHTML = cartHtmlString;
    
    let subTotalAll = 0;
    const totalRowElementList = document.querySelectorAll('.product-subtotal .amount');
    [...totalRowElementList].forEach(totalRow => {
        subTotalAll += Number(totalRow.innerText.substring(1));
    })

    const cartSubTotal = document.querySelector('.cart-subtotal .amount');
    cartSubTotal.innerText = "$" + subTotalAll;

    const orderTotal = document.querySelector('.order-total .amount');
    orderTotal.innerText = "$" + subTotalAll + 0;
}

const removeCartItem = () => {
    const removeBtnList = document.querySelectorAll('.remove');
    console.log(removeBtnList);

    const cart = JSON.parse(localStorage.getItem('cart'));
    if(!removeBtnList) return;
    removeBtnList.forEach((removeBtn) => {
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const rowItem = e.target.parentElement.parentElement;
            const cartList = document.querySelectorAll('.cart_item');
            const removeIdx = [...cartList].findIndex((cartItem) => cartItem.getAttribute('data-id') == rowItem.getAttribute('data-id'));
            // console.log('removeIdx',removeIdx);
            cart.splice(removeIdx, 1);
            rowItem.remove();
            localStorage.setItem('cart', JSON.stringify(cart));
        })
    });

}

const updateCartList = () => {
    
}

(()=> {
    renderCartList();
    removeCartItem();
})()