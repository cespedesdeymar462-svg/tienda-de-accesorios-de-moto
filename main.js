// Catálogo de Productos Solicitados
const products = [
    {
        id: 1,
        name: "Casco Integrar Dakar R-Series",
        category: "Cascos",
        price: 580,
        image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80",
        desc: "Certificación ECE 22.05, diseño aerodinámico con visor anti-rayaduras y ventilación pro."
    },
    {
        id: 2,
        name: "Guantes de Cuero con Carbono",
        category: "Guantes",
        price: 180,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        desc: "Protección rígida en nudillos, palma antideslizante y compatibles con pantallas táctiles."
    },
    {
        id: 3,
        name: "Chaqueta de Protección Blindada",
        category: "Protección",
        price: 750,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        desc: "Protecciones homologadas en hombros, codos y espalda. Tela Cordura resistente al roce."
    },
    {
        id: 4,
        name: "Rodilleras y Coderas Articuladas",
        category: "Protección",
        price: 240,
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80",
        desc: "Kit completo de 4 piezas. Estructura de alta densidad articulada para máximo confort."
    },
    {
        id: 5,
        name: "Espejos Retrovisores Deportivos",
        category: "Accesorios",
        price: 120,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
        desc: "Aluminio CNC, antirreflejo azul, adaptables a cualquier manubrio universal."
    },
    {
        id: 6,
        name: "Kit Luces LED Delanteras y Traseras",
        category: "Iluminación",
        price: 190,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        desc: "Foco principal LED 8000 Lumens + Luz trasera de freno estroboscópica impermeable."
    },
    {
        id: 7,
        name: "Kit de Herramientas Completo",
        category: "Herramientas",
        price: 210,
        image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80",
        desc: "Estuche compacto para viajes. Incluye llaves, destornilladores, alicates y parches."
    },
    {
        id: 8,
        name: "Traje Impermeable Alta Visibilidad",
        category: "Ropa",
        price: 260,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        desc: "Chaqueta y pantalón 100% sellados contra agua con bandas reflectivas 3M."
    },
    {
        id: 9,
        name: "Soporte para Celular Antivibración",
        category: "Accesorios",
        price: 110,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
        desc: "Agarradera de metal ultrarresistente con amortiguador de impacto para cámara."
    },
    {
        id: 10,
        name: "Protectores de Manos (Handguards)",
        category: "Protección",
        price: 160,
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80",
        desc: "Alma de aluminio revestido en plástico resistente para impactos y viento."
    }
];

// State
let cart = [];
let selectedCategory = 'todos';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts(products);
});

// Render Categories
function renderCategories() {
    const categories = ['todos', ...new Set(products.map(p => p.category))];
    const container = document.getElementById('categoryContainer');
    
    container.innerHTML = categories.map(cat => `
        <button onclick="filterCategory('${cat}')" 
            class="category-btn text-xs sm:text-sm font-bold uppercase px-4 py-2 rounded-full border transition-all ${
                selectedCategory === cat 
                ? 'bg-dakar-orange text-black border-dakar-orange shadow-lg shadow-dakar-orange/30' 
                : 'bg-dakar-dark text-gray-300 border-gray-700 hover:border-dakar-orange'
            }">
            ${cat}
        </button>
    `).join('');
}

// Filter by Category
function filterCategory(category) {
    selectedCategory = category;
    renderCategories();
    
    const filtered = category === 'todos' 
        ? products 
        : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        
    document.getElementById('sectionTitle').innerText = category === 'todos' ? 'Todos los Productos' : category;
    renderProducts(filtered);
}

// Render Products Grid
function renderProducts(items) {
    const grid = document.getElementById('productsGrid');
    document.getElementById('productCounter').innerText = `${items.length} Producto(s)`;
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-gray-500">
                <i class="fa-solid fa-box-open text-4xl mb-3"></i>
                <p>No se encontraron productos que coincidan con la búsqueda.</p>
            </div>
        `;
        return;
    }
    grid.innerHTML = items.map(product => `
        <div class="bg-dakar-dark border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
                <div class="relative overflow-hidden h-48 bg-dakar-black">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/292929/FF5722?text=Pasion+Dakar'">
                    <span class="absolute top-2 right-2 bg-dakar-black/80 text-dakar-orange text-[10px] font-extrabold px-2 py-1 rounded border border-dakar-orange/30 uppercase">
                        ${product.category}
                    </span>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-white text-base leading-tight mb-2 group-hover:text-dakar-orange transition-colors">${product.name}</h3>
                    <p class="text-gray-400 text-xs line-clamp-2 mb-3">${product.desc}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-gray-800/80">
                    <div>
                        <span class="text-xs text-gray-400 block">Precio</span>
                        <span class="text-xl font-black text-white">${product.price} <span class="text-dakar-orange text-sm">Bs</span></span>
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-dakar-orange hover:bg-dakar-darkorange text-black font-extrabold px-3 py-2 rounded-lg text-xs uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95">
                        <i class="fa-solid fa-plus"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Bar Logic
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function searchProductsMobile() {
    const query = document.getElementById('searchInputMobile').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Cart Actions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    showToast(`"${product.name}" agregado`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update counter badge
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalCount;
    
    // Update Items List
    const cartItemsContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="py-12 text-center text-gray-500">
                <i class="fa-solid fa-cart-arrow-down text-4xl mb-3"></i>
                <p class="text-sm">Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="py-4 flex items-center justify-between gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded bg-dakar-black flex-shrink-0" onerror="this.src='https://placehold.co/100/292929/FF5722?text=Dakar'">
                <div class="flex-1">
                    <h4 class="text-xs font-bold text-white line-clamp-1">${item.name}</h4>
                    <span class="text-xs text-dakar-orange font-bold">${item.price} Bs</span>
                </div>
                <div class="flex items-center border border-gray-700 rounded bg-dakar-black">
                    <button onclick="changeQuantity(${item.id}, -1)" class="px-2 py-0.5 text-gray-400 hover:text-white">-</button>
                    <span class="px-2 text-xs font-bold text-white">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="px-2 py-0.5 text-gray-400 hover:text-white">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-400 text-sm p-1">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').innerText = `${total} Bs`;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('hidden');
}

// WhatsApp Order Generation
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de realizar el pedido.");
        return;
    }
    const name = document.getElementById('clientName').value.trim();
    const city = document.getElementById('clientCity').value.trim();
    let message = `*NUEVO PEDIDO - PASIÓN DAKAR*\n`;
    if (name) message += `*Cliente:* ${name}\n`;
    if (city) message += `*Ubicación/Dirección:* ${city}\n`;
    message += `----------------------------------\n`;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        message += `${index + 1}. *${item.name}*\n   Cant: ${item.quantity} | Subtotal: ${subtotal} Bs\n`;
    });
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `----------------------------------\n`;
    message += `*TOTAL A PAGAR:* ${total} Bs\n\n`;
    message += `Hola, me gustaría coordinar la compra y el envío de estos productos.`;
    const phone = "59176312731";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Toast Helper
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2500);
}
