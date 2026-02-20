// ============================================
// TECHSTYLE ULTRA - ADVANCED E-COMMERCE APP
// ============================================

// === PRODUCT DATA WITH RATINGS ===
const products = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        price: 129.99,
        originalPrice: 179.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        description: "Premium sound quality with noise cancellation",
        rating: 4.8,
        reviews: 245,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Smart Watch Ultra",
        price: 299.99,
        originalPrice: 399.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        description: "Track your fitness goals with precision",
        rating: 4.7,
        reviews: 189,
        badge: "Hot Deal"
    },
    {
        id: 3,
        name: "Premium Leather Backpack",
        price: 89.99,
        originalPrice: 129.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        description: "Stylish and functional for everyday use",
        rating: 4.6,
        reviews: 156
    },
    {
        id: 4,
        name: "Running Shoes Elite",
        price: 119.99,
        originalPrice: 159.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        description: "Comfort meets performance in every step",
        rating: 4.9,
        reviews: 312
    },
    {
        id: 5,
        name: "Smart Coffee Maker",
        price: 79.99,
        originalPrice: 119.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
        description: "Start your day right with automation",
        rating: 4.5,
        reviews: 98
    },
    {
        id: 6,
        name: "Designer Sunglasses",
        price: 159.99,
        originalPrice: 249.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        description: "UV protection with timeless style",
        rating: 4.7,
        reviews: 201
    },
    {
        id: 7,
        name: "Premium Yoga Mat",
        price: 39.99,
        originalPrice: 59.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
        description: "Non-slip surface for safety",
        rating: 4.6,
        reviews: 134
    },
    {
        id: 8,
        name: "Modern Table Lamp",
        price: 64.99,
        originalPrice: 99.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        description: "Minimalist design for any space",
        rating: 4.4,
        reviews: 87
    },
    {
        id: 9,
        name: "Bluetooth Speaker Max",
        price: 99.99,
        originalPrice: 149.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        description: "360° sound experience",
        rating: 4.8,
        reviews: 276,
        badge: "Top Rated"
    },
    {
        id: 10,
        name: "Luxury Designer Handbag",
        price: 249.99,
        originalPrice: 399.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
        description: "Statement piece for luxury lovers",
        rating: 4.9,
        reviews: 223
    },
    {
        id: 11,
        name: "Dumbbell Set Pro",
        price: 149.99,
        originalPrice: 199.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400",
        description: "Build strength at home",
        rating: 4.7,
        reviews: 167
    },
    {
        id: 12,
        name: "Modern Wall Art Collection",
        price: 54.99,
        originalPrice: 89.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1582561833453-e3293d0c216a?w=400",
        description: "Transform your space",
        rating: 4.5,
        reviews: 112
    }
];

let cart = [];
let currentCategory = "all";
let currentSort = "featured";
let favorites = [];

// === DOM ELEMENTS ===
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const cartCount = document.getElementById("cartCount");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const navSearchInput = document.getElementById("navSearchInput");
const sortSelect = document.getElementById("sortSelect");
const noResults = document.getElementById("noResults");
const dealsGrid = document.getElementById("dealsGrid");

