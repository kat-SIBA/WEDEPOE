/* =========================================================
   MUTUMANE KOTA 'N' GRILLED CHICKEN - SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupOrderFormCart();
  updateCartUI();
  setupEnquiryFormValidation();
  setupDynamicSearch();
  setupGalleryLightbox();
});

/* 1. Dynamic Menu Search Feature */
function setupDynamicSearch() {
  const searchInput = document.getElementById("menuSearch");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".category-container .card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(filter)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* 2. Gallery Lightbox Implementation */
function setupGalleryLightbox() {
  // Create Lightbox DOM elements if not already present
  if (!document.getElementById("lightboxModal")) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "lightboxModal";
    modalDiv.className = "lightbox-modal";
    modalDiv.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img id="lightboxImg" src="" alt="Gallery Preview">
      <div id="lightboxCaption" class="lightbox-caption"></div>
    `;
    document.body.appendChild(modalDiv);

    modalDiv.querySelector(".lightbox-close").addEventListener("click", () => {
      modalDiv.style.display = "none";
    });

    modalDiv.addEventListener("click", (e) => {
      if (e.target === modalDiv) modalDiv.style.display = "none";
    });
  }

  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const captionText = document.getElementById("lightboxCaption");

  // Attach click events to food images
  document.querySelectorAll(".card img, .hero-logo").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      captionText.textContent = img.alt || "Mutumane Street Food Menu";
    });
  });
}

/* 3. Multi-Item Cart Logic */
function setupOrderFormCart() {
  const addBtn = document.getElementById("add-form-to-cart-btn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const mealSelect = document.getElementById("meal");
      const selectedOption = mealSelect.options[mealSelect.selectedIndex];
      
      const mealText = selectedOption.text;
      const nameMatch = mealText.match(/(.*?)\s*\(R([\d.]+)\)/);
      
      let mealName = mealText;
      let basePrice = 45;
      
      if (nameMatch) {
        mealName = nameMatch[1].trim();
        basePrice = parseFloat(nameMatch[2]);
      }

      let extras = [];
      let itemPrice = basePrice;

      const toppings = document.querySelectorAll('input[name="topping"]:checked');
      toppings.forEach((t) => {
        if (t.id === "cheese") { itemPrice += 5; extras.push("Extra Cheese (+R5)"); }
        if (t.id === "russian") { itemPrice += 12; extras.push("Extra Russian (+R12)"); }
      });

      const selectedSauces = document.querySelectorAll('input[name="sauce"]:checked');
      selectedSauces.forEach((s) => {
        const sauceLabel = document.querySelector(`label[for="${s.id}"]`).textContent;
        extras.push(sauceLabel);
      });

      const detailsString = extras.length > 0 ? extras.join(", ") : "Standard";

      let fullName = document.getElementById("fullName").value.trim();
      let address = document.getElementById("address").value.trim();

      if (!fullName) {
        alert("Please enter your Full Name & Phone Number before adding to cart.");
        document.getElementById("fullName").focus();
        return;
      }

      let cart = JSON.parse(localStorage.getItem("mutumaneCart")) || [];

      const existingIndex = cart.findIndex((item) => item.name === mealName && item.details === detailsString);

      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          name: mealName,
          details: detailsString,
          unitPrice: itemPrice,
          quantity: 1,
          customer: fullName,
          address: address
        });
      }

      localStorage.setItem("mutumaneCart", JSON.stringify(cart));
      updateCartUI();
      alert(`Added ${mealName} to your cart!`);
    });
  }

  // WhatsApp Checkout
  const checkoutBtn = document.getElementById("checkout-whatsapp-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("mutumaneCart")) || [];
      if (cart.length === 0) {
        alert("Your cart is empty! Please add meals before sending your order.");
        return;
      }

      let fullNameInput = document.getElementById("fullName");
      let addressInput = document.getElementById("address");

      let customerName = fullNameInput && fullNameInput.value ? fullNameInput.value : cart[0].customer || "Valued Customer";
      let deliveryAddress = addressInput && addressInput.value ? addressInput.value : cart[0].address || "Standard Delivery / Pickup";

      let message = `*NEW ORDER - MUTUMANE KOTA*%0A`;
      message += `*Customer:* ${customerName}%0A`;
      message += `*Delivery Note:* ${deliveryAddress}%0A`;
      message += `----------------------------%0A*ORDER ITEMS:*%0A`;

      let total = 0;
      cart.forEach((item, i) => {
        let price = typeof item.unitPrice === "number" ? item.unitPrice : 45;
        let itemSubtotal = price * item.quantity;
        total += itemSubtotal;
        message += `${i + 1}. *${item.name}* (x${item.quantity})%0A`;
        message += `   _Options:_ ${item.details || 'Standard'}%0A`;
        message += `   _Price:_ R${itemSubtotal.toFixed(2)}%0A%0A`;
      });

      message += `----------------------------%0A`;
      message += `*TOTAL AMOUNT:* R${total.toFixed(2)}`;

      const whatsappURL = `https://wa.me/27813572265?text=${message}`;
      window.open(whatsappURL, "_blank");
    });
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  let cart = JSON.parse(localStorage.getItem("mutumaneCart")) || [];
  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li style="color: var(--text-muted); font-size: 0.9rem;">Cart is empty</li>';
    if (cartTotalSpan) cartTotalSpan.textContent = "R0.00";
    return;
  }

  cart.forEach((item, index) => {
    let price = typeof item.unitPrice === "number" ? item.unitPrice : 45;
    let itemSubtotal = price * item.quantity;
    totalPrice += itemSubtotal;

    const li = document.createElement("li");
    li.style.cssText = "background: var(--charcoal-light); border: 1px solid #333; border-radius: 6px; padding: 8px; margin-bottom: 8px; font-size: 0.85rem; list-style: none;";

    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <strong style="color: var(--white);">${item.name}</strong>
          <div style="color: var(--text-muted); font-size: 0.75rem;">${item.details || 'Standard'}</div>
          <div style="color: var(--warm-yellow); font-size: 0.8rem;">R${price.toFixed(2)} ea</div>
        </div>
        <button type="button" onclick="removeCartItem(${index})" style="background: transparent; color: #ff5555; border: none; cursor: pointer; font-size: 0.9rem;" title="Remove">✕</button>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
        <span style="color: var(--text-main);">Qty: ${item.quantity}</span>
        <div style="display: flex; gap: 4px;">
          <button type="button" onclick="adjustItemQty(${index}, -1)" style="background: #444; color: #fff; border: none; padding: 2px 6px; cursor: pointer; border-radius: 3px;">-</button>
          <button type="button" onclick="adjustItemQty(${index}, 1)" style="background: #444; color: #fff; border: none; padding: 2px 6px; cursor: pointer; border-radius: 3px;">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(li);
  });

  if (cartTotalSpan) cartTotalSpan.textContent = `R${totalPrice.toFixed(2)}`;
}

