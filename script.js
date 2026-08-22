/* ============================================================
   HAWKS — Chinese Kitchen
   Combined JavaScript (Home / Full Menu / Contact & Checkout)
   Each block checks for its elements first, so this single file
   is safe to include on all three pages without errors.
   ============================================================ */

/* ================= PRELOADER ================= */
(function(){
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  function hidePreloader(){ preloader.classList.add('is-hidden'); }
  window.addEventListener('load', () => setTimeout(hidePreloader, 450));
  setTimeout(hidePreloader, 2600); // fallback safety net
})();

/* ================= SHARED DISH DATA ================= */
/* Home page menu uses the base set; Full Menu page adds beverages. */
const DISHES = [
  {id:'d1', cat:'starters', name:'Spring Rolls', desc:'Crispy rolls packed with fresh vegetables, served with sweet chilli dip.', price:450,
    img:'https://images.pexels.com/photos/35407775/pexels-photo-35407775.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d2', cat:'starters', name:'Steamed Chicken Dumplings', desc:'Hand-folded dumplings steamed in bamboo baskets, soy-vinegar dip.', price:550,
    img:'https://images.pexels.com/photos/32860323/pexels-photo-32860323.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d3', cat:'starters', name:'Crispy Chilli Chicken', desc:'Double-fried chicken tossed in a sticky chilli-garlic glaze.', price:850,
    img:'https://images.pexels.com/photos/29631422/pexels-photo-29631422.jpeg?auto=compress&cs=tinysrgb&w=800', badge:'Spicy'},
  {id:'d4', cat:'soups', name:'Hot & Sour Soup', desc:'Peppery, tangy chicken broth with mushroom, tofu and bamboo shoots.', price:450,
    img:'https://images.pexels.com/photos/7492246/pexels-photo-7492246.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d5', cat:'soups', name:'Wonton Soup', desc:'Silky chicken dumplings simmered in a light, fragrant broth.', price:480,
    img:'https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d6', cat:'soups', name:'Chicken Corn Soup', desc:'Comforting, hearty broth with shredded chicken, corn and egg ribbons.', price:420,
    img:'https://images.pexels.com/photos/7474164/pexels-photo-7474164.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d7', cat:'mains', name:'Kung Pao Chicken', desc:'Wok-tossed chicken, roasted peanuts and dried chilli in a Sichuan glaze.', price:950,
    img:'https://images.pexels.com/photos/30708204/pexels-photo-30708204.jpeg?auto=compress&cs=tinysrgb&w=800', badge:'Bestseller'},
  {id:'d8', cat:'mains', name:'Sweet & Sour Chicken', desc:'Crispy chicken tossed with peppers, pineapple and a tangy red glaze.', price:900,
    img:'https://images.pexels.com/photos/5848495/pexels-photo-5848495.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d9', cat:'mains', name:'Chicken Manchurian', desc:'Pan-fried chicken in a bold garlic-soy gravy — a Hawks favourite.', price:850,
    img:'https://images.pexels.com/photos/28445828/pexels-photo-28445828.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d10', cat:'mains', name:"Peking Duck (Half)", desc:'Slow-roasted duck, crisp skin, served with pancakes and hoisin.', price:2800,
    img:'https://images.pexels.com/photos/7363758/pexels-photo-7363758.jpeg?auto=compress&cs=tinysrgb&w=800', badge:"Chef's Signature"},
  {id:'d11', cat:'noodles', name:'Chicken Chow Mein', desc:'Stir-fried noodles, chicken and crunchy vegetables in a smoky wok glaze.', price:650,
    img:'https://images.pexels.com/photos/4223915/pexels-photo-4223915.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d12', cat:'noodles', name:'Yangchow Fried Rice', desc:'Wok-fired rice with chicken, egg, prawns and spring onion.', price:650,
    img:'https://images.pexels.com/photos/36388451/pexels-photo-36388451.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d13', cat:'noodles', name:'Egg Fried Rice', desc:'Classic wok-fired rice with egg ribbons, spring onion and light soy.', price:500,
    img:'https://images.pexels.com/photos/19792090/pexels-photo-19792090.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'b1', cat:'beverages', name:'Fresh Lemon Iced Tea', desc:'Chilled black tea with lemon slices and mint — bright and refreshing.', price:280,
    img:'https://images.pexels.com/photos/316891/pexels-photo-316891.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'b2', cat:'beverages', name:'Classic Iced Tea', desc:'Cold-brewed tea served tall over ice with a striped straw.', price:250,
    img:'https://images.pexels.com/photos/1484678/pexels-photo-1484678.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'b3', cat:'beverages', name:'Jasmine Green Tea', desc:'Light, floral green tea leaves, steeped fresh to order.', price:220,
    img:'https://images.pexels.com/photos/4390014/pexels-photo-4390014.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d14', cat:'desserts', name:'Chocolate Lava Cake', desc:'Warm molten chocolate cake with a gooey centre, vanilla ice cream on the side.', price:500,
    img:'https://images.pexels.com/photos/33803906/pexels-photo-33803906.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'d15', cat:'desserts', name:'Vanilla Ice Cream', desc:'Two scoops of creamy vanilla, served chilled — the simple way to finish.', price:350,
    img:'https://images.pexels.com/photos/14573733/pexels-photo-14573733.jpeg?auto=compress&cs=tinysrgb&w=800'},
];
const CATS = ['starters','soups','mains','noodles','beverages','desserts'];

