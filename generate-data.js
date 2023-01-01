// const {faker} = require ('@faker-js/faker');

const {faker } = require('@faker-js/faker/locale/vi');

// Thu vien cua node js
const fs = require('fs');
// import { faker } from '@faker-js/faker/locale/de';
// sets locale to vietnamese
// faker.locale = 'vi';

// Random data

console.log(faker.commerce.department());
console.log(faker.commerce.productName());
// console.log(faker.commerce.productName());
console.log(faker.commerce.productDescription());
// console.log(faker.commerce.department());
// console.log(faker.random.uuid());
console.log(faker.commerce.productAdjective());
console.log(faker.image.imageUrl());
console.log(faker.commerce.productMaterial());


const randomCategoryList = (n) => {
    if(n <= 0) return [];
    const categoryList = [];

    // Loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createAt: Date.now(),
            updatedAt: Date.now()
        }

        categoryList.push(category);
    })

    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts <= 0) return [];
    const productList = [];

    // random data
    for(const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(()=> {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.color.human(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400,400)
            };

            productList.push(product);
        })
    }

    return productList;
}

const randomOrderList = (n) => {
    if(n <= 0) return [];
    const orderList = [];

    // Code random order
    Array.from(new Array(n)).forEach(()=> {
        const order = {
            id: faker.datatype.uuid(),
            customerName: faker.name.fullName(),
            customerEmail: faker.internet.email(),
            customerPhone: faker.phone.number('+84#########'),
            createDate: faker.date.recent(),
            status: "Thành công",
        }
        orderList.push(order);
    })


    return orderList;
}

const randomOrderDetailList = (orderList,numberOfOrder, numberOfProducts) => {
    if(numberOfOrder == 0 || numberOfProducts == 0) return [];
    const orderDetailList = [];

    for(const order of orderList) {
        Array.from(new Array(numberOfOrder)).forEach(()=> {
            const orderDetail = {
                id: faker.datatype.uuid(),
                orderId: order.id,
                productId: faker.datatype.number({min: 1, max: numberOfProducts}),
                quantity: faker.datatype.number({min: 1, max: 20}),
                unitPrice: faker.commerce.price(100000,20000000),
            };
            orderDetailList.push(orderDetail);
        })
    }
    return orderDetailList;
}

(()=> {

    // random data
    // const categoryList = randomCategoryList(4);

    // const productList = randomProductList(categoryList,5); // 20 products

    const orderList = randomOrderList(5);
    const orderDetailList = randomOrderDetailList(orderList,4,20);
    // prepare db object
    const db = {
        // categories: categoryList,
        // products: productList,
        orders: orderList,
        orderDetail: orderDetailList,
        profile: {
            name: "Sang Tran Dev",
        }
    }

    // Write db object to db.json
    fs.writeFileSync('db-order.json',JSON.stringify(db), ()=> {
        console.log("Write data successfully");
    })

})()