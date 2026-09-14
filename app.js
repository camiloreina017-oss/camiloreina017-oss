// --- PRODUCTOS BASE CON DETALLES ---
// Lista de productos disponibles en la tienda
const products = [
  { 
    id: 1, 
    name: "PC GAMER", 
    price: 4000000, 
    category: "audio", 
    image: "https://images.unsplash.com/photo-1696710257827-75e2e5954059?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGMlMjBnYW1lcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    reviews: 124,
    description: "Potente PC Gamer diseñada para disfrutar tus juegos favoritos con excelente rendimiento, velocidad y estabilidad. Ideal para gaming, streaming, edición de video, diseño gráfico y tareas exigentes.",
    features: ["Procesador de alto rendimiento", "Tarjeta gráfica dedicada", "Memoria RAM de alta velocidad", "SSD de gran capacidad"]
  },
  { 
    id: 2, 
    name: "Phone 15 pro Max", 
    price: 5000000, 
    category: "Phone 15 pro Max", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56vcFMUXFduopzH066aQnPzMD1ChVCtQA7wpbXJliLg&s=10",
    rating: 4.6,
    reviews: 89,
    description: "El iPhone 15 Pro Max combina un diseño premium, alto rendimiento y un avanzado sistema de cámaras. Es ideal para quienes buscan un celular potente para fotografía, videojuegos, redes sociales y uso diario.",
    features: ["Pantalla Super Retina XDR de 6,7", "Chip A17 Pro de alto rendimiento", "Sistema de cámaras profesionales", "Sistema de cámaras profesionales"]
  },
  { 
    id: 3, 
    name: "Teclado gamer", 
    price: 50000, 
    category: "Teclado gamer", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOBtOoQmItyjwrgHkzDY-qX69qWoCajW38m_QPdtgwE_H_lN0r5TqR4Ha&s=10",
    rating: 4.9,
    reviews: 210,
    description: "Diseñado para gaming y escritura profesional con respuesta táctil ultra rápida e iluminación RGB customizable.",
    features: ["Switches mecánicos lineales", "Iluminación RGB por tecla", "Estructura de aluminio", "Anti-Ghosting completo"]
  },
  { 
    id: 4, 
    name: "Silla Gamer azul ", 
    price: 650000, 
    category: "Silla Gamer", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrWVJC5uB7rwN83ttenskgjQZ4NdvYXyKkV6HZkEzhg&s=10",
    rating: 4.7,
    reviews: 45,
    description: "Silla Gamer diseñada para brindar comodidad y soporte durante largas jornadas de videojuegos, trabajo o estudio. Su diseño deportivo y moderno combina funcionalidad, resistencia y estilo.",
    features: ["Diseño Gamer moderno", "Acabado en color azul", "Respaldo ergonómico", "Altura ajustable"]
  },
  { 
    id: 5, 
    name: "Tablet Android 15 De 10 Pulgadas, 18 Gb De Ram+128 Gb De Rom", 
    price: 50000, 
    category: "Tablet Android", 
    image: "https://http2.mlstatic.com/D_NQ_NP_600477-MLA99921575891_112025-O.webp",
    rating: 4.5,
    reviews: 98,
    description: "Tablet de 10 pulgadas con sistema Android 15, diseñada para ofrecer una experiencia cómoda y fluida para entretenimiento, estudio, trabajo y navegación. Cuenta con amplio almacenamiento y memoria RAM para utilizar diferentes aplicaciones.",
    features: ["Pantalla de 10 pulgadas", "Sistema operativo Android 15", "128 GB de almacenamiento", "18 GB de RAM anunciados"]
  },
  { 
    id: 6, 
    name: "Reloj inteligente", 
    price: 650000, 
    category: "Reloj ", 
    image: "https://m.media-amazon.com/images/I/71HqlGY1rgL.jpg", 
    rating: 4.8, 
    reviews: 156, 
    description: "Reloj inteligente moderno con pantalla de 1,90 pulgadas, diseñado para acompañarte durante el día. Ideal para mantenerte conectado, revisar notificaciones y complementar tus actividades diarias.", 
    features: ["Pantalla de 1,90 pulgadas", "Diseño moderno y elegante", "Notificaciones de llamadas y mensajes", "Funciones de monitoreo de actividad"] 
  } 
]; 

// --- FUNCIÓN PARA FORMATO DE MONEDA ($4.000.000) ---
function formatMoney(amount) {
  return "$ " + Number(amount).toLocaleString('es-CO');
}

// --- ESTADO DE LA APLICACIÓN ---
let cart = []; 
let currentCategory = "todos"; 
let searchQuery = ""; 
let currentSort = "featured"; 

// --- ELEMENTOS DEL DOM ---
const productsGrid = document.getElementById("products-grid"); 
const categoriesContainer = document.getElementById("categories-container"); 
const searchInput = document.getElementById("search-input"); 
const sortSelect = document.getElementById("sort-select"); 

