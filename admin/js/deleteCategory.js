import productsApi from "../../api/productsApi.js";

// const deleteCategory =  () => {
//     const saveBtn = document.getElementById('save');
//     if(!saveBtn) return;
//     saveBtn.addEventListener('click',async (e) =>{
//         e.preventDefault();
//         const categoryId = document.getElementById('categoryId');
//         const categoryName = document.getElementById('categoryName');
//         // console.log('categoryId', categoryId.value);
//         console.log('categoryName', categoryName.value);
//         const newCategory = {
//             id: categoryId.value,
//             categoryName: categoryName.value
//         }
//         console.log('newCategory',newCategory);

//         const res  = await productsApi.update(newCategory);
//         console.log(res);
//         if(res) alert('category updated successfully');
//         setTimeout(() => {
//             location.href = "categories.html";
//         })
//     })
// }



(async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if(id) {
            const res = await productsApi.remove(id);
            console.log(res);
            window.location.assign('products.html');
        }
      } catch (error) {
        console.log('error', error.response);
      }
})();
