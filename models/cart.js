module.exports = function Cart(oldCart){
    this.items = oldCart.items || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (itemId, item)=>{
        if(this.items.filter(item=>item.id==itemId).length>0){
            this.items.filter(item=>item.id==itemId)[0].quantity += 1;
        }else{
            this.items.push({
                id: itemId, 
                quantity: 1, 
                item: item
            })
        }
        this.totalQuantity++
        this.totalPrice += item.price;
    }

    this.remove = (itemId)=>{
        let product = this.items.filter(e=>e.id==itemId)[0]
        product.quantity -= 1;
        this.totalPrice -= product.item.price;
        if(this.items.filter(e=>e.id==itemId)[0].quantity<=0){
            this.items = this.items.filter(e=>e.id!=itemId)
        }
        this.totalQuantity--;
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
