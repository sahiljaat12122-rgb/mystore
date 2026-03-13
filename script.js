// Global variables
let cart = [];
let products = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');

// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 79999,
        originalPrice: 99999,
        image: "https://images.unsplash.com/photo-1695906326190-1b309a4fbed4?w=300&h=250&fit=crop",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 69999,
        originalPrice: 84999,
        image: "https://images.unsplash.com/photo-1689363302902-2c58330d6494?w=300&h=250&fit=crop",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Nike Air Max",
        price: 8999,
        originalPrice: 12999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=250&fit=crop",
        category: "Fashion"
    },
    {
        id: 4,
        name: "Apple Watch Series 9",
        price: 39999,
        originalPrice: 45999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=250&fit=crop",
        category: "Electronics"
    },
    {
        id: 5,
        name: "Levis Jeans",
        price: 2999,
        originalPrice: 4499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=250&fit=crop",
        category: "Fashion"
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 24999,
        originalPrice: 29999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop",
        category: "Electronics"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
});

// Load and display products
function loadProducts() {
    products = sampleProducts;
    displayProducts(products);
}

function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                    <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Product added to cart!');
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Open cart modal
function openCart() {
    displayCartItems();
    cartModal.style.display = 'block';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Display cart items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString()} x ${item.quantity}</p>
                <p><strong>₹${(item.price * item.quantity).toLocaleString()}</strong></p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                Remove
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    displayCartItems();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: ₹${total.toLocaleString()}\nOrder placed successfully!`);
    cart = [];
    updateCartUI();
    closeCartModal();
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
       
