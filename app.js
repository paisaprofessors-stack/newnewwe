// ============================================================
//  FVRST STORE CONTROLLER
// ============================================================
const supabaseUrl = 'https://lkluaaxyaypgjzltviiy.supabase.co';
const supabaseKey = 'sb_publishable_8DfAzjFfWVI21RKieGnCnA_RKqQzAY_';
const supabaseClient = window.supabase
  ? window.supabase.createClient(supabaseUrl, supabaseKey)
  : null;

const PRODUCTS = window.FVRST_PRODUCTS || [];
const STORE_CONFIG = {
  freeShippingThreshold: 599,
  baseDelivery: 30,
  ...(window.FVRST_CONFIG || {})
};
const HOME_URL = document.body?.dataset.homeUrl || 'index.html';
const PRODUCT_URL = document.body?.dataset.productUrl || 'product.html';

const getProduct = (slugOrId) => PRODUCTS.find(p => p.slug === slugOrId || p.id === slugOrId) || null;
const getDefaultProduct = () => PRODUCTS[0] || null;
const getDiscountPct = (product) => product?.compare ? Math.round((1 - product.price / product.compare) * 100) : 0;
const getDelivery = (subtotal) => subtotal >= STORE_CONFIG.freeShippingThreshold ? 0 : STORE_CONFIG.baseDelivery;
const money = (n) => '\u20B9' + Number(n || 0).toLocaleString('en-IN');
const stars = '<span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>';
const detailUrl = (product) => product?.detailUrl || `${PRODUCT_URL}?product=${encodeURIComponent(product.slug)}`;
const CART_PRODUCT_FALLBACKS = {
  'mono-tee-01': {
    id: 'mono-tee-01',
    slug: 'travis-scott-oversized-tee',
    name: 'Travis Scott Oversized Tee',
    image: 'products/product 1/assets/preview1.webp',
    price: 649,
    defaultSize: 'L',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 }
  },
  'lunar-black-full-sleeve-01': {
    id: 'lunar-black-full-sleeve-01',
    slug: 'lunar-black-full-sleeve-t-shirt',
    name: 'Lunar Black Full Sleeve T Shirt',
    image: 'products/product 2/assets/preview1.webp',
    price: 599,
    defaultSize: 'L',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 }
  },
  'built-for-speed-oversized-tee-01': {
    id: 'built-for-speed-oversized-tee-01',
    slug: 'built-for-speed-oversized-t-shirt',
    name: 'Built For Speed Oversized T-shirt',
    image: 'products/product 3/assets/preview1.webp',
    price: 699,
    defaultSize: 'M',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 }
  }
};
const toAbsoluteUrl = (src, base = window.location.href) => {
  try { return new URL(src, base).href; } catch (e) { return src || ''; }
};
const homePageUrl = () => toAbsoluteUrl(HOME_URL, window.location.href);
const getCartProductFallback = (item) => {
  const text = `${item.name || ''} ${item.slug || ''} ${item.image || ''}`.toLowerCase();
  const price = Number(item.price || 0);
  const inferredKey =
    text.includes('built for speed') || text.includes('speed oversized') || text.includes('product 3') || price === 699
      ? 'built-for-speed-oversized-tee-01'
      : text.includes('lunar') || text.includes('full sleeve') || text.includes('product 2') || price === 599
      ? 'lunar-black-full-sleeve-01'
      : text.includes('travis') || text.includes('product 1') || price === 649
        ? 'mono-tee-01'
        : null;
  const fallback = CART_PRODUCT_FALLBACKS[inferredKey] || CART_PRODUCT_FALLBACKS[item.id] || Object.values(CART_PRODUCT_FALLBACKS).find(p => p.slug === item.slug);
  return fallback ? { ...fallback, images: { main: toAbsoluteUrl(fallback.image, homePageUrl()) } } : null;
};
const productImageUrl = (product) => toAbsoluteUrl(product?.images?.main || '', window.location.href);
const cartImageUrl = (item, product) => {
  if (product && (product.id === item.id || product.slug === item.slug)) return productImageUrl(product);
  const fallback = getCartProductFallback(item);
  if (fallback) return fallback.images.main;
  if (String(item.image || '').includes('products/')) return toAbsoluteUrl(item.image, homePageUrl());
  return toAbsoluteUrl(item.image || product?.images?.main || '', window.location.href);
};
const escapeHtml = (s) => String(s || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
const formatDeliveryDate = (daysFromNow = 4) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};
const totalStock = (product) => Object.values(product?.stockBySize || {}).reduce((sum, n) => sum + Number(n || 0), 0);
const lowStockSize = (product) => {
  const available = Object.entries(product?.stockBySize || {})
    .filter(([, n]) => Number(n) > 0)
    .sort((a, b) => Number(a[1]) - Number(b[1]));
  return available[0] || [selectedSize(product), itemStock(product, selectedSize(product))];
};
const stockLine = (product) => {
  const [size, count] = lowStockSize(product);
  const total = totalStock(product);
  return total <= 20
    ? `Selling fast: ${total} pieces left · lowest stock ${size} (${count})`
    : `In stock · delivered by ${formatDeliveryDate(4)} · free size exchange`;
};
const detailUrgencyHtml = (product) => {
  const [size, count] = lowStockSize(product);
  return `
    <div class="conversion-strip">
      <span>Only ${count} left in ${escapeHtml(size)}</span>
      <span>Delivery by ${escapeHtml(formatDeliveryDate(4))}</span>
      <span>Pay on delivery</span>
    </div>
  `;
};
const formatTitle = (name) => {
  const parts = String(name || '').split(' ');
  return parts.length > 3 ? `${parts.slice(0, 2).join(' ')}<br>${parts.slice(2).join(' ')}` : escapeHtml(name);
};

window.getProduct = getProduct;
window.getDiscountPct = getDiscountPct;
window.getDelivery = getDelivery;

const CART_KEY = 'fv_cart_v2';
const OLD_CART_KEY = 'fv_cart_v1';
const WISHLIST_KEY = 'fv_wishlist_v2';

const loadJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed || fallback;
  } catch (e) {
    return fallback;
  }
};
const saveJson = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
};

const normalizeCart = () => {
  const raw = loadJson(CART_KEY, null) || loadJson(OLD_CART_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const matchedProduct = getProduct(item.id || item.slug);
      const fallbackProduct = getCartProductFallback(item);
      const product = matchedProduct || fallbackProduct;
      if (!product) return null;
      const isCatalogProduct = Boolean(matchedProduct || fallbackProduct);
      return {
        id: isCatalogProduct ? product.id : item.id,
        slug: isCatalogProduct ? product.slug : item.slug,
        name: isCatalogProduct ? product.name : item.name,
        image: cartImageUrl(item, product),
        price: Number(isCatalogProduct ? product.price : item.price),
        size: item.size || product.defaultSize || product.sizes?.[0] || 'L',
        qty: Math.max(1, Number(item.qty || 1))
      };
    })
    .filter(Boolean);
};

const state = {
  page: document.body?.dataset.page || (document.getElementById('homeProductGrid') ? 'home' : 'product'),
  product: null,
  selectedSizes: {},
  cart: normalizeCart(),
  wishlist: loadJson(WISHLIST_KEY, {}),
  checkout: {
    open: false,
    step: 1,
    mode: 'direct',
    items: [],
    form: { name: '', phone: '', address: '', city: '', state: '', pincode: '' }
  }
};

const saveCart = () => saveJson(CART_KEY, state.cart);
const saveWishlist = () => saveJson(WISHLIST_KEY, state.wishlist);
const selectedSize = (product) => state.selectedSizes[product.id] || product.defaultSize || product.sizes?.[0] || 'L';
const setSelectedSize = (product, size) => {
  state.selectedSizes[product.id] = size;
  document.querySelectorAll(`[data-size-for="${product.id}"]`).forEach(btn => {
    const isActive = btn.dataset.size === size;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
    btn.tabIndex = isActive ? 0 : -1;
  });
  document.querySelectorAll(`[data-stock-line="${product.id}"]`).forEach(el => {
    el.textContent = stockLine(product);
  });
  const selectedText = document.getElementById('selectedSizeText');
  const stickySize = document.getElementById('stickySize');
  if (state.product?.id === product.id) {
    if (selectedText) selectedText.textContent = size;
    if (stickySize) stickySize.textContent = size;
    document.querySelectorAll('#sizeChartModal tbody tr').forEach(row => {
      row.classList.toggle('is-active', row.dataset.size === size);
    });
    updateDetailStockHint();
  }
};

const itemStock = (product, size) => Number(product?.stockBySize?.[size] || 0);
const cartItemProduct = (item) => getProduct(item.id) || getCartProductFallback(item);
const cartItemStock = (item) => itemStock(cartItemProduct(item), item.size);
const cartLimitMessage = (item, stock) => stock > 0
  ? `You already have the maximum available for size ${item.size}`
  : `Size ${item.size} is sold out`;
const cartQtyFor = (productId, size) => state.cart
  .filter(item => item.id === productId && item.size === size)
  .reduce((sum, item) => sum + item.qty, 0);
const makeCheckoutItem = (productId, size, qty = 1) => {
  const product = getProduct(productId);
  if (!product) return null;
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: productImageUrl(product),
    price: product.price,
    size: size || selectedSize(product),
    qty
  };
};
window.makeCheckoutItem = makeCheckoutItem;

const showFlash = (msg) => {
  let flash = document.getElementById('addFlash');
  if (!flash) {
    flash = document.createElement('div');
    flash.id = 'addFlash';
    flash.className = 'add-flash';
    flash.setAttribute('role', 'status');
    document.body.appendChild(flash);
  }
  flash.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12l4 4L19 6"/></svg><span>${escapeHtml(msg)}</span>`;
  flash.classList.add('is-in');
  clearTimeout(flash._t);
  flash._t = setTimeout(() => flash.classList.remove('is-in'), 2200);
};

const cartCount = () => state.cart.reduce((n, i) => n + i.qty, 0);
const cartSubtotal = () => state.cart.reduce((n, i) => n + i.qty * i.price, 0);

const addToCart = (productId, size, qty = 1, options = {}) => {
  const product = getProduct(productId);
  if (!product) return;
  const chosenSize = size || selectedSize(product);
  const stock = itemStock(product, chosenSize);
  if (stock <= 0) {
    showFlash(`Size ${chosenSize} is sold out`);
    return;
  }
  const existing = state.cart.find(i => i.id === product.id && i.size === chosenSize);
  const currentQty = cartQtyFor(product.id, chosenSize);
  const nextQty = currentQty + qty;
  if (nextQty > stock) {
    const remaining = Math.max(0, stock - currentQty);
    showFlash(remaining > 0 ? `Only ${remaining} more available in size ${chosenSize}` : `You already have the maximum available for size ${chosenSize}`);
    return;
  }
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push(makeCheckoutItem(product.id, chosenSize, qty));
  }
  saveCart();
  renderCart();
  showFlash(`Added to bag · size ${chosenSize}`);
  if (options.openDrawer !== false) openDrawer();
};
window.addToCart = addToCart;

// ============================================================
//  HOME RENDERING
// ============================================================
const sizeButtonsHtml = (product, className = 'quick-size-btn') => product.sizes.map((size) => {
  const active = selectedSize(product) === size;
  const stock = itemStock(product, size);
  return `<button class="${className}${active ? ' active' : ''}" data-size-for="${product.id}" data-product-size="${product.id}" data-size="${size}" data-stock="${stock}" role="radio" aria-checked="${active}" tabindex="${active ? '0' : '-1'}" ${stock <= 0 ? 'disabled' : ''}>${escapeHtml(size)}</button>`;
}).join('');

const getHomeReviews = () => PRODUCTS.flatMap(product => (product.reviews || []).map(review => ({
  ...review,
  productName: product.name,
  productUrl: detailUrl(product)
})));

