import productsApi from "../../api/productsApi";

console.log("hello from single product");
function setTextContent(parent, selector, text) {
    if (!parent) return
  
    const element = parent.querySelector(selector)
    if (element) element.textContent = text
}

const renderProductDetail = (product) => {
    if(!product) return;
    console.log(product);
    setTextContent(document,'#breadcrumbCategoryName', product.category);
    setTextContent(document,'#breadcrumbProductName', product.title);
    setTextContent(document,'.product-name', product.title);
    setTextContent(document,'.product-inner-price > ins', "$"+product.price);
    setTextContent(document,'.product-inner-category > p > a', product.category);
    setTextContent(document,'.product-stock-available span', product.stock);
    setTextContent(document,'.productDescription', product.description);
    setTextContent(document,'.product-brand span', product.brand);

    const thumbnail = document.querySelector('.product-main-img > img');
    console.log(thumbnail);
    if(!thumbnail) return;
    thumbnail.setAttribute('src',product.thumbnail);

    const productGalery = document.querySelector('.product-gallery');
    if(!productGalery) return;
    const imageProductList = product.images;
    let imgHtmlString = '';
    imageProductList.forEach((img,index) => {
        imgHtmlString+= `<img src="${img}" />`
    })
    productGalery.innerHTML = imgHtmlString;

}

const addToCart = () => {
  // Data of cart

  const addToCartBtn = document.querySelector('.add_to_cart_button');
  if(!addToCartBtn) return;
  addToCartBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem('cart'));
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productName = document.querySelector('.product-name').textContent;
    const price = document.querySelector(".product-carousel-price > ins").textContent;
    const quantity = Number(document.querySelector('.quantity > input[type="number"]').value);
    const imgElement = document.querySelector('.product-main-img > img');
    const imgUrl = imgElement.getAttribute('src');

    const order = {
      productId: productId,
      productName: productName,
      price: price,
      quantity: quantity,
      imageUrl: imgUrl
    }

    if(!cart) {
      cart = [];
      cart.push(order);
    }else {
      const productInCart = cart.find(item => item.productId === productId);
      if(productInCart) {
        productInCart.quantity += quantity;
      }else {
        cart.push(order);
      }
    }

  // Save cart again to local Storage with new value
  localStorage.setItem('cart', JSON.stringify(cart));
    alert("Add to cart successfully!");
  })

}


(async ()=> {

    try {
        const searchParams = new URLSearchParams(window.location.search)
        const productId = searchParams.get('id')
        if (!productId) {
          console.log('Product Not found')
          return
        }
    
        const product = await productsApi.getById(productId);
        renderProductDetail(product)

        // Add to cart =))
        addToCart();
      } catch (error) {
        console.log('failed to fetch post detail', error)
      }

})()