const REVIEWS = [
  {name:'Ayesha R.', tag:'Regular Guest', stars:5, text:'The Kung Pao Chicken has real Sichuan heat — closest I\u2019ve had to Beijing without leaving Faisalabad. Delivery took only 25 minutes.'},
  {name:'Bilal S.', tag:'Verified Order', stars:5, text:'Ordered the Peking Duck for our anniversary — the skin was perfectly crisp and the pancakes were a lovely touch. Worth every rupee.'},
  {name:'Sana M.', tag:'Dine-In Guest', stars:4, text:'Cozy ambience for a Friday dinner with the family. The dumplings sell out fast for a reason — get there early.'},
  {name:'Hamza T.', tag:'Regular Guest', stars:5, text:'My go-to order is the Chow Mein and Chilli Chicken — consistent, hot, and never soggy on delivery.'},
  {name:'Fatima N.', tag:'Verified Order', stars:5, text:'Hawks has genuinely spoiled us for every other Chinese place in the city. The Manchurian gravy is unreal.'},
];

/* ================= HELPERS ================= */
const fmt = n => 'Rs. ' + n.toLocaleString('en-PK');
let cart = {};

/* ================= NAVBAR ================= */
(function(){
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobilePanel = document.getElementById('mobilePanel');
  const backToTop = document.getElementById('backToTop');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 700);
  }, {passive:true});

  if (hamburger && mobilePanel) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      mobilePanel.classList.toggle('is-open');
    });
    mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('is-open'); mobilePanel.classList.remove('is-open');
    }));
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  }
})();

/* ================= HOME PAGE: SCROLLSPY NAV ================= */
(function(){
  const homeSections = ['home','menu','order','reviews','contact'];
  const navA = document.querySelectorAll('.nav-links a');
  if (!document.getElementById('home')) return; // only run on home page

  window.addEventListener('scroll', () => {
    let current = 'home';
    homeSections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }, {passive:true});
})();

/* ================= MENU PAGE: CATEGORY SCROLLSPY ================= */
(function(){
  const catChips = document.querySelectorAll('.cat-chip');
  if (!catChips.length) return;
  const catSections = CATS.map(c => document.getElementById('cat-' + c)).filter(Boolean);
  window.addEventListener('scroll', () => {
    let current = catSections[0] ? catSections[0].id : '';
    catSections.forEach(sec => { if (sec && window.scrollY >= sec.offsetTop - 140) current = sec.id; });
    catChips.forEach(chip => chip.classList.toggle('active', chip.dataset.cat === current));
  }, {passive:true});
})();

/* ================= VIDEO AUTOPLAY SAFETY (Home page) ================= */
(function(){
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) { heroVideo.muted = true; heroVideo.play().catch(()=>{}); }
})();

/* ================= REVEAL ON SCROLL (shared) ================= */
document.querySelectorAll('.reveal').forEach(el => {
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
  }, {threshold:.12});
  io.observe(el);
});

/* ================= TOAST (shared) ================= */
function showToast(msg){
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('is-visible');
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(()=>t.classList.remove('is-visible'), 3200);
}

/* ================= DISH CARD MARKUP (shared) ================= */
function dishCard(d){
  return `<div class="dish-card" data-cat="${d.cat}">
    <div class="dish-media">
      <img src="${d.img}" alt="${d.name}" loading="lazy">
      ${d.badge ? `<span class="dish-badge">${d.badge}</span>` : ''}
      <button class="dish-add" data-id="${d.id}" aria-label="Add ${d.name} to order"><i class="fa-solid fa-plus"></i></button>
    </div>
    <div class="dish-body">
      <div class="dish-top"><span class="dish-name">${d.name}</span><span class="dish-price">${fmt(d.price)}</span></div>
      <p class="dish-desc">${d.desc}</p>
    </div>
  </div>`;
}