const renderHomeReviews = () => {
  const marquee = document.getElementById('homeReviewMarquee');
  if (!marquee) return;
  const reviews = getHomeReviews();
  if (!reviews.length) {
    marquee.hidden = true;
    return;
  }
  const reviewCards = reviews.map(review => `
    <article class="home-review-card">
      <img class="home-review-photo" src="${escapeHtml(review.photo)}" alt="Customer photo for ${escapeHtml(review.productName)}" loading="lazy" />
      <div class="home-review-stars" aria-label="Rated 5 out of 5">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p class="home-review-quote">${escapeHtml(review.quote)}</p>
      <div class="home-review-meta">
        <span>${escapeHtml(review.name)}</span>
        <strong><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"/></svg>Verified buyer</strong>
      </div>
    </article>
  `).join('');

  marquee.innerHTML = `
    <div class="home-review-track">
      <div class="home-review-group">${reviewCards}</div>
      <div class="home-review-group" aria-hidden="true">${reviewCards}</div>
    </div>
  `;
};

const renderHome = () => {
  const featured = getDefaultProduct();
  const hero = document.getElementById('homeHero');
  const grid = document.getElementById('homeProductGrid');
  if (!featured || !hero || !grid) return;
  grid.classList.remove('is-single');
  const headerImage = 'assets/header.webp';

  hero.innerHTML = `
    <div class="home-hero-media home-hero-banner reveal">
      <a href="${detailUrl(featured)}" aria-label="View ${escapeHtml(featured.name)}">
        <img src="${headerImage}" alt="${escapeHtml(featured.name)} styled on model" fetchpriority="high" />
      </a>
      <div class="home-hero-tag">${escapeHtml(featured.badge)}</div>
    </div>
  `;

  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card reveal">
      <a class="product-card-media" href="${detailUrl(product)}" aria-label="View ${escapeHtml(product.name)}">
        <img class="product-card-img primary" src="${escapeHtml(product.images.main)}" alt="${escapeHtml(product.name)}" loading="lazy" />
        <img class="product-card-img hover" src="${escapeHtml(product.images.hover || product.images.main)}" alt="" loading="lazy" />
        <span class="product-card-badge">Save ${getDiscountPct(product)}%</span>
      </a>
      <div class="product-card-body">
        <div class="product-card-top">
          <div>
            <p class="product-card-category">${escapeHtml(product.category)}</p>
            <h3><a href="${detailUrl(product)}">${escapeHtml(product.name)}</a></h3>
          </div>
          <button class="product-card-wish" type="button" data-wishlist="${product.id}" aria-label="Save ${escapeHtml(product.name)}" aria-pressed="${Boolean(state.wishlist[product.id])}">♡</button>
        </div>
        <p class="product-card-desc">${escapeHtml(product.description)}</p>
        <div class="product-card-price">
          <span>${money(product.price)}</span>
          <del>${money(product.compare)}</del>
          <em>-${getDiscountPct(product)}%</em>
        </div>
        <div class="product-card-rating">${stars}<span>${escapeHtml(product.reviewSummary.rating)} · verified orders</span></div>
        <div class="home-size-grid compact" role="radiogroup" aria-label="Choose size for ${escapeHtml(product.name)}">
          ${sizeButtonsHtml(product)}
        </div>
        <p class="home-stock-line compact" data-stock-line="${product.id}">${stockLine(product)}</p>
        <div class="product-card-actions">
          <button class="buy-btn" type="button" data-buy-product="${product.id}">Buy Now</button>
          <button class="add-cart-btn" type="button" data-add-cart="${product.id}">Add to Bag</button>
        </div>
        <a class="home-text-link product-details-link" href="${detailUrl(product)}">View photos, fit and specs</a>
      </div>
    </article>
  `).join('');

  const count = document.getElementById('dropCount');
  if (count) count.textContent = `${PRODUCTS.length} live product${PRODUCTS.length === 1 ? '' : 's'}`;
  renderHomeReviews();
};

// ============================================================
//  PRODUCT DETAIL RENDERING
// ============================================================
const renderUnavailableProduct = () => {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = `
    <section class="section shell product-empty-state">
      <div class="why-lead">
        <span class="editorial-eyebrow">Product unavailable</span>
        <h1 class="product-title">This drop is not live.</h1>
        <p>The product link does not match a live FVRST item. Head back to the shop to browse the current drop.</p>
        <a class="buy-btn" href="${HOME_URL}#shop">Back to shop</a>
      </div>
    </section>
  `;
};

const renderDetailProduct = () => {
  const buyPanel = document.querySelector('.buy-panel');
  if (!buyPanel) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('product');
  const product = slug ? getProduct(slug) : getDefaultProduct();
  if (!product) {
    renderUnavailableProduct();
    return;
  }
  state.product = product;
  state.selectedSizes[product.id] = selectedSize(product);
  document.title = `${product.name} - FVRST`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', product.description);
  document.querySelector('link[rel="preload"][as="image"]')?.setAttribute('href', product.images.main);

  const galleryStage = document.querySelector('.gallery-stage');
  const galleryThumbs = document.querySelector('.gallery-thumbs');
  if (galleryStage && galleryThumbs) {
    galleryStage.innerHTML = product.images.gallery.map((image, idx) => `
      <figure class="gallery-figure${idx === 0 ? ' active' : ''}" data-view="view-${idx}">
        <span class="gallery-figure-tag">${escapeHtml(image.label)}</span>
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" width="900" height="1125" ${idx === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
      </figure>
    `).join('');
    galleryThumbs.innerHTML = product.images.gallery.map((image, idx) => `
      <button class="gallery-thumb${idx === 0 ? ' active' : ''}" data-view="view-${idx}" role="tab" aria-selected="${idx === 0}" aria-label="View ${escapeHtml(image.label)}">
        <img src="${escapeHtml(image.src)}" alt="" loading="lazy" />
      </button>
    `).join('');
  }

  buyPanel.dataset.productId = product.id;
  buyPanel.querySelector('.product-title').innerHTML = formatTitle(product.name);
  buyPanel.querySelector('.product-dek').textContent = product.description;
  buyPanel.querySelector('.price').textContent = money(product.price);
  buyPanel.querySelector('.compare').textContent = money(product.compare);
  const pill = document.getElementById('discountPill');
  if (pill) {
    pill.textContent = `-${getDiscountPct(product)}% off`;
    pill.classList.add('is-discount');
  }
  const sizeGrid = buyPanel.querySelector('.size-grid');
  if (sizeGrid) sizeGrid.innerHTML = sizeButtonsHtml(product, 'size-btn');
  const fitNote = buyPanel.querySelector('.fit-note');
  if (fitNote) fitNote.textContent = product.fitNotes;
  const stickyPrice = document.querySelector('.sticky-price');
  if (stickyPrice) stickyPrice.innerHTML = `${money(product.price)} · <span id="stickySize">${escapeHtml(selectedSize(product))}</span>`;
  const deliveryDate = document.getElementById('deliveryDate');
  if (deliveryDate) deliveryDate.textContent = formatDeliveryDate(4);
  const reviewText = buyPanel.querySelector('.buy-trust-text');
  if (reviewText) reviewText.textContent = `${product.reviewSummary.rating} · verified buyer photos`;

  const panelUrgency = document.getElementById('panelUrgency');
  if (panelUrgency) panelUrgency.innerHTML = detailUrgencyHtml(product);

  const proofGrid = document.querySelector('#details .proof-grid');
  if (proofGrid) proofGrid.innerHTML = product.proof.map(([title, copy, meta]) => `
    <div class="proof-block">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(copy)}</p>
      <span class="proof-meta">${escapeHtml(meta)}</span>
    </div>
  `).join('');
  const specList = document.querySelector('.spec-list');
  if (specList) specList.innerHTML = product.specs.map(([key, value]) => `
    <div class="spec-row"><span class="spec-key">${escapeHtml(key)}</span><span class="spec-val">${escapeHtml(value)}</span></div>
  `).join('');
  const motion = document.querySelector('#tee-gallery .tee-gallery');
  if (motion) motion.innerHTML = product.images.motion.map(image => `
    <div class="tee-card${image.tall ? ' tall' : ''}"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" /></div>
  `).join('');
  const reviewSummary = document.querySelector('.review-summary');
  if (reviewSummary) reviewSummary.innerHTML = `<span class="review-summary-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>${escapeHtml(product.reviewSummary.rating)} · ${escapeHtml(product.reviewSummary.text)}</span>`;
  const reviewGrid = document.querySelector('.review-grid');
  if (reviewGrid) reviewGrid.innerHTML = product.reviews.map(review => `
    <article class="review-card">
      <img class="review-card-photo" src="${escapeHtml(review.photo)}" alt="Customer photo of ${escapeHtml(product.name)}" loading="lazy" />
      <div class="review-stars" aria-label="Rated 5 out of 5">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p class="review-quote">${escapeHtml(review.quote)}</p>
      <div class="review-meta">
        <span>${escapeHtml(review.name)}</span>
        <span class="review-verified"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"/></svg>Verified buyer</span>
      </div>
    </article>
  `).join('');

  updateDetailStockHint();
};

