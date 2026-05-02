import './style.css';
import { shops } from './data.js';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Optional: prompt user to refresh
  },
  onOfflineReady() {
    console.log('PWA is ready to work offline');
  },
});


// Render shops
const renderShops = (filteredShops) => {
  const shopList = document.getElementById('shopList');
  shopList.innerHTML = '';

  if (filteredShops.length === 0) {
    shopList.innerHTML = '<p style="text-align:center; color: #666;">No shops found.</p>';
    return;
  }

  filteredShops.forEach(shop => {
    const card = document.createElement('article');
    card.className = 'shop-card';
    
    card.innerHTML = `
      <img src="${shop.image}" alt="${shop.name}" class="shop-card-image" loading="lazy">
      <div class="shop-card-content">
        <div class="shop-card-header">
          <h3>${shop.name}</h3>
          <div class="shop-card-rating">
            <i data-lucide="star"></i>
            ${shop.rating}
          </div>
        </div>
        <div class="shop-card-location">
          <i data-lucide="map-pin"></i>
          ${shop.location}
        </div>
        <p class="shop-card-desc">${shop.description}</p>
        <div class="shop-card-actions">
          <a href="${shop.links.menu}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Menu</a>
          <a href="${shop.links.play}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <i data-lucide="sparkles"></i> Play
          </a>
        </div>
      </div>
    `;
    shopList.appendChild(card);
  });
  
  // Re-initialize icons for newly added DOM elements
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// Initial render
renderShops(shops);

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Reset category filters
  document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.filter-pill[data-category="all"]').classList.add('active');

  const filtered = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm) || 
    shop.location.toLowerCase().includes(searchTerm) ||
    shop.category.toLowerCase().includes(searchTerm)
  );
  renderShops(filtered);
});

// Category filtering
const filterButtons = document.querySelectorAll('.filter-pill');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Clear search
    searchInput.value = '';

    const category = button.dataset.category;
    if (category === 'all') {
      renderShops(shops);
    } else {
      const filtered = shops.filter(shop => shop.category === category);
      renderShops(filtered);
    }
  });
});
