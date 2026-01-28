// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Premium sound quality",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Track your fitness goals",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 89.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    description: "Stylish and functional",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 119.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description: "Comfort meets performance",
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 79.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
    description: "Start your day right",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 159.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    description: "UV protection & style",
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 39.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    description: "Non-slip surface",
  },
  {
    id: 8,
    name: "Table Lamp",
    price: 64.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    description: "Modern minimalist design",
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 99.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    description: "360° sound experience",
  },
  {
    id: 10,
    name: "Designer Handbag",
    price: 249.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    description: "Luxury fashion statement",
  },
  {
    id: 11,
    name: "Dumbbell Set",
    price: 149.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400",
    description: "Build strength at home",
  },
  {
    id: 12,
    name: "Wall Art",
    price: 54.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1582561833453-e3293d0c216a?w=400",
    description: "Transform your space",
  },
];

let cart = [];
let currentCategory = "all";

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !mobileMenuToggle.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
});

// Display Products
function displayProducts(productsToShow) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = productsToShow
    .map(
      (product) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-footer">
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `,
    )
    .join("");
}

// Filter by Category
function filterCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);
  displayProducts(filtered);
}

// Search Products
function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm),
  );
  displayProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();

  // Show notification
  showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #667eea;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS animation
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Update Cart
function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `,
      )
      .join("");
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Toggle Cart Modal
function toggleCart() {
  const modal = document.getElementById("cartModal");
  modal.classList.toggle("active");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(
    "Thank you for your purchase! Total: $" +
      cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
  );
  cart = [];
  updateCart();
  toggleCart();
}

// Event Listeners
document.getElementById("cartIcon").addEventListener("click", toggleCart);
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchProducts();
});

// Close modal when clicking outside
document.getElementById("cartModal").addEventListener("click", (e) => {
  if (e.target.id === "cartModal") {
    toggleCart();
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize
displayProducts(products);

console.log("TechStyle E-Commerce Loaded Successfully!");