const updateDetailStockHint = () => {
  const product = state.product;
  const stockHint = document.getElementById('stockHint');
  if (!product || !stockHint) return;
  const size = selectedSize(product);
  const stock = itemStock(product, size);
  if (stock === 0) {
    stockHint.textContent = `Size ${size} is sold out - pick another size.`;
    stockHint.classList.remove('is-low');
  } else if (stock <= 4) {
    stockHint.textContent = `Only ${stock} left in size ${size} - selling fast`;
    stockHint.classList.add('is-low');
  } else {
    stockHint.textContent = 'In stock · ships in 3-5 days';
    stockHint.classList.remove('is-low');
  }
};

// ============================================================
//  GALLERY / LIGHTBOX / REVEAL
// ============================================================
const initGallery = () => {
  const figures = document.querySelectorAll('.gallery-figure');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!figures.length) return;
  const order = Array.from(figures).map(f => f.dataset.view);
  let currentIndex = 0;
  const setView = (index) => {
    currentIndex = (index + order.length) % order.length;
    const view = order[currentIndex];
    figures.forEach(f => f.classList.toggle('active', f.dataset.view === view));
    thumbs.forEach(t => {
      const isActive = t.dataset.view === view;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });
  };
  thumbs.forEach((t, i) => t.addEventListener('click', () => setView(i)));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let timer = setInterval(() => setView(currentIndex + 1), 5000);
  const stage = document.querySelector('.gallery-stage');
  if (stage) {
    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', () => { timer = setInterval(() => setView(currentIndex + 1), 5000); });
  }
};

const initReveal = () => {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(i => io.observe(i));
};

const initLightbox = () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg || !lightboxClose) return;
  const open = (img) => {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.tee-card img, .gallery-figure img, .ugc-tile img').forEach(img => {
    img.addEventListener('click', () => open(img));
  });
  lightboxClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
};