/* ================= HOME PAGE: MENU GRID (tabbed) ================= */
(function(){
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;

  function renderMenuGrid(cat){
    const list = cat === 'all' ? DISHES : DISHES.filter(d => d.cat === cat);
    menuGrid.innerHTML = list.map(dishCard).join('');
    menuGrid.querySelectorAll('.dish-add').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.id, true)));
  }
  renderMenuGrid('all');
  document.querySelectorAll('.menu-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenuGrid(tab.dataset.cat);
  }));
})();

/* ================= FULL MENU PAGE: PER-CATEGORY SECTIONS ================= */
(function(){
  const grids = document.querySelectorAll('[data-cat-grid]');
  if (!grids.length) return;
  grids.forEach(grid => {
    const cat = grid.dataset.catGrid;
    const list = DISHES.filter(d => d.cat === cat);
    grid.innerHTML = list.map(dishCard).join('');
    grid.querySelectorAll('.dish-add').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.id, true)));
  });
})();

/* ================= ORDER PICKER (Home & Full Menu pages) ================= */
function orderRow(d){
  const qty = cart[d.id] || 0;
  return `<div class="order-row" data-cat="${d.cat}" data-id="${d.id}">
    <img src="${d.img}" alt="${d.name}">
    <div class="order-row-body">
      <div class="order-row-name">${d.name}</div>
      <div class="order-row-price">${fmt(d.price)}</div>
    </div>
    <div class="qty-control">
      <button class="qty-btn" data-action="dec" data-id="${d.id}" aria-label="Remove one ${d.name}">−</button>
      <span class="qty-val" data-qty="${d.id}">${qty}</span>
      <button class="qty-btn" data-action="inc" data-id="${d.id}" aria-label="Add one ${d.name}">+</button>
    </div>
  </div>`;
}

(function(){
  const orderList = document.getElementById('orderList');
  if (!orderList) return;

  function renderOrderList(cat){
    const list = cat === 'all' ? DISHES : DISHES.filter(d => d.cat === cat);
    orderList.innerHTML = list.map(orderRow).join('');
    orderList.querySelectorAll('.qty-btn').forEach(btn => btn.addEventListener('click', () => {
      changeQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
    }));
  }
  renderOrderList('all');
  document.querySelectorAll('.order-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderOrderList(tab.dataset.cat);
  }));

  // expose so cart logic below can re-render qty numbers
  window._renderOrderList = renderOrderList;
})();

/* ================= CART LOGIC (Home & Full Menu pages) ================= */
function addToCart(id, pulse){
  cart[id] = (cart[id] || 0) + 1;
  syncCartUI();
  if (pulse) {
    const pill = document.getElementById('cartPill');
    if (pill) { pill.classList.remove('is-pulse'); void pill.offsetWidth; pill.classList.add('is-pulse'); }
    const d = DISHES.find(x=>x.id===id);
    showToast(`${d.name} added to your order`);
  }
}
function changeQty(id, delta){
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  syncCartUI();
}

/* Builds a WhatsApp order-summary link — used on the Full Menu page cart */
function cartWhatsAppLink(){
  const entries = Object.entries(cart);
  let msg = 'Hi Hawks! I\'d like to order:%0A';
  let subtotal = 0;
  entries.forEach(([id,qty]) => {
    const d = DISHES.find(x=>x.id===id);
    subtotal += d.price * qty;
    msg += `- ${qty}x ${d.name} (${fmt(d.price*qty)})%0A`;
  });
  msg += `%0ASubtotal: ${fmt(subtotal)} + Rs. 150 delivery`;
  return `https://wa.me/923001234567?text=${msg}`;
}

