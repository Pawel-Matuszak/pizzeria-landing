const stripe = Stripe("pk_test_51IUg4sCkpfPwEngw14VBG2IJGC1PbCWYUSK2qtkEjRwtvqAU7TsVc1PIRXY3xKnBp5QIuBMWMvoed5il3W3REmQ700bOScLaDf");
const elements = stripe.elements();

var style = {
    base: {
      color: "#32325d",
    }
  };
  
var card = elements.create("card", { style: style });
card.mount("#card-element");