window.adjustItemQty = function(index, amount) {
  let cart = JSON.parse(localStorage.getItem("mutumaneCart")) || [];
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("mutumaneCart", JSON.stringify(cart));
  updateCartUI();
};

window.removeCartItem = function(index) {
  let cart = JSON.parse(localStorage.getItem("mutumaneCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("mutumaneCart", JSON.stringify(cart));
  updateCartUI();
};

/* =========================================================
   4. VALIDATED ENQUIRY FORM PROCESSING (Strict SA Validation)
   ========================================================= */
function setupEnquiryFormValidation() {
  const enquiryForm = document.getElementById("enquiryForm");
  if (!enquiryForm) return;

  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullname").value.trim();
    const contactInfo = document.getElementById("contactInfo").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // 1. Validate Full Name (Must contain at least first and last name, letters and spaces only)
    const nameRegex = /^[A-Za-zÀ-ÿ]+(\s+[A-Za-zÀ-ÿ]+)+$/;
    if (!fullName || !nameRegex.test(fullName)) {
      alert("Please enter a valid full name (e.g., Thabo Mokoena) containing only letters and spaces.");
      document.getElementById("fullname").focus();
      return;
    }

    // 2. Validate South African Phone Number or Email
    // Accepts SA mobile formats: 0821234567, 071 234 5678, +27821234567, or standard emails
    const saPhoneRegex = /^(\+27|0)[6-8][0-9]\s?[0-9]{3}\s?[0-9]{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isPhoneValid = saPhoneRegex.test(contactInfo.replace(/\s+/g, ''));
    const isEmailValid = emailRegex.test(contactInfo);

    if (!contactInfo || (!isPhoneValid && !isEmailValid)) {
      alert("Please enter a valid South African phone number (e.g., 0813572265 or +27813572265) or a valid email address.");
      document.getElementById("contactInfo").focus();
      return;
    }

    // 3. Validate Subject
    if (!subject || subject.length < 3) {
      alert("Please enter a meaningful subject for your enquiry.");
      document.getElementById("subject").focus();
      return;
    }

    // 4. Validate Message
    if (!message || message.length < 5) {
      alert("Please type a more descriptive message (at least 5 characters).");
      document.getElementById("message").focus();
      return;
    }

    // Simulating mailto processing for enquiry submission
    const mailtoLink = `mailto:info@mutumane.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + fullName + "\nContact: " + contactInfo + "\n\nMessage:\n" + message)}`;
    
    alert(`Thank you, ${fullName}! Your enquiry has been successfully verified and processed. Opening your mail app...`);
    window.location.href = mailtoLink;
    enquiryForm.reset();
  });
}

/* Mobile Hamburger Menu Toggle Function */
function toggleMobileMenu() {
  const nav = document.getElementById("mainNav");
  if (nav) {
    nav.classList.toggle("nav-open");
  }
}