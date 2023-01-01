import productsApi from "../../api/productsApi.js";

const addProduct =  () => {
    const saveBtn = document.getElementById('save');
    if(!saveBtn) return;
    saveBtn.addEventListener('click',async (e) =>{
        e.preventDefault();
        // const categoryId = document.getElementById('categoryId');
        const categoryName = document.getElementById('categoryName');
        // console.log('categoryId', categoryId.value);
        console.log('categoryName', categoryName.value);
        const newCategory = {
            categoryName: categoryName.value
        }
        console.log('newCategory',newCategory);

        const res  = await productsApi.add(newCategory);
        console.log(res);
        if(res) alert('category add successfully');
        setTimeout(() => {
            location.href = "categories.html";
        })
    })
}



(async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if(id) {
            const category = await categoriesApi.getById(id);
            const categoryIdElement = document.getElementById('categoryId');
            categoryIdElement.value = id;
            const categoryNameElement = document.getElementById('categoryName');
            categoryNameElement.value = category.categoryName;
            console.log(categoryNameElement);
        }

        addProduct();
      } catch (error) {
        console.log('error', error.response);
      }
})();