// ============================================================
//  CART DRAWER
// ============================================================
const drawer = () => document.getElementById('cartDrawer');
const overlay = () => document.getElementById('cartOverlay');
const renderCart = () => {
  const body = document.getElementById('cartDrawerBody');
  const foot = document.getElementById('cartDrawerFoot');
  const headerCount = document.getElementById('headerCartCount');
  if (headerCount) {
    const count = cartCount();
    headerCount.hidden = count === 0;
    headerCount.textContent = String(count);
  }
  if (body) {
    body.innerHTML = state.cart.length ? state.cart.map((item, idx) => {
      const stock = cartItemStock(item);
      const atMax = stock > 0 && item.qty >= stock;
      return `
      <div class="cart-item" data-idx="${idx}">
        <img class="cart-item-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-meta">Size ${escapeHtml(item.size)}</div>
          <div class="cart-item-row">
            <div class="qty-stepper" role="group" aria-label="Quantity for ${escapeHtml(item.name)}">
              <button class="qty-btn" data-act="dec" data-idx="${idx}" aria-label="Decrease quantity" type="button">-</button>
              <span class="qty-val" aria-live="polite">${item.qty}</span>
              <button class="qty-btn" data-act="inc" data-idx="${idx}" aria-label="Increase quantity" type="button" ${atMax ? 'disabled' : ''}>+</button>
            </div>
            <span class="cart-item-price">${money(item.price * item.qty)}</span>
          </div>
          <button class="cart-item-remove" data-act="rem" data-idx="${idx}" type="button">Remove</button>
        </div>
      </div>
    `;
    }).join('') : `
      <div class="cart-empty">
        <div class="cart-empty-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14l-1.5 12h-11z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></div>
        <strong>Your bag is empty</strong>
        <p>Add a product from the drop to see it here.</p>
      </div>`;
  }
  if (foot) {
    if (!state.cart.length) {
      foot.innerHTML = '';
    } else {
      const subtotal = cartSubtotal();
      const delivery = getDelivery(subtotal);
      const total = subtotal + delivery;
      foot.innerHTML = `
        <div class="cart-totals">
          <div class="totals-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="totals-row"><span>Delivery</span><span>${delivery === 0 ? '<span class="free">FREE</span>' : money(delivery)}</span></div>
          <div class="totals-row total"><span>Total</span><span>${money(total)}</span></div>
        </div>
        <button class="cart-checkout-btn" type="button" data-cart-checkout>Checkout · ${money(total)}</button>
        <button class="cart-continue" type="button" data-cart-close>Continue shopping</button>
      `;
    }
  }
};

const openDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  d.classList.add('is-open');
  o.classList.add('is-open');
  d.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  d.classList.remove('is-open');
  o.classList.remove('is-open');
  d.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// ============================================================
//  MODALS / CHECKOUT
// ============================================================
const focusTrap = (() => {
  let active = null;
  let previouslyFocused = null;
  const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const onKey = (e) => {
    if (!active) return;
    if (e.key === 'Escape') { closeActive(); return; }
    if (e.key !== 'Tab') return;
    const nodes = active.querySelectorAll(FOCUSABLE);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  const open = (modal) => {
    if (!modal) return;
    if (active && active !== modal) closeActive();
    previouslyFocused = document.activeElement;
    active = modal;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const target = modal.querySelector(FOCUSABLE);
    if (target) setTimeout(() => target.focus(), 50);
    document.addEventListener('keydown', onKey);
  };
  const closeActive = () => {
    if (!active) return;
    active.classList.remove('is-open');
    active.setAttribute('aria-hidden', 'true');
    active = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
  };
  return { open, close: closeActive };
})();

const checkoutModal = () => document.getElementById('checkoutModal');
const checkoutContent = () => document.getElementById('checkoutContent');
const getCheckoutItems = () => state.checkout.items.length ? state.checkout.items : [];
const getCheckoutSubtotal = () => getCheckoutItems().reduce((sum, item) => sum + item.price * item.qty, 0);
const getCheckoutDelivery = () => getDelivery(getCheckoutSubtotal());
const getCheckoutTotal = () => getCheckoutSubtotal() + getCheckoutDelivery();
const getCheckoutQuantity = () => getCheckoutItems().reduce((sum, item) => sum + item.qty, 0);
const getCheckoutSizeSummary = () => getCheckoutItems().map(item => `${item.name} / ${item.size} x ${item.qty}`).join('; ');
const getCheckoutProductNameSummary = () => getCheckoutItems().map(item => item.name).join('; ');
const checkoutColumnAliases = {
  fullName: ['Full Name', 'fullName', 'full_name', 'name'],
  phone: ['Phone Number', 'phone', 'phone_number'],
  address: ['Full Address', 'full_address', 'address'],
  city: ['City', 'city'],
  state: ['State', 'state'],
  pincode: ['PIN Code', 'pincode', 'pin_code'],
  productName: ['product name', 'product_name', 'Product Name', 'product'],
  price: ['price', 'total', 'amount'],
  quantity: ['quantity', 'qty'],
  size: ['size', 'items']
};
const buildCheckoutOrderValues = () => ({
  fullName: state.checkout.form.name,
  phone: state.checkout.form.phone,
  address: state.checkout.form.address,
  city: state.checkout.form.city,
  state: state.checkout.form.state,
  pincode: state.checkout.form.pincode,
  productName: getCheckoutProductNameSummary(),
  price: String(getCheckoutTotal()),
  quantity: String(getCheckoutQuantity()),
  size: getCheckoutSizeSummary()
});
const buildCheckoutOrderData = (values, aliasIndexes = {}, skippedKeys = {}) => Object.entries(values).reduce((payload, [key, value]) => {
  if (skippedKeys[key]) return payload;
  const aliases = checkoutColumnAliases[key] || [key];
  const index = Math.min(aliasIndexes[key] || 0, aliases.length - 1);
  payload[aliases[index]] = value;
  return payload;
}, {});
const getMissingCheckoutColumn = (error) => {
  const message = String(error?.message || '');
  return message.match(/'([^']+)' column/)?.[1] || message.match(/column "([^"]+)"/)?.[1] || '';
};
const nextCheckoutAliasIndexes = (aliasIndexes, missingColumn) => {
  const entry = Object.entries(checkoutColumnAliases).find(([, aliases]) => aliases.includes(missingColumn));
  if (!entry) return null;
  const [key, aliases] = entry;
  const current = aliases.indexOf(missingColumn);
  if (current < 0) return null;
  if (current >= aliases.length - 1) return { skipKey: key };
  return { aliasIndexes: { ...aliasIndexes, [key]: current + 1 } };
};
const isCheckoutPolicyError = (error) => String(error?.code || '') === '42501'
  || /row-level security/i.test(String(error?.message || ''));