// === MOBILE MENU TOGGLE ===
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// === DISPLAY PRODUCTS WITH ENHANCED UI ===
function displayProducts(productsToShow) {
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = "";
        noResults.style.display = "flex";
        return;
    }

    noResults.style.display = "none";

    productsGrid.innerHTML = productsToShow
        .map((product, index) => {
            const discount = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            const isFavorite = favorites.includes(product.id);

            return `
                <div class="product-card" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                        ${discount > 0 ? `<span class="product-badge" style="bottom: 12px; background: linear-gradient(135deg, #ef4444, #f97316);">-${discount}%</span>` : ""}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-rating">
                            ${Array(5).fill().map((_, i) => 
                                `<i class="fas fa-star" style="opacity: ${i < Math.floor(product.rating) ? 1 : 0.3}"></i>`
                            ).join("")}
                            <span style="margin-left: 0.5rem; color: var(--text-light); font-size: 0.9rem;">(${product.reviews})</span>
                        </div>
                        <div class="product-footer">
                            <div>
                                <div class="product-price">$${product.price.toFixed(2)}</div>
                                ${product.originalPrice > product.price ? `<div style="text-decoration: line-through; color: var(--text-light); font-size: 0.9rem;">$${product.originalPrice.toFixed(2)}</div>` : ""}
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                                <i class="fas fa-shopping-bag"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
}

// === FILTER BY CATEGORY ===
function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    filterAndDisplayProducts();
}

// === SORT PRODUCTS ===
function sortProducts(sortType) {
    currentSort = sortType;
    filterAndDisplayProducts();
}

// === FILTER AND DISPLAY ===
function filterAndDisplayProducts() {
    let filtered = products;

    // Filter by category
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    // Sort
    switch (currentSort) {
        case "price-low":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filtered.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case "newest":
            filtered.reverse();
            break;
    }

    displayProducts(filtered);
}

// === SEARCH PRODUCTS ===
function searchProducts() {
    filterAndDisplayProducts();
}

searchInput.addEventListener("input", () => {
    filterAndDisplayProducts();
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchProducts();
});

navSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchInput.value = navSearchInput.value;
        filterAndDisplayProducts();
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    }
});

// === CART MANAGEMENT ===
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(`${product.name} added to cart!`, "success");
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartItems = document.getElementById("cartItems");
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem 2rem; color: var(--text-light);">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; opacity: 0.3; display: block; margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart
            .map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `)
            .join("");
    }

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
    document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    cartModal.classList.toggle("active");
}

cartIcon.addEventListener("click", toggleCart);

cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        toggleCart();
    }
});

function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }

    const total = (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 
                   (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) > 50 ? 0 : 5.99)).toFixed(2);

    showToast(`✓ Order placed! Total: $${total}`, "success");
    cart = [];
    updateCart();
    toggleCart();
}

// === FLASH DEALS ===
function displayFlashDeals() {
    const deals = products.filter(p => p.originalPrice > p.price).slice(0, 6);
    dealsGrid.innerHTML = deals.map(product => `
        <div class="deal-card" style="animation: fadeInUp 0.5s ease ${deals.indexOf(product) * 0.1}s both">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span class="product-badge">Flash Deal</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${Array(5).fill().map((_, i) => 
                        `<i class="fas fa-star" style="opacity: ${i < Math.floor(product.rating) ? 1 : 0.3}; font-size: 0.8rem;"></i>`
                    ).join("")}
                </div>
                <div style="margin: 1rem 0; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.5rem; color: white; font-weight: 700;">$${product.price.toFixed(2)}</span>
                    <span style="text-decoration: line-through; color: rgba(255, 255, 255, 0.5);">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" style="width: 100%; background: white; color: var(--primary);">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
            </div>
        </div>
    `).join("");
}

// === TOAST NOTIFICATIONS ===
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideInRight 0.3s ease reverse";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// === CONTACT FORM ===
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector("input[type='text']").value;
    showToast(`Thank you, ${name}! We'll get back to you soon.`, "success");
    form.reset();
}

// === COUNTDOWN TIMER ===
function updateTimer() {
    const timerElement = document.getElementById("timer");
    const now = new Date().getTime();
    const countDownDate = new Date(now + 2.75 * 60 * 60 * 1000).getTime();

    const interval = setInterval(() => {
        const today = new Date().getTime();
        const distance = countDownDate - today;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (distance < 0) {
            clearInterval(interval);
            timerElement.textContent = "00:00:00";
        }
    }, 1000);
}

// === SMOOTH SCROLL FOR ANCHORS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// === ANIMATIONS ON SCROLL ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        }
    });
}, observerOptions);

// === INITIALIZE APP ===
function initializeApp() {
    displayProducts(products);
    displayFlashDeals();
    updateTimer();
    updateCart();

    // Observe elements for animation
    document.querySelectorAll(".feature-card, .about-card, .contact-card").forEach(el => {
        observer.observe(el);
    });

    console.log("🚀 TechStyle Ultra loaded successfully!");
    console.log("✨ Features: Smart search, cart system, flash deals, responsive design");
}

// Start the app
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

// === KEYBOARD SHORTCUTS ===
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.classList.contains("active")) {
        toggleCart();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
    }
});
