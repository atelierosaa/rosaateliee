// Product Data
const products = [
    {
        id: 1,
        name: "Vestidos de Noivas",
        price: "R$ 1100,00",
        image: "img/noiva.jpg"
    },
    {
        id: 2,
        name: "Jalecos Facultativos",
        price: "R$ 200,00",
        image: "img/jaleco.jpg"
    },
    {
        id: 3,
        name: "Vestidos de Formatura",
        price: "R$ 300,00",
        image: "img/formatura.jpg"
    },
    {
        id: 4,
        name: "Fantasias",
        price: "R$ 150,00",
        image: "img/fantasias.jpg"
    },
    {
        id: 5,
        name: "Conjunto Alfaiataria",
        price: "R$ 180,00",
        image: "img/conjunto.jpg"
    },
    {
        id: 6,
        name: "Vestidos Temáticos",
        price: "R$ 130,00",
        image: "img/tematicos.jpg"
    }
];

// Display Products
function displayProducts() {
    const container = document.getElementById('product-container');
    if (!container) return;

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="btn btn-primary btn-detail" data-id="${product.id}">Ver Detalhes</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        container.appendChild(card);
    });

    // Add listeners to Detail Buttons
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            openModal(id);
        });
    });
}

// Modal Logic
const modal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = product.price;
    document.getElementById('modal-desc').textContent = product.description;
    
    // Update WhatsApp link with product name
    const waBase = "https://wa.me/5582996479174";
    const message = encodeURIComponent(`Olá! Vi o ${product.name} no site e gostaria de mais informações.`);
    document.getElementById('modal-wa-link').href = `${waBase}?text=${message}`;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple Reveal Animation on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].style.opacity = '1';
            reveals[i].style.transform = 'translateY(0)';
        }
    }
}

// Initial opacity and transform for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    displayProducts();
    reveal(); // Run once to check visibility of hero
});

window.addEventListener('scroll', reveal);
