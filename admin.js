// Admin Panel JavaScript
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// DOM Elements
const totalProductsEl = document.getElementById('totalProducts');
const totalOrdersEl = document.getElementById('totalOrders');
const totalRevenueEl = document.getElementById('totalRevenue');
const productsTableBody = document.getElementById('productsTableBody');
const addProductModal = document.getElementById('addProductModal');
const productForm = document.getElementById('productForm');

// Initialize Admin
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadProductsTable();
    setupNavigation();
    setupProductForm();
});

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class
            document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            
            // Add active class
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Load Dashboard Stats
function loadDashboardStats() {
    totalProductsEl.textContent = products.length;
    totalOrdersEl.textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    totalRevenueEl.textContent = new Intl.NumberFormat('en-IN').format(totalRevenue);
}

// Load Products Table
function loadProductsTable() {
    productsTableBody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
            <td>${product.name}</td>
            <td>₹${product.price.toLocaleString()}</td>
            <td><span class="badge">${product.category}</span></td>
            <td>${product.stock || 10}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

// Add Product Modal
function openAddProductModal() {
    addProductModal.style.display = 'block';
    productForm.reset();
}

function closeAddProductModal() {
    addProductModal.style.display = 'none';
}

// Setup Product Form
function setupProductForm() {
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            price: parseInt(document.getElementById('productPrice').value),
            originalPrice: parseInt(document.getElementById('productOriginalPrice').value) || null,
            image: document.getElementById('productImage').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            stock: parseInt(document.getElementById('productStock').value),
            createdAt: new Date().toISOString()
        };
        
        products.unshift(newProduct); // Add to beginning
        saveProducts();
        loadProductsTable();
        loadDashboardStats();
        closeAddProductModal();
        showNotification('Product added successfully!');
    });
}

// Delete Product
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        saveProducts();
        loadProductsTable();
        loadDashboardStats();
        showNotification('Product deleted successfully!');
    }
}

// Edit Product (Basic)
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productImage').value = product.image;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productStock').value = product.stock || 10;
    
    openAddProductModal();
    // Change form to update mode
    productForm.onsubmit = function(e) {
        e.preventDefault();
        products[index] = {
            ...products[index],
            name: document.getElementById('productName').value,
            price: parseInt(document.getElementById('productPrice').value),
            originalPrice: parseInt(document.getElementById('productOriginalPrice').value) || null,
            image: document.getElementById('productImage').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            stock: parseInt(document.getElementById('productStock').value),
            updatedAt: new Date().toISOString()
        };
        saveProducts();
        loadProductsTable();
        loadDashboardStats();
        closeAddProductModal();
        showNotification('Product updated successfully!');
    };
}

// Save to LocalStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