const cartDrawer = document.getElementById("cart-drawer"); 
const cartOverlay = document.getElementById("cart-overlay"); 
const openCartBtn = document.getElementById("open-cart-btn"); 
const closeCartBtn = document.getElementById("close-cart-btn"); 
const cartItemsContainer = document.getElementById("cart-items"); 
const cartBadge = document.getElementById("cart-badge"); 

const cartSubtotalEl = document.getElementById("cart-subtotal"); 
const cartShippingEl = document.getElementById("cart-shipping"); 
const cartTotalEl = document.getElementById("cart-total"); 

const productDetailModal = document.getElementById("product-detail-modal"); 
const productDetailBody = document.getElementById("product-detail-body"); 
const closeDetailModalBtn = document.getElementById("close-detail-modal-btn"); 

const checkoutBtn = document.getElementById("checkout-btn"); 
const checkoutModal = document.getElementById("checkout-modal"); 
const closeModalBtn = document.getElementById("close-modal-btn"); 
const checkoutForm = document.getElementById("checkout-form"); 
const toast = document.getElementById("toast"); 

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => { 
  renderCategories(); 
  renderProducts(); 
  setupEventListeners(); 
}); 

// --- RENDERIZADO DE CATEGORÍAS ---
function renderCategories() { 
  const categories = ["todos", ...new Set(products.map(p => p.category))]; 
    
  categoriesContainer.innerHTML = categories.map(cat => ` 
    <button class="btn-category ${cat === currentCategory ? 'active' : ''}" data-category="${cat}"> 
      ${cat.charAt(0).toUpperCase() + cat.slice(1)} 
    </button> 
  `).join(''); 
} 

// --- RENDERIZADO DE PRODUCTOS ---
function renderProducts() { 
  let filtered = products.filter(product => { 
    const matchesCategory = currentCategory === "todos" || product.category === currentCategory; 
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()); 
    return matchesCategory && matchesSearch; 
  }); 

  if (currentSort === "low") { 
    filtered.sort((a, b) => a.price - b.price); 
  } else if (currentSort === "high") { 
    filtered.sort((a, b) => b.price - a.price); 
  } 

  if (filtered.length === 0) { 
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No se encontraron productos.</p>`; 
    return; 
  } 

  productsGrid.innerHTML = filtered.map(product => ` 
    <div class="product-card" onclick="openProductDetail(${product.id})"> 
      <div class="product-img-wrapper"> 
        <img src="${product.image}" alt="${product.name}" class="product-img"> 
        <span class="quick-view-badge"><i class="fa-solid fa-eye"></i> Vista rápida</span> 
      </div> 
      <div class="product-info"> 
        <span class="product-category">${product.category}</span> 
        <h3 class="product-title">${product.name}</h3> 
        <p class="product-price">${formatMoney(product.price)}</p> 
        <div class="card-actions"> 
          <button class="btn-add" onclick="event.stopPropagation(); addToCart(${product.id})"> 
            <i class="fa-solid fa-cart-plus"></i> Agregar 
          </button> 
          <button class="btn-view" onclick="event.stopPropagation(); openProductDetail(${product.id})" title="Ver detalles"> 
            <i class="fa-solid fa-info-circle"></i> 
          </button> 
        </div> 
      </div> 
    </div> 
  `).join(''); 
} 

// --- MODAL DE DETALLES DEL PRODUCTO ---
function openProductDetail(productId) { 
  const product = products.find(p => p.id === productId); 
  if (!product) return; 

  const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating)); 

  productDetailBody.innerHTML = ` 
    <div class="product-detail-grid"> 
      <img src="${product.image}" alt="${product.name}" class="detail-img"> 
      <div> 
        <span class="product-category">${product.category}</span> 
        <h2 class="detail-title">${product.name}</h2> 
        <div class="detail-rating">${stars} <strong>${product.rating}</strong> (${product.reviews} opiniones)</div> 
        <p class="detail-price">${formatMoney(product.price)}</p> 
        <p class="detail-description">${product.description}</p> 
        <h4 style="margin-bottom: 0.5rem;">Características principales:</h4> 
        <ul class="detail-features"> 
          ${product.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')} 
        </ul> 
        <button class="btn-add" style="width: 100%;" onclick="addToCart(${product.id}); closeProductDetail();"> 
          <i class="fa-solid fa-cart-plus"></i> Añadir al Carrito 
        </button> 
      </div> 
    </div> 
  `; 
  productDetailModal.classList.add("active"); 
} 

function closeProductDetail() { 
  productDetailModal.classList.remove("active"); 
} 

// --- LÓGICA DEL CARRITO ---
function addToCart(productId) { 
  const product = products.find(p => p.id === productId); 
  const existingItem = cart.find(item => item.id === productId); 

  if (existingItem) { 
    existingItem.quantity += 1; 
  } else { 
    cart.push({ ...product, quantity: 1 }); 
  } 

  updateCartUI(); 
  showToast(`Añadido: ${product.name}`); 
} 

function updateCartQuantity(productId, change) { 
  const item = cart.find(i => i.id === productId); 
  if (!item) return; 

  item.quantity += change; 

  if (item.quantity <= 0) { 
    cart = cart.filter(i => i.id !== productId); 
  } 

  updateCartUI(); 
} 

function updateCartUI() { 
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 
  cartBadge.textContent = totalItems; 

  if (cart.length === 0) { 
    cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 2rem;">El carrito está vacío</p>`; 
  } else { 
    cartItemsContainer.innerHTML = cart.map(item => ` 
      <div class="cart-item"> 
        <img src="${item.image}" alt="${item.name}"> 
        <div class="cart-item-info"> 
          <div class="cart-item-title">${item.name}</div> 
          <div class="cart-item-price">${formatMoney(item.price * item.quantity)}</div> 
          <div class="cart-item-controls"> 
            <button class="btn-qty" onclick="updateCartQuantity(${item.id}, -1)">-</button> 
            <span>${item.quantity}</span> 
            <button class="btn-qty" onclick="updateCartQuantity(${item.id}, 1)">+</button> 
          </div> 
        </div> 
      </div> 
    `).join(''); 
  } 

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); 
  const shipping = subtotal > 0 ? (subtotal > 150000 ? 0 : 10000) : 0; 
  const total = subtotal + shipping; 

  cartSubtotalEl.textContent = formatMoney(subtotal); 
  cartShippingEl.textContent = shipping === 0 && subtotal > 0 ? "Gratis" : formatMoney(shipping); 
  cartTotalEl.textContent = formatMoney(total); 
} 

