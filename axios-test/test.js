const axios = require("axios").default
// api 1 : /auth/login 
// not need login 
axios.post("http://10.2.1.183:7006/auth/login",{
    username: "dev",
    password: "dev"
},{
    headers:{
        'Content-Type':"application/x-www-form-urlencoded"
    }
}).then((suc) =>{
    console.log(suc.data);
})

// api 2: /commodity/allShoppingCommodityList
// not need login 
axios.get("http://10.2.1.183:7006/commodity/allShoppingCommodityList")
     .then(suc => console.log(suc.data))
     .catch((e) => {console.log(typeof e);})


// api 3: /commodity/promotedShoppingCommodityList
// need login 401
axios.get("http://10.2.1.183:7006/commodity/promotedShoppingCommodityList")
     .then(suc => console.log(suc.data ))
     .catch((e) => {console.log("promoted error ");})


//api 4: user/info
// need login 401
axios.get("http://10.2.1.183:7006/user/info")
     .then(suc => console.log(suc.data))
     .catch((e) => console.log("info error", e))

//api 5: user/shopping/car/{}/{}     
// need login 401
// http://test-service.ecommerce.perficient.com:7006/user/shopping/cart/{commodityID}/{commodityCount}

axios.post("http://10.2.1.183:7006/user/shopping/cart/4/2}", null, {
    headers:{ 'Content-Type':"application/x-www-form-urlencoded"
    }
}).then((suc) =>{
    console.log(suc.data);
}).catch((e) =>{
    console.log("shopping cart error", e);
})