const checkoutErrorMessage = (error) => isCheckoutPolicyError(error)
  ? 'Order service is blocking public checkout inserts. Enable an insert policy for the checkout table in Supabase.'
  : error?.message || 'Please try again.';
const submitCheckoutOrder = async () => {
  const values = buildCheckoutOrderValues();
  let aliasIndexes = {};
  let skippedKeys = {};
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const orderData = buildCheckoutOrderData(values, aliasIndexes, skippedKeys);
    const { error } = await supabaseClient.from('checkout').insert([orderData]);
    if (!error) return null;
    const next = nextCheckoutAliasIndexes(aliasIndexes, getMissingCheckoutColumn(error));
    if (!next) return error;
    console.warn('Retrying checkout insert with alternate column name:', error.message);
    if (next.skipKey) skippedKeys = { ...skippedKeys, [next.skipKey]: true };
    else aliasIndexes = next.aliasIndexes;
  }
  return new Error('Checkout schema did not match any supported column names.');
};

const validators = {
  name: v => v.trim().length >= 2,
  phone: v => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '')),
  address: v => v.trim().length >= 6,
  city: v => v.trim().length >= 2,
  state: v => v.trim().length >= 2,
  pincode: v => /^\d{6}$/.test(v.trim())
};
const formValid = () => Object.entries(state.checkout.form).every(([k, v]) => validators[k](v));
const fieldError = (key) => ({
  name: 'Please enter your name',
  phone: 'Enter a valid 10-digit mobile number',
  address: 'Address looks too short',
  city: 'Enter your city',
  state: 'Enter your state',
  pincode: 'Enter a valid 6-digit PIN'
})[key] || '';

const stepperHtml = (step) => {
  const items = [['1', 'Confirm'], ['2', 'Details'], ['3', 'Done']];
  return `<div class="checkout-stepper" aria-label="Checkout steps">
    ${items.map(([n, l]) => `<div class="checkout-step ${step >= Number(n) ? 'is-active' : ''}"><span class="checkout-step-dot">${n}</span><span>${l}</span></div>`).join('')}
  </div>`;
};
const renderCheckoutItems = () => getCheckoutItems().map(item => `
  <div class="checkout-product-card" style="margin-top:14px;">
    <img class="checkout-product-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
    <div class="checkout-product-info">
      <strong>${escapeHtml(item.name)}</strong>
      <span>Size: <strong>${escapeHtml(item.size)}</strong> · Qty: <strong>${item.qty}</strong></span>
      <span class="checkout-price">${money(item.price * item.qty)}</span>
    </div>
  </div>
`).join('');

const renderStep1 = () => {
  const subtotal = getCheckoutSubtotal();
  const delivery = getCheckoutDelivery();
  const total = getCheckoutTotal();
  return `${stepperHtml(1)}
    <h2 class="modal-title" id="checkoutTitle-1">Confirm your order</h2>
    <p class="modal-sub">Quick checkout. No account needed. Pay when the order reaches you.</p>
    ${renderCheckoutItems()}
    <div class="checkout-totals">
      <div class="totals-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div class="totals-row"><span>Delivery</span><span>${delivery === 0 ? '<strong style="color:var(--success);">FREE</strong>' : money(delivery)}</span></div>
      ${delivery === 0 ? '<div class="checkout-freeship">Free shipping unlocked</div>' : ''}
      <div class="totals-row total"><span>Total</span><span>${money(total)}</span></div>
    </div>
    <div class="checkout-actions" style="margin-top:20px;">
      <button class="btn-primary" type="button" data-next-step>Continue</button>
    </div>`;
};

const renderStep2 = () => {
  const f = state.checkout.form;
  const subtotal = getCheckoutSubtotal();
  const delivery = getCheckoutDelivery();
  const total = getCheckoutTotal();
  return `${stepperHtml(2)}
    <h2 class="modal-title" id="checkoutTitle-2">Delivery details</h2>
    <p class="modal-sub">Pay when you receive. We'll call to confirm before dispatch.</p>
    <form id="checkoutForm" novalidate style="margin-top:18px;">
      <div class="form-grid">
        <div class="field"><label for="ck-name">Name</label><input id="ck-name" name="name" type="text" value="${escapeHtml(f.name)}" placeholder="Your name" autocomplete="name" data-field="name" /><span class="field-error" data-error-for="name"></span></div>
        <div class="field"><label for="ck-phone">Phone number</label><input id="ck-phone" name="phone" type="tel" value="${escapeHtml(f.phone)}" placeholder="10-digit mobile" autocomplete="tel" data-field="phone" /><span class="field-error" data-error-for="phone"></span></div>
        <div class="field"><label for="ck-address">Address</label><textarea id="ck-address" name="address" placeholder="House number, street, area" autocomplete="street-address" data-field="address">${escapeHtml(f.address)}</textarea><span class="field-error" data-error-for="address"></span></div>
        <div class="form-grid form-grid-3">
          <div class="field"><label for="ck-city">City</label><input id="ck-city" name="city" type="text" value="${escapeHtml(f.city)}" placeholder="City" autocomplete="address-level2" data-field="city" /><span class="field-error" data-error-for="city"></span></div>
          <div class="field"><label for="ck-state">State</label><input id="ck-state" name="state" type="text" value="${escapeHtml(f.state)}" placeholder="State" autocomplete="address-level1" data-field="state" /><span class="field-error" data-error-for="state"></span></div>
          <div class="field"><label for="ck-pin">PIN code</label><input id="ck-pin" name="pincode" type="text" value="${escapeHtml(f.pincode)}" placeholder="6-digit PIN" autocomplete="postal-code" data-field="pincode" /><span class="field-error" data-error-for="pincode"></span></div>
        </div>
      </div>
      <div class="payment-option"><div class="payment-check">✓</div><div><strong>Cash on Delivery</strong><span>Pay when you receive your order</span></div></div>
      <div class="checkout-totals">
        <div class="totals-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
        <div class="totals-row"><span>Delivery</span><span>${delivery === 0 ? '<strong style="color:var(--success);">FREE</strong>' : money(delivery)}</span></div>
        ${delivery === 0 ? '<div class="checkout-freeship">Free shipping unlocked</div>' : ''}
        <div class="totals-row total"><span>Total</span><span>${money(total)}</span></div>
      </div>
      <div class="checkout-actions">
        <button class="btn-secondary" type="button" data-prev-step>Back</button>
        <button class="btn-primary" type="submit" data-place-order ${formValid() ? '' : 'disabled'}>Place order (COD)</button>
      </div>
    </form>`;
};

