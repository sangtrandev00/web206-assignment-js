import orderDetailApi from "../../api/orderDetailApi.js";


const renderOrderDetailList = (idElement, orderDetailList) => {
    if(!Array.isArray(orderDetailList) || orderDetailList.length === 0) return;
   const tbodyElement = document.getElementById(idElement);
   let htmlString = '';
   let sumTotal = 0;
    orderDetailList.forEach(orderDetail => {
        sumTotal  += orderDetail.unitPrice * orderDetail.quantity;
        htmlString+= `
        <tr class="">
            <td scope="row">${orderDetail.id}</td>
            <td>${orderDetail.orderId}</td>
            <td>${orderDetail.productId}</td>
            <td>${orderDetail.quantity}</td>
            <td>${orderDetail.unitPrice}</td>
            <td>$${orderDetail.unitPrice * orderDetail.quantity}</td>
        </tr>
        `;
    })
    document.querySelector('.total-element').innerText = '$'+sumTotal;
    tbodyElement.innerHTML = htmlString;
}


(async () => {
    try {
        const params = new URLSearchParams(window.location.search);
    
        // update search params if needed
    
        // url.searchParams.set(filiterName, filterValue);
        const id = params.get('id');
        // history.pushState({}, '', url);
    
        // set default pagination (_page, _limit) on URL
    
        // render post list based URL params
        // const queryParams = new URLSearchParams(window.location.search);
        const data = await orderDetailApi.getByOrderId(id);
        console.log(data);
        renderOrderDetailList('orderDetailList', data);
      } catch (error) {
        console.log('error', error.response);
      }
})()