function syncCartUI(){
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return; // no cart UI on this page (e.g. Contact & Checkout page)

  document.querySelectorAll('[data-qty]').forEach(el => { el.textContent = cart[el.dataset.qty] || 0; });

  const entries = Object.entries(cart);
  const count = entries.reduce((s,[,q]) => s+q, 0);
  const pill = document.getElementById('cartPill');
  if (pill) {
    pill.classList.toggle('is-visible', count > 0);
    document.getElementById('cartPillCount').textContent = count;
  }

  const cartTotals = document.getElementById('cartTotals');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const waOrderBtn = document.getElementById('waOrderBtn'); // only present on Full Menu page

  if (count === 0){
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty — add a dish to get started.</div>';
    if (cartTotals) cartTotals.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (waOrderBtn) waOrderBtn.href = 'https://wa.me/923001234567?text=Hi%20Hawks!%20I%27d%20like%20to%20place%20an%20order.';
    const orderForm = document.getElementById('orderForm');
    if (orderForm) orderForm.classList.remove('is-open');
    return;
  }

  let subtotal = 0;
  cartItems.innerHTML = entries.map(([id,qty]) => {
    const d = DISHES.find(x=>x.id===id);
    const lineTotal = d.price * qty;
    subtotal += lineTotal;
    return `<div class="cart-line"><span class="cl-name"><b>${qty}×</b>${d.name}</span><span class="cl-price">${fmt(lineTotal)}</span></div>`;
  }).join('');

  if (cartTotals) cartTotals.style.display = 'block';
  const delivery = 150;
  const elSub = document.getElementById('cartSubtotal');
  const elDel = document.getElementById('cartDelivery');
  const elGrand = document.getElementById('cartGrand');
  if (elSub) elSub.textContent = fmt(subtotal);
  if (elDel) elDel.textContent = fmt(delivery);
  if (elGrand) elGrand.textContent = fmt(subtotal + delivery);
  if (checkoutBtn) checkoutBtn.disabled = false;
  if (waOrderBtn) waOrderBtn.href = cartWhatsAppLink();
}

(function(){
  const checkoutBtn = document.getElementById('checkoutBtn');
  const orderForm = document.getElementById('orderForm');
  if (checkoutBtn && orderForm) {
    checkoutBtn.addEventListener('click', () => {
      orderForm.classList.add('is-open');
      const nameField = document.getElementById('ofName');
      if (nameField) nameField.focus();
    });

    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Order placed! We\u2019ll call to confirm shortly.');
      cart = {};
      syncCartUI();
      e.target.reset();
      e.target.classList.remove('is-open');
    });
  }

  const cartPill = document.getElementById('cartPill');
  if (cartPill) {
    cartPill.addEventListener('click', () => {
      const orderSection = document.getElementById('order');
      if (orderSection) orderSection.scrollIntoView({behavior:'smooth'});
    });
  }
})();

/* Run once on load so any page with a cart UI starts in the correct empty state */
syncCartUI();