const renderStep3 = () => `<div class="success-screen">
  <div class="success-check" aria-hidden="true">✓</div>
  <h2 class="modal-title" id="checkoutTitle-3">Order confirmed</h2>
  <p class="modal-sub" style="margin-top:10px;">Thank you. We'll call you on ${escapeHtml(state.checkout.form.phone) || 'your number'} to confirm your order. Delivery in 3-5 business days.</p>
  <div class="checkout-actions" style="justify-content:center;margin-top:24px;"><button class="btn-primary" type="button" data-close-checkout>Done</button></div>
</div>`;

const renderCheckout = () => {
  const content = checkoutContent();
  if (!content) return;
  content.innerHTML = state.checkout.step === 1 ? renderStep1() : state.checkout.step === 2 ? renderStep2() : renderStep3();
  setTimeout(() => content.querySelector('[data-next-step], [data-prev-step], [data-place-order], [data-close-checkout]')?.focus(), 30);
  if (state.checkout.step === 2) {
    const fields = content.querySelectorAll('[data-field]');
    const update = () => {
      let allValid = true;
      fields.forEach(f => {
        const key = f.dataset.field;
        state.checkout.form[key] = f.value;
        const valid = validators[key](f.value);
        const wrap = f.closest('.field');
        const errorEl = wrap?.querySelector('[data-error-for]');
        wrap?.classList.toggle('is-valid', valid);
        wrap?.classList.toggle('is-invalid', !valid);
        if (errorEl) errorEl.textContent = (!valid && f.value.length > 0) ? fieldError(key) : '';
        if (!valid) allValid = false;
      });
      content.querySelector('[data-place-order]')?.toggleAttribute('disabled', !allValid);
    };
    fields.forEach(f => {
      f.addEventListener('input', update);
      f.addEventListener('blur', update);
    });
    update();
  }
};

const openCheckout = (options = {}) => {
  const product = options.productId ? getProduct(options.productId) : state.product;
  const incomingItems = Array.isArray(options.items) && options.items.length
    ? options.items.map(item => ({ ...item }))
    : product ? [makeCheckoutItem(product.id, options.size || selectedSize(product), 1)] : [];
  if (!incomingItems.length) return;
  state.checkout = {
    open: true,
    step: 1,
    mode: options.mode || 'direct',
    items: incomingItems,
    form: { name: '', phone: '', address: '', city: '', state: '', pincode: '' }
  };
  renderCheckout();
  focusTrap.open(checkoutModal());
};

const closeCheckout = () => {
  focusTrap.close();
  state.checkout.open = false;
};

