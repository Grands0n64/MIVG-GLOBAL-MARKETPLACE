// =========================================================================
// IVAVIK MARKETPLACE LTD - 505 PREMIUM REAL PRODUCT MATCHING BACKEND
// =========================================================================

const categories = ["Food Stuffs", "Gadgets", "Sport Stuffs", "School Stuffs", "House Materials"];
const brands = ["Ivavik Premium", "Dangote", "Golden Penny", "Samsung", "Oraimo", "Sony", "Nike", "Adidas", "Cway", "Scanfrost"];

const itemTypes = {
  "Food Stuffs": ["Bag of Rice (50kg)", "Carton of Indomie", "Gallon of Vegetable Oil", "Premium Semovita Pack", "Bag of Refined Sugar", "Pack of Spaghetti"],
  "Gadgets": ["Smart Phone 128GB", "Core i5 Slim Laptop", "Wireless Bluetooth Earbuds", "Fast Charging Power Bank", "43-inch Smart TV"],
  "Sport Stuffs": ["Leather Football", "Training Tracksuit", "Running Sneakers", "Gym Dumbbell Set", "Agility Training Cones"],
  "School Stuffs": ["Waterproof Backpack", "Hardcover Notebook Pack", "Mathematical Set", "Scientific Calculator", "Desk Organizer Box"],
  "House Materials": ["Rechargeable Standing Fan", "Electric Blender", "LED Energy Saving Bulb", "Smart Door Lock", "Microwave Oven"]
};

// 📸 STRICT HIGH-QUALITY REAL PHOTOGRAPHY INDEX MAP
const specificImages = {
  // --- FOOD STUFFS ---
  "Bag of Rice (50kg)": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85",
  "Carton of Indomie": "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85",
  "Gallon of Vegetable Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85",
  "Premium Semovita Pack": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85", 
  "Bag of Refined Sugar": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=900&q=85",
  "Pack of Spaghetti": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=85",
  
  // --- GADGETS ---
  "Smart Phone 128GB": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  "Core i5 Slim Laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  "Wireless Bluetooth Earbuds": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
  "Fast Charging Power Bank": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=85",
  "43-inch Smart TV": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85",
  
  // --- SPORT STUFFS ---
  "Leather Football": "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=900&q=85",
  "Training Tracksuit": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
  "Running Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  "Gym Dumbbell Set": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
  "Agility Training Cones": "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85",
  
  // --- SCHOOL STUFFS ---
  "Waterproof Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
  "Hardcover Notebook Pack": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85",
  "Mathematical Set": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=85",
  "Scientific Calculator": "https://images.unsplash.com/photo-1564473185935-5d6f8b5d6b77?auto=format&fit=crop&w=900&q=85",
  "Desk Organizer Box": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
  
  // --- HOUSE MATERIALS ---
  "Rechargeable Standing Fan": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=85",
  "Electric Blender": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=85",
  "LED Energy Saving Bulb": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  "Smart Door Lock": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
  "Microwave Oven": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=900&q=85"
};

const products = [];

// Automated Loop Engine to compile exactly 505 inventory objects
for (let i = 1; i <= 505; i++) {
  const selectedCat = categories[i % categories.length];
  const brand = brands[i % brands.length];
  const availableTypes = itemTypes[selectedCat];
  const type = availableTypes[i % availableTypes.length];
  
  const productName = brand + " " + type + " Mod-" + (200 + i);
  
  let basePrice = 2500 + (i * 750);
  if (selectedCat === "Gadgets") basePrice += 85000;
  if (selectedCat === "Food Stuffs" && type.includes("Rice")) basePrice += 65000;
  
  const finalPrice = Math.ceil(basePrice / 500) * 500;
  const chosenImage = specificImages[type];

  products.push({
    id: i,
    name: productName,
    category: selectedCat,
    price: finalPrice,
    img: chosenImage
  });
}

// LAYOUT PACKAGING AND INTERACTION RENDERING
let activeCategory = "All";
let currentPage = 1;
const itemsPerPage = 12;

function renderStore() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let filtered = products;
  if (activeCategory !== "All") {
    filtered = products.filter(p => p.category === activeCategory);
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filtered.slice(startIndex, endIndex);

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
        <div class="product-note">Stock availability confirmed</div>
        <button class="add-button" type="button" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

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
    <button onclick="changePage(-1)" ${currentPage === 1 ? "disabled" : ""} style="padding: 10px 20px; background: #e5e7eb; border-radius: 8px; font-weight: bold; border:none; cursor: pointer;">Previous</button>
    <span style="font-weight: bold; color:#176b57;">Page ${currentPage} of ${totalPages || 1}</span>
    <button onclick="changePage(1)" ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""} style="padding: 10px 20px; background: #176b57; color: white; border-radius: 8px; font-weight: bold; border:none; cursor: pointer;">Next</button>
  `;
}

let cartCount = 0;
window.handleAddToCart = function(id) {
  cartCount++;
  const counterElement = document.getElementById("cart-count");
  if (counterElement) counterElement.textContent = cartCount;
};

window.changePage = function(direction) {
  currentPage += direction;
  renderStore();
  window.scrollTo({ top: document.getElementById("products").offsetTop, behavior: 'smooth' });
};

// Map navigation categories dynamically to match ChatGPT UI elements
document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    e.currentTarget.classList.add("active");
    
    let rawCategory = e.currentTarget.getAttribute("data-category");
    activeCategory = rawCategory;
    currentPage = 1;
    
    // Remap data-category names to matching loops
    if (rawCategory === "Electronics") activeCategory = "Gadgets";
    if (rawCategory === "Fashion") activeCategory = "Fashion";
    if (rawCategory === "Shoes") activeCategory = "Sport Stuffs";
    if (rawCategory === "Accessories") activeCategory = "School Stuffs";
    if (rawCategory === "Home") activeCategory = "House Materials";
    
    renderStore();
  });
});

window.onload = function() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  renderStore();
};
