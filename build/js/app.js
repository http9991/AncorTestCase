$(document).ready(function(){
  var priceArr = [];
  $('.addButton').on('click', function(){
    var productName = $('#productName').val().trim();
    var productPrice = +($('#productPrice').val());
    if(+(Math.floor(productPrice * 100) / 100).toFixed(2) !== +productPrice){
      alert('Неправильный формат цены!');
      return;
    }
    $('#productName').val('');
    $('#productPrice').val('');
    if(productName !== '' && isNumeric(productPrice) && productPrice !== 0){
      addProduct(productName, productPrice);
    }
    else{
      alert('Неправильный формат добавления товара!');
    }
  });
  $('.applyButton').on('click', function(){
    var off = $('#off').val();
    if(off !== 0 && isNumeric(off) && off > 0 && (off % 1 === 0)){
      calculateOff(off);
    }
    else{
      alert('Неправильный формат скидки!');
    }
  });
  function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function addProduct(productName, productPrice){
    if(productPrice < 0){
      alert('Цена меньше нуля!');
      return;
    }
    if(productPrice === Math.floor(productPrice)){
      productPrice = Math.floor(productPrice);
    }
    $('.productTable > tbody:last-child').append('<tr><td>' + productName + '</td><td class="fullPrice">' + productPrice + '</td><td></td></tr>');
    priceArr.push(productPrice);
    var off = $('#off').val();
    calculateOff(off);
  }
  function calculateOff(off){
    if(!priceArr[0]){
      alert('Нечего считать! нет товаров в корзине');
      return;
    }
    var totalPrice = priceArr.reduce(function(sum, current) {
      return sum + current;
    });

    if (totalPrice < off) {
      alert('Скидка больше цены!');
      return;
    }
    var dynamicSale = 0;
    var biggestPrice = {
      price: 0,
    };
    $('.fullPrice').each(function(){
      var currentPrice = +(this.innerHTML);
      if(biggestPrice.price <= currentPrice){
        biggestPrice.price = currentPrice;
        biggestPrice.element = this;
      }
      var currentSale = (currentPrice / totalPrice) * off;
      var currentSaleTwoPoints = +(Math.floor(currentSale * 100) / 100).toFixed(2);
        dynamicSale += currentSale - currentSaleTwoPoints;
        var result = currentPrice - currentSaleTwoPoints;
        this.nextSibling.innerHTML = +(Math.floor(result * 100) / 100).toFixed(2);
    });
    if(dynamicSale !== 0){
      var saleRemains = +(biggestPrice.element.nextSibling.innerHTML) - (+(dynamicSale).toFixed(2));
      biggestPrice.element.nextSibling.innerHTML = +(Math.floor(saleRemains * 100) / 100).toFixed(2);
    }
  }
});

