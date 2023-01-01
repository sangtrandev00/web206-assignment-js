import ordersApi from "../../api/ordersApi.js";


const renderOrderList = (idElement, orderList) => {
    if(!Array.isArray(orderList) || orderList.length === 0) return;
   const tbodyElement = document.getElementById(idElement);
   let htmlString = '';
    orderList.forEach(order => {
        htmlString+= `
        <tr class="">
            <td scope="row"><a href="orderDetail.html?id=${order.id}">${order.id}</a></td>
            <td>${order.customerName}</td>
            <td>${order.customerEmail}</td>
            <td>${order.customerPhone}</td>
            <td>${order.createDate}</td>
            <td>${order.status}</td>
            <td>
                <a href="orderDetail.html?id=${order.id}" class="btn btn-success">View Detail</a>
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
        const data = await ordersApi.getAll(queryParams);
        console.log(data);
        renderOrderList('orderList', data);
      } catch (error) {
        console.log('error', error.response);
      }
})()

