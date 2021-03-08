module.exports = function Cart(oldCart){
    this.items = oldCart.items || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (itemId, price)=>{
        if(this.items.filter(item=>item.id==itemId).length>0){
            this.items.filter(item=>item.id==itemId)[0].quantity += 1;
        }else{
            this.items.push({
                id: itemId, 
                quantity: 1, 
                price: price
            })
        }
        this.totalQuantity++
        this.totalPrice += price;
    }

    this.getArray = (items)=>{
        const arrayOfIds = [];
        items.forEach(item => {
            arrayOfIds.push(item.id);
        });
        return arrayOfIds;
    }
}

// const cart = new Cart([{id:5, quantity: 2, price: 100}]);
// cart.add(1, 10)
// cart.add(1, 10)
// cart.add(1, 10)
// cart.add(1, 15)
// cart.add(3, 33)
// console.log(cart.items);
// console.log(cart.totalQuantity);
// console.log(cart.totalPrice);
// console.log(cart.getArray(cart.items));
