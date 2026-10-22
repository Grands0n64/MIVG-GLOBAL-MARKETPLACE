// MIVG Global Marketplace — cleaned starter catalogue.
// Removed fabricated bulk inventory, food, and school listings.
// Only list model-specific products with a matching product photo.
const IPHONE_13_PRO_IMAGE = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha";
const products = [
  { id: 1, name: "iPhone 13 Pro 128GB", category: "Electronics", price: 530000, img: IPHONE_13_PRO_IMAGE, note: "Stock and price must be confirmed" },
  { id: 2, name: "iPhone 13 Pro 256GB", category: "Electronics", price: 580000, img: IPHONE_13_PRO_IMAGE, note: "Stock and price must be confirmed" }
];
let activeCategory = "All";
let currentPage = 1;
const itemsPerPage = 12;
let cart = [];

function renderStore() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const query = (document.getElementById("search-input")?.value || "").trim().toLowerCase();
  let filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (!query || p.name.toLowerCase().includes(query))
  );
  const sort = document.getElementById("sort-select")?.value;
  if (sort === "low") filtered.sort((a,b) => a.price-b.price);
  if (sort === "high") filtered.sort((a,b) => b.price-a.price);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  currentPage = Math.min(currentPage, totalPages);
  const visible = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  visible.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image";
    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name + " product photo";
    img.loading = "lazy";
    img.onerror = () => { imageWrap.innerHTML = '<p class="muted">Product image temporarily unavailable</p>'; };
    imageWrap.appendChild(img);
    const info = document.createElement("div");
    info.className = "product-info";
    info.innerHTML = '<span class="product-category"></span><h3></h3><div class="product-price"></div><div class="product-note"></div><button class="add-button" type="button">Add to Cart</button>';
    info.querySelector(".product-category").textContent = product.category;
    info.querySelector("h3").textContent = product.name;
    info.querySelector(".product-price").textContent = "₦" + product.price.toLocaleString("en-NG");
    info.querySelector(".product-note").textContent = product.note;
    info.querySelector("button").addEventListener("click", () => addToCart(product.id));
    card.append(imageWrap, info);
    grid.appendChild(card);
  });
  const label = document.getElementById("active-filter");
  if (label) label.textContent = query ? 'Search results for "' + query + '"' : (activeCategory === "All" ? "Showing all categories" : "Showing " + activeCategory);
  updatePaginationControls(totalPages);
}
function updatePaginationControls(totalPages) {
  let nav = document.getElementById("pagination-container");
  if (!nav) {
    nav = document.createElement("div");
    nav.id = "pagination-container";
    nav.style.cssText = "display:flex;justify-content:center;align-items:center;gap:15px;margin-top:30px";
    document.getElementById("product-grid")?.after(nav);
  }
  nav.innerHTML = "";
  const prev = document.createElement("button");
  prev.textContent = "Previous";
  prev.disabled = currentPage <= 1;
  prev.onclick = () => { currentPage--; renderStore(); };
  const label = document.createElement("span");
  label.textContent = "Page " + currentPage + " of " + totalPages;
  const next = document.createElement("button");
  next.textContent = "Next";
  next.disabled = currentPage >= totalPages;
  next.onclick = () => { currentPage++; renderStore(); };
  [prev,label,next].forEach(el => nav.appendChild(el));
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  cart.push(product);
  document.getElementById("cart-count").textContent = String(cart.length);
  renderCart();
  document.getElementById("overlay")?.classList.add("open");
  document.getElementById("cart-drawer")?.classList.add("open");
}
function renderCart() {
  const items = document.getElementById("cart-items");
  if (!items) return;
  items.innerHTML = "";
  cart.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.textContent = p.name + " — ₦" + p.price.toLocaleString("en-NG") + " ";
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.onclick = () => { cart.splice(i,1); document.getElementById("cart-count").textContent=String(cart.length); renderCart(); };
    row.appendChild(remove);
    items.appendChild(row);
  });
  document.getElementById("cart-total").textContent = "₦" + cart.reduce((sum,p)=>sum+p.price,0).toLocaleString("en-NG");
}
document.querySelectorAll(".category").forEach(btn => btn.addEventListener("click", e => {
  document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
  e.currentTarget.classList.add("active");
  const raw = e.currentTarget.dataset.category;
  activeCategory = raw === "Electronics" ? "Electronics" : raw === "All" ? "All" : raw;
  currentPage = 1;
  renderStore();
}));
document.getElementById("search-form")?.addEventListener("submit", e => { e.preventDefault(); currentPage=1; renderStore(); });
document.getElementById("search-input")?.addEventListener("input", () => { currentPage=1; renderStore(); });
document.getElementById("sort-select")?.addEventListener("change", renderStore);
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
document.getElementById("cart-open")?.addEventListener("click", () => {
  document.getElementById("overlay")?.classList.add("open");
  document.getElementById("cart-drawer")?.classList.add("open");
});
function closeDialogs() {
  document.getElementById("overlay")?.classList.remove("open");
  document.getElementById("cart-drawer")?.classList.remove("open");
  document.getElementById("notice-modal")?.classList.remove("open");
}
document.getElementById("cart-close")?.addEventListener("click", closeDialogs);
document.getElementById("overlay")?.addEventListener("click", closeDialogs);
document.getElementById("notice-close")?.addEventListener("click", closeDialogs);
document.getElementById("notice-ok")?.addEventListener("click", closeDialogs);
document.getElementById("checkout-button")?.addEventListener("click", () => {
  document.getElementById("notice-title").textContent = "Checkout is not enabled yet";
  document.getElementById("notice-message").textContent = "Secure order and payment setup is still required.";
  document.getElementById("notice-modal")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("open");
});
document.getElementById("seller-interest")?.addEventListener("click", () => {
  document.getElementById("notice-title").textContent = "Seller registration";
  document.getElementById("notice-message").textContent = "Seller onboarding is not enabled yet.";
  document.getElementById("notice-modal")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("open");
});
renderStore();
