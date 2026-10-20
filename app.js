// IVAVIK MARKETPLACE LTD - 505 PRODUCT GENERATOR AND PAGINATION SYSTEM
const categories = ["Food Stuffs", "Gadgets", "Sport Stuffs", "School Stuffs", "House Materials"];
const brands = ["Ivavik Premium", "Dangote", "Golden Penny", "Samsung", "Oraimo", "Sony", "Nike", "Adidas", "Cway", "Scanfrost"];

const itemTypes = {
  "Food Stuffs": ["Bag of Rice (50kg)", "Carton of Indomie", "Gallon of Vegetable Oil", "Yam Tuber Tub", "Bag of Garri", "Pack of Spaghetti"],
  "Gadgets": ["Smart Phone 128GB", "Core i5 Slim Laptop", "Wireless Bluetooth Earbuds", "Fast Charging Power Bank", "43-inch Smart TV"],
  "Sport Stuffs": ["Leather Football", "Training Tracksuit", "Running Sneakers", "Gym Dumbbell Set", "Agility Training Cones"],
  "School Stuffs": ["Waterproof Backpack", "Hardcover Notebook Pack", "Mathematical Set", "Scientific Calculator", "Desk Organizer Box"],
  "House Materials": ["Rechargeable Standing Fan", "Electric Blender", "LED Energy Saving Bulb", "Smart Door Lock", "Microwave Oven"]
};

const imagePool = {
  "Food Stuffs": "https://unsplash.com",
  "Gadgets": "https://unsplash.com",
  "Sport Stuffs": "https://unsplash.com",
  "School Stuffs": "https://unsplash.com",
  "House Materials": "https://unsplash.com"
};

const products = [];

// Automatically generate 505 structured goods
for (let i = 1; i <= 505; i++) {
  const selectedCat = categories[i % categories.length];
  const brand = brands[i % brands.length];
  const availableTypes = itemTypes[selectedCat];
  const type = availableTypes[i % availableTypes.length];
  
  const productName = brand + " " + type + " Mod-" + (200 + i);
  
  let basePrice = 2500 + (i * 750);
  if (selectedCat === "Gadgets") basePrice += 85000;
  if (selectedCat === "Food Stuffs" && type.includes("Rice")) basePrice += 60000;
  
  const finalPrice = Math.ceil(basePrice / 500) * 500;

  products.push({
    id: i,
    name: productName,
    category: selectedCat,
    price: finalPrice,
    img: imagePool[selectedCat]
  });
}

// STATE AND DISPLAY MANAGEMENT
let activeCategory = "All";
let currentPage = 1;
const itemsPerPage = 12;

function renderStore() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  // Filter items based on selected category tab
  let filtered = products;
  if (activeCategory !== "All") {
    filtered = products.filter(p => p.category === activeCategory);
  }

  // Calculate Pagination splits
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filtered.slice(startIndex, endIndex);

  // Generate ChatGPT style semantic HTML article structures
  visibleItems.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-price">₦${product.price.toLocaleString()}</div>
        <div class="product-note">Premium stock confirmation ready</div>
        <button class="add-button" type="button" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Render or update navigation buttons dynamically below the grid
  updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) {
  let navContainer = document.getElementById("pagination-container");
  if (!navContainer) {
    navContainer = document.createElement("div");
    navContainer.id = "pagination-container";
    navContainer.style.display = "flex";
    navContainer.style.justify = "center";
    navContainer.style.alignItems = "center";
    navContainer.style.gap = "15px";
    navContainer.style.marginTop = "30px";
    document.getElementById("product-grid").after(navContainer);
  }

  navContainer.innerHTML = `
    <button onclick="changePage(-1)" ${currentPage === 1 ? "disabled" : ""} style="padding: 10px 20px; background: #e5e7eb; border-radius: 8px; font-weight: bold; cursor: pointer;">Previous</button>
    <span style="font-weight: bold;">Page ${currentPage} of ${totalPages || 1}</span>
    <button onclick="changePage(1)" ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""} style="padding: 10px 20px; background: #176b57; color: white; border-radius: 8px; font-weight: bold; cursor: pointer;">Next</button>
  `;
}

// APP LOGIC TRIGGERS
let cartCount = 0;
window.handleAddToCart = function(id) {
  cartCount++;
  const counterElement = document.getElementById("cart-count");
  if (counterElement) counterElement.textContent = cartCount;
};

window.changePage = function(direction) {
  currentPage += direction;
  renderStore();
  window.scrollTo({ top: document.getElementById("products").offsetTop, behavior: "smooth" });
};

// Map navigation click listeners onto ChatGPT buttons
document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    e.currentTarget.classList.add("active");
    activeCategory = e.currentTarget.getAttribute("data-category");
    currentPage = 1;
    
    // Convert short tag text for filtering matching criteria
    if (activeCategory === "Shoes") activeCategory = "Sport Stuffs";
    if (activeCategory === "Home") activeCategory = "House Materials";
    if (activeCategory === "Accessories") activeCategory = "School Stuffs";
    
    renderStore();
  });
});

window.onload = function() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  renderStore();
};
