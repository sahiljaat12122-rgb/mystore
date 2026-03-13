// script.js ke top mein yeh add karein
let products = JSON.parse(localStorage.getItem('products')) || sampleProducts;

// loadProducts() function update karein
function loadProducts() {
    products = JSON.parse(localStorage.getItem('products')) || sampleProducts;
    displayProducts(products);
}
       

