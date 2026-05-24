// export class APIUtils {
//     constructor(apiRequest, loginPayload) {
//         this.apiRequest = apiRequest;
//         this.loginPayload = loginPayload;
//     }

//     async getToken() {
//         const loginResponse = await this.apiRequest.post(
//             'https://rahulshettyacademy.com/api/ecom/auth/login',
//             { data: this.loginPayload }
//         );
//         const loginResponseJson = await loginResponse.json();
//         const tokenNumber = loginResponseJson.token;
//         return tokenNumber;
//     }

//     async createOrder(orderPayload) {
//         const response = {};
//         response.token = await this.getToken();

//         const orderResponse = await this.apiRequest.post(
//             'https://rahulshettyacademy.com/api/ecom/order/create-order',
//             {
//                 data: this.loginPayload,
//                 headers: {
//                     authorization: response.token,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         console.log(orderResponse.status());

//         const createOrderResponseJson = await orderResponse.json();

//         console.log(createOrderResponseJson);
//         const OrderID = createOrderResponseJson.orders[0];
//         response.OrderID = OrderID;
//         return response;
//     }
// }


export class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        if(orderResponse.status() !== 201){

   throw new Error(
    JSON.stringify(orderResponseJson)
   );
}
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
 