/* ================= REVIEWS CAROUSEL (Home page) ================= */
(function(){
  const slidesWrap = document.getElementById('reviewSlides');
  if (!slidesWrap) return;

  const starsHtml = n => Array.from({length:5}).map((_,i)=> `<i class="fa-solid fa-star" style="${i<n?'':'opacity:.25'}"></i>`).join(' ');
  slidesWrap.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-quote-mark">"</div>
      <div class="review-stars">${starsHtml(r.stars)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-name">${r.name}</div>
      <div class="review-tag">${r.tag}</div>
    </div>`).join('');

  const dotsWrap = document.getElementById('reviewDots');
  dotsWrap.innerHTML = REVIEWS.map((_,i) => `<button class="review-dot ${i===0?'active':''}" data-i="${i}" aria-label="Go to review ${i+1}"></button>`).join('');

  let reviewIdx = 0;
  function goToReview(i){
    reviewIdx = (i + REVIEWS.length) % REVIEWS.length;
    slidesWrap.style.transform = `translateX(-${reviewIdx * 100}%)`;
    document.querySelectorAll('.review-dot').forEach((d,idx) => d.classList.toggle('active', idx===reviewIdx));
  }
  document.getElementById('reviewPrev').addEventListener('click', () => goToReview(reviewIdx - 1));
  document.getElementById('reviewNext').addEventListener('click', () => goToReview(reviewIdx + 1));
  dotsWrap.querySelectorAll('.review-dot').forEach(dot => dot.addEventListener('click', () => goToReview(+dot.dataset.i)));

  let reviewAuto = setInterval(() => goToReview(reviewIdx + 1), 6000);
  const wrap = document.querySelector('.reviews-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(reviewAuto));
  wrap.addEventListener('mouseleave', () => { reviewAuto = setInterval(() => goToReview(reviewIdx + 1), 6000); });
})();

/* ================= HOME / FULL-MENU CONTACT FORM ================= */
(function(){
  const contactForm = document.getElementById('contactForm');
  const contactSuccessPanel = document.getElementById('contactSuccessPanel');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactSuccessPanel) {
      // Contact & Checkout page: swap form for a success panel
      contactForm.style.display = 'none';
      contactSuccessPanel.classList.add('is-visible');
      showToast('Message sent — we\u2019ll get back to you soon.');
    } else {
      // Home page: simple reset + toast
      showToast('Message sent — we\u2019ll get back to you soon.');
      e.target.reset();
    }
  });
})();

/* ================= CONTACT & CHECKOUT PAGE: ORDER TYPE PILLS ================= */
let currentOrderType = 'Delivery';
function selectOrderType(value){
  setOrderType(value);
  document.querySelectorAll('.type-card').forEach(c => c.classList.toggle('is-selected', c.dataset.type === value));
  const checkoutSection = document.getElementById('checkout');
  if (checkoutSection) checkoutSection.scrollIntoView({behavior:'smooth'});
  showToast(`${value} selected — fill in your details below`);
}

function setOrderType(value){
  const orderTypePills = document.querySelectorAll('#orderTypePills .pill-btn');
  const addressFields = document.getElementById('addressFields');
  const pickupNote = document.getElementById('pickupNote');
  const dineinNote = document.getElementById('dineinNote');
  const coAddress = document.getElementById('coAddress');
  const coArea = document.getElementById('coArea');
  if (!orderTypePills.length) return;

  currentOrderType = value;
  orderTypePills.forEach(p => p.classList.toggle('is-active', p.dataset.value === value));

  const isDelivery = value === 'Delivery';
  if (addressFields) addressFields.classList.toggle('is-hidden', !isDelivery);
  if (coAddress) coAddress.required = isDelivery;
  if (coArea) coArea.required = isDelivery;
  if (pickupNote) pickupNote.classList.toggle('is-visible', value === 'Pickup');
  if (dineinNote) dineinNote.classList.toggle('is-visible', value === 'Dine-in');
}

(function(){
  const orderTypePills = document.querySelectorAll('#orderTypePills .pill-btn');
  if (!orderTypePills.length) return;
  orderTypePills.forEach(pill => pill.addEventListener('click', () => setOrderType(pill.dataset.value)));
})();

/* ================= CONTACT & CHECKOUT PAGE: PAYMENT PILLS ================= */
(function(){
  const paymentPills = document.querySelectorAll('#paymentPills .pill-btn');
  if (!paymentPills.length) return;
  paymentPills.forEach(pill => pill.addEventListener('click', () => {
    paymentPills.forEach(p => p.classList.remove('is-active','pay-active'));
    pill.classList.add('is-active','pay-active');
  }));
})();

/* ================= CONTACT & CHECKOUT PAGE: CHECKOUT FORM SUBMIT ================= */
(function(){
  const checkoutForm = document.getElementById('checkoutForm');
  const successPanel = document.getElementById('successPanel');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('coName').value || 'there';
    const ref = 'HK-' + Math.floor(1000 + Math.random()*9000);
    document.getElementById('successRef').textContent = 'Order #' + ref;
    document.getElementById('successMsg').textContent =
      `Thanks, ${name}! Your ${currentOrderType.toLowerCase()} order has been received — we'll call to confirm shortly.`;
    checkoutForm.style.display = 'none';
    successPanel.classList.add('is-visible');
    showToast('Order placed successfully!');
    successPanel.scrollIntoView({behavior:'smooth', block:'center'});
  });
})();

function resetCheckout(){
  const checkoutForm = document.getElementById('checkoutForm');
  const successPanel = document.getElementById('successPanel');
  const paymentPills = document.querySelectorAll('#paymentPills .pill-btn');
  if (!checkoutForm) return;

  checkoutForm.reset();
  setOrderType('Delivery');
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('is-selected'));
  paymentPills.forEach(p => p.classList.remove('is-active','pay-active'));
  if (paymentPills[0]) paymentPills[0].classList.add('is-active','pay-active');
  successPanel.classList.remove('is-visible');
  checkoutForm.style.display = 'flex';
  checkoutForm.style.flexDirection = 'column';
  document.getElementById('checkout').scrollIntoView({behavior:'smooth'});
}

/* ================= GLOBAL BUTTON CLICK FEEDBACK (Full Menu & Contact pages) ================= */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(){
    this.classList.add('is-clicked');
    setTimeout(() => this.classList.remove('is-clicked'), 350);
  });
});