// --- CONFIGURACIÓN DE LISTENERS DE EVENTOS ---
function setupEventListeners() { 
  categoriesContainer.addEventListener("click", (e) => { 
    if (e.target.classList.contains("btn-category")) { 
      document.querySelectorAll(".btn-category").forEach(btn => btn.classList.remove("active")); 
      e.target.classList.add("active"); 
      currentCategory = e.target.dataset.category; 
      renderProducts(); 
    } 
  }); 

  searchInput.addEventListener("input", (e) => { 
    searchQuery = e.target.value; 
    renderProducts(); 
  }); 

  sortSelect.addEventListener("change", (e) => { 
    currentSort = e.target.value; 
    renderProducts(); 
  }); 

  openCartBtn.addEventListener("click", toggleCart); 
  closeCartBtn.addEventListener("click", toggleCart); 
  cartOverlay.addEventListener("click", toggleCart); 

  closeDetailModalBtn.addEventListener("click", closeProductDetail); 

  productDetailModal.addEventListener("click", (e) => { 
    if (e.target === productDetailModal) closeProductDetail(); 
  }); 

  checkoutBtn.addEventListener("click", () => { 
    if (cart.length === 0) { 
      showToast("Agrega productos antes de pagar."); 
      return; 
    } 
    toggleCart(); 
    checkoutModal.classList.add("active"); 
  }); 

  closeModalBtn.addEventListener("click", () => checkoutModal.classList.remove("active")); 

  // --- PROCESAMIENTO DEL PAGO ---
  checkoutForm.addEventListener("submit", async (e) => { 
    e.preventDefault(); 

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); 
    const shipping = subtotal > 0 ? (subtotal > 150000 ? 0 : 10000) : 0; 
    const total = subtotal + shipping; 

    // Obtención segura de campos
    const nameInput = document.getElementById("name") || document.querySelector("input[type='text']");
    const emailInput = document.getElementById("email") || document.querySelector("input[type='email']");
    const addressInput = document.getElementById("address") || document.querySelectorAll("input[type='text']")[1];
    const paymentSelect = document.getElementById("payment-method") || document.querySelector("select");

    const orderData = {
      nombre: nameInput ? nameInput.value : "",
      email: emailInput ? emailInput.value : "",
      direccion: addressInput ? addressInput.value : "",
      metodo_pago: paymentSelect ? paymentSelect.value : "",
      total: total,
      productos: cart
    };

    try {
      const response = await fetch("procesar_pago.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.status === "success") {
        checkoutModal.classList.remove("active"); 
        cart = []; 
        updateCartUI(); 
        showToast("¡Gracias por tu compra! Tu pedido fue guardado con éxito."); 
        checkoutForm.reset(); 
      } else {
        showToast(result.message);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      showToast("Error de conexión: " + error.message);
    }
  }); 
} 

function toggleCart() { 
  cartDrawer.classList.toggle("active"); 
  cartOverlay.classList.toggle("active"); 
} 

function showToast(message) { 
  toast.textContent = message; 
  toast.classList.add("active"); 
  setTimeout(() => { 
    toast.classList.remove("active"); 
  }, 4000); 
}