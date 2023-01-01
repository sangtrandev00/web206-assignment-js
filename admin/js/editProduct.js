import productsApi from "../../api/productsApi.js";
import categoriesApi from "../../api/categoriesApi.js";

const editProduct =  () => {
    const saveBtn = document.getElementById('save');
    if(!saveBtn) return;
    saveBtn.addEventListener('click',async (e) =>{
        e.preventDefault();
        const ProductId = document.getElementById('ProductId');
        const ProductName = document.getElementById('ProductName');
        const Price = document.getElementById('Price');
        const Discount = document.getElementById('Discount');
        const Rating = document.getElementById('Rating');
        const Stock = document.getElementById('Stock');
        const Brand = document.getElementById('Brand');
        const Category = document.getElementById('Category');
        const Description = document.getElementById('Description');
        // console.log('ProductId', ProductId.value);

        const newProduct = {
            id: ProductId.value,
            title: ProductName.value,
            description: Description.value,
            price: Price.value,
            discountPercentage: Discount.value,
            rating: Rating.value,
            stock: Stock.value,
            brand: Brand.value,
            category: Category.selected,
            categoryId: Category.value,
            thumbnail: '',
            images: [],
        }

        console.log('newProduct',newProduct);

        // const res  = await productsApi.update(newProduct);
        // console.log(res);
        // if(res) alert('category updated successfully');
        // setTimeout(() => {
        //     location.href = "categories.html";
        // })
    })
}

const initUploadImage = (name, className) => {
    const uploadImage = document.querySelector(`[name="${name}"]`)
    if (!uploadImage) return
  
    uploadImage.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        document.querySelector(className).src = imageUrl;
    }
    })
  }



(async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        console.log(id);
        if(id) {
            const product = await productsApi.getById(id);
            const ProductIdElement = document.getElementById('ProductId');
            ProductIdElement.value = id;
            // Get product by id
            const ProductNameElement = document.getElementById('ProductName');
            ProductNameElement.value = product.title;
           
            const PriceElement = document.getElementById('Price');
            PriceElement.value = product.price;

            const Discount = document.getElementById('Discount');
            Discount.value = product.discountPercentage;

            const Rating = document.getElementById('Rating');
            Rating.value = product.rating;

            const Stock = document.getElementById('Stock');
            Stock.value = product.stock;

            const Brand = document.getElementById('Brand');
            Brand.value = product.brand;

            const Category = document.getElementById('Category');
            Category.value = product.category;
            const CategoryList = await categoriesApi.getAll();
            let htmlString = '';
            CategoryList.forEach((category) => {
                htmlString+= `
                <option value="${category.id}">${category.id} - ${category.categoryName}</option>
            `;
            })
            Category.innerHTML = htmlString;
            
            const image1 = document.querySelector('.image-1');
            const image2 = document.querySelector('.image-2');
            const image3 = document.querySelector('.image-3');
            const image4 = document.querySelector('.image-4');
            const image5 = document.querySelector('.image-5');

            image1.src = product.images[0];
            image2.src = product.images[1];
            image3.src = product.images[2];
            image4.src = product.images[3];
            image5.src = product.images[4];

            initUploadImage('Image1','.image-1');
            initUploadImage('Image2','.image-2');
            initUploadImage('Image3','.image-3');
            initUploadImage('Image4','.image-4');
            initUploadImage('Image5','.image-5');
        }
   

        editProduct();
      } catch (error) {
        console.log('error', error.response);
      }
})();
