$(document).ready(function(){
  var priceArr = [];
  $('.addButton').on('click', function(){
    var productName = $('#productName').val().trim();
    var productPrice = +($('#productPrice').val());
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
    if(isNumeric(off) && off !== 0){
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
    $('.productTable > tbody:last-child').append('<tr><td>' + productName + '</td><td class="fullPrice">' + productPrice + '</td><td>' + '?????' + '</td></tr>');
    priceArr.push(productPrice);
    var off = $('#off').val();
    calculateOff(off);
  }
  function calculateOff(off){
    var totalPrice = priceArr.reduce(function(sum, current) {
      return sum + current;
    });
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
      if (currentSale % 1 === 0){
        this.nextSibling.innerHTML = currentPrice - currentSale;
        dynamicSale += currentSale;
      }
      else{
        this.nextSibling.innerHTML = currentPrice - Math.floor(currentSale);
        dynamicSale += Math.floor(currentSale);
      }
    });
    if(+(dynamicSale) !== +(off)){
      biggestPrice.element.nextSibling.innerHTML = +(biggestPrice.element.nextSibling.innerHTML) - (+(off - dynamicSale));
    }
  }
});