// ============================================================
//  EVENTS
// ============================================================
const bindEvents = () => {
  document.getElementById('siteHeader') && window.addEventListener('scroll', () => {
    document.getElementById('siteHeader').classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  document.getElementById('openCartBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });
  document.getElementById('cartDrawerClose')?.addEventListener('click', closeDrawer);
  overlay()?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.addEventListener('click', (e) => {
    const sizeBtn = e.target.closest('[data-product-size]');
    if (sizeBtn) {
      const product = getProduct(sizeBtn.dataset.productSize);
      if (product && !sizeBtn.disabled) setSelectedSize(product, sizeBtn.dataset.size);
      return;
    }
    const addBtn = e.target.closest('[data-add-cart]');
    if (addBtn) {
      e.preventDefault();
      const product = getProduct(addBtn.dataset.addCart);
      if (product) addToCart(product.id, selectedSize(product), 1);
      return;
    }
    const buyBtn = e.target.closest('[data-buy-product]');
    if (buyBtn) {
      e.preventDefault();
      const product = getProduct(buyBtn.dataset.buyProduct);
      if (product) openCheckout({ productId: product.id, size: selectedSize(product) });
      return;
    }
    const wishlistBtn = e.target.closest('[data-wishlist], #wishlistBtn');
    if (wishlistBtn) {
      e.preventDefault();
      const productId = wishlistBtn.dataset.wishlist || state.product?.id;
      if (!productId) return;
      state.wishlist[productId] = !state.wishlist[productId];
      saveWishlist();
      wishlistBtn.classList.toggle('is-on', Boolean(state.wishlist[productId]));
      wishlistBtn.setAttribute('aria-pressed', String(Boolean(state.wishlist[productId])));
      showFlash(state.wishlist[productId] ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });

  document.getElementById('addCartBtn')?.addEventListener('click', () => {
    if (state.product) addToCart(state.product.id, selectedSize(state.product), 1);
  });
  document.getElementById('mainBuyBtn')?.addEventListener('click', () => {
    if (state.product) openCheckout({ productId: state.product.id, size: selectedSize(state.product) });
  });
  document.getElementById('stickyBuyBtn')?.addEventListener('click', () => {
    if (state.product) openCheckout({ productId: state.product.id, size: selectedSize(state.product) });
  });

  const cartBody = document.getElementById('cartDrawerBody');
  cartBody?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const item = state.cart[idx];
    if (!item) return;
    if (btn.dataset.act === 'inc') {
      const stock = cartItemStock(item);
      if (item.qty + 1 > stock) { showFlash(cartLimitMessage(item, stock)); return; }
      item.qty += 1;
    } else if (btn.dataset.act === 'dec') {
      item.qty = Math.max(1, item.qty - 1);
    } else if (btn.dataset.act === 'rem') {
      state.cart.splice(idx, 1);
    }
    saveCart();
    renderCart();
  });

  document.getElementById('cartDrawerFoot')?.addEventListener('click', (e) => {
    if (e.target.closest('[data-cart-checkout]')) {
      closeDrawer();
      openCheckout({ mode: 'cart', items: state.cart });
    } else if (e.target.closest('[data-cart-close]')) {
      closeDrawer();
    }
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => focusTrap.close()));
  document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => {
    if (e.target === modal) focusTrap.close();
  }));
  const modalMap = {
    openSizeChart2: 'sizeChartModal',
    openSizeChart3: 'sizeChartModal',
    openSizeChartFoot: 'sizeChartModal',
    openShippingFoot: 'shippingModal',
    openReturnsFoot: 'returnsModal',
    openContactFoot: 'contactModal',
    openPrivacyFoot: 'privacyModal',
    openTermsFoot: 'termsModal'
  };
  Object.entries(modalMap).forEach(([triggerId, modalId]) => {
    document.getElementById(triggerId)?.addEventListener('click', (e) => {
      e.preventDefault();
      focusTrap.open(document.getElementById(modalId));
    });
  });

  checkoutContent()?.addEventListener('click', (e) => {
    if (e.target.closest('[data-next-step]')) {
      state.checkout.step = 2;
      renderCheckout();
    } else if (e.target.closest('[data-prev-step]')) {
      state.checkout.step = 1;
      renderCheckout();
    } else if (e.target.closest('[data-close-checkout]')) {
      closeCheckout();
    }
  });

  checkoutContent()?.addEventListener('submit', async (e) => {
    if (!e.target.matches('#checkoutForm')) return;
    e.preventDefault();
    const fields = checkoutContent().querySelectorAll('[data-field]');
    let valid = true;
    let firstInvalid = null;
    fields.forEach(f => {
      if (!validators[f.dataset.field](f.value)) {
        valid = false;
        if (!firstInvalid) firstInvalid = f;
      }
    });
    if (!valid) {
      firstInvalid?.focus();
      return;
    }
    if (!supabaseClient) {
      alert('Order service is still loading. Please refresh or contact us at FVRST@proton.me.');
      return;
    }
    try {
      const error = await submitCheckoutOrder();
      if (error) {
        console.error('Supabase error:', error);
        alert('Order failed: ' + checkoutErrorMessage(error));
        return;
      }
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Order failed. Please try again.');
      return;
    }
    if (state.checkout.mode === 'cart') {
      state.cart = [];
      saveCart();
      renderCart();
    }
    state.checkout.step = 3;
    renderCheckout();
  });
};

const initStickyCta = () => {
  const sticky = document.getElementById('stickyCta');
  const buyPanel = document.querySelector('.buy-panel');
  if (!sticky || !buyPanel) return;
  const onScroll = () => {
    const rect = buyPanel.getBoundingClientRect();
    const isPast = rect.bottom < window.innerHeight * 0.5;
    sticky.style.display = isPast ? 'flex' : '';
    sticky.setAttribute('aria-hidden', String(!isPast));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

const initFomo = () => {
  const stack = document.getElementById('fomoStack');
  const product = state.product || getDefaultProduct();
  if (!stack || !product) return;
  const buyers = [
    { initial: 'A', name: 'Arnav from Mumbai' },
    { initial: 'P', name: 'Priya from Bengaluru' },
    { initial: 'R', name: 'Rohan from Delhi' },
    { initial: 'S', name: 'Sneha from Hyderabad' }
  ].sort(() => Math.random() - 0.5).slice(0, 2);
  const createCard = (buyer) => {
    const card = document.createElement('div');
    card.className = 'fomo-card';
    card.innerHTML = `
      <div class="fomo-avatar" aria-hidden="true">${escapeHtml(buyer.initial)}</div>
      <div class="fomo-body">
        <div class="fomo-line1"><strong>${escapeHtml(buyer.name)}</strong> just ordered size ${escapeHtml(selectedSize(product))}</div>
        <div class="fomo-line2"><span class="fomo-dot"></span> ${escapeHtml(product.name)}</div>
      </div>
      <button class="fomo-close" type="button" aria-label="Dismiss notification"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="fomo-progress"></div>`;
    const removeCard = () => {
      card.classList.remove('is-in');
      card.classList.add('is-out');
      setTimeout(() => card.remove(), 340);
    };
    card.querySelector('.fomo-close').addEventListener('click', removeCard);
    stack.appendChild(card);
    setTimeout(() => card.classList.add('is-in'), 60);
    setTimeout(removeCard, 4060);
  };
  setTimeout(() => createCard(buyers[0]), 12000);
  setTimeout(() => createCard(buyers[1]), 24000);
};

const initHomeTrustStrip = () => {
  const track = document.querySelector('.home-trust-strip .trust-strip-track');
  const firstGroup = track?.querySelector('.trust-strip-group');
  if (!track || !firstGroup) return;

  const itemHtml = firstGroup.innerHTML;
  const build = () => {
    track.innerHTML = `<div class="trust-strip-group" aria-hidden="false">${itemHtml}</div>`;
    const groupWidth = track.firstElementChild?.getBoundingClientRect().width || 0;
    if (!groupWidth) return;
    const groupsPerLoop = Math.max(2, Math.ceil((window.innerWidth * 1.25) / groupWidth) + 1);
    track.innerHTML = Array.from({ length: groupsPerLoop * 2 }, (_, idx) =>
      `<div class="trust-strip-group" aria-hidden="${idx === 0 ? 'false' : 'true'}">${itemHtml}</div>`
    ).join('');
    track.style.animationDuration = `${Math.max(44, groupsPerLoop * 14)}s`;
  };

  build();
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 180);
  }, { passive: true });
};

document.addEventListener('DOMContentLoaded', () => {
  if (state.page === 'home') renderHome();
  if (state.page === 'product') renderDetailProduct();
  if (state.page === 'home') initHomeTrustStrip();
  bindEvents();
  renderCart();
  initGallery();
  initReveal();
  initLightbox();
  initStickyCta();
});
