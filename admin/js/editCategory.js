import categoriesApi from "../../api/categoriesApi.js";

const editCategory =  () => {
    const saveBtn = document.getElementById('save');
    if(!saveBtn) return;
    saveBtn.addEventListener('click',async (e) =>{
        e.preventDefault();
        const categoryId = document.getElementById('categoryId');
        const categoryName = document.getElementById('categoryName');
        // console.log('categoryId', categoryId.value);
        console.log('categoryName', categoryName.value);
        const newCategory = {
            id: categoryId.value,
            categoryName: categoryName.value
        }
        console.log('newCategory',newCategory);

        const res  = await categoriesApi.update(newCategory);
        console.log(res);
        if(res) alert('category updated successfully');
        setTimeout(() => {
            location.href = "categories.html";
        })
    })
}



(async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const category = await categoriesApi.getById(id);
        const categoryIdElement = document.getElementById('categoryId');
        categoryIdElement.value = id;
        // Get category by id
        const categoryNameElement = document.getElementById('categoryName');
        categoryNameElement.value = category.categoryName;
        console.log(categoryNameElement);

        editCategory();
      } catch (error) {
        console.log('error', error.response);
      }
})();
