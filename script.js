
// Open Dish Modal
function openDishModal(dishName) {
    const modal = document.getElementById('dishModal');
    const modalContent = document.getElementById('modalDishContent');
    
    // Generate dynamic content based on dish
    modalContent.innerHTML = `
        <h3>${dishName}</h3>
        <img src="https://source.unsplash.com/random/400x300/?${dishName.toLowerCase().replace(' ', '')}" 
             style="width:100%; border-radius:10px; margin:10px 0;">
        <p>Customize your order:</p>
        
        <div style="margin:15px 0;">
            <label><strong>Size:</strong></label><br>
            <input type="radio" id="sizeRegular" name="size" checked>
            <label for="sizeRegular">Regular (+$0.00)</label><br>
            <input type="radio" id="sizeLarge" name="size">
            <label for="sizeLarge">Large (+$1.50)</label>
        </div>
        
        <div style="margin:15px 0;">
            <label><strong>Extras:</strong></label><br>
            <input type="checkbox" id="extraCheese">
            <label for="extraCheese">Extra Cheese (+$0.75)</label><br>
            <input type="checkbox" id="extraSpicy">
            <label for="extraSpicy">Extra Spicy (+$0.25)</label>
        </div>
        
        <div style="margin:15px 0;">
            <label><strong>Special Instructions:</strong></label><br>
            <textarea style="width:100%; padding:10px; border-radius:8px; border:1px solid #ddd;" 
                      placeholder="E.g. no onions, less salt..."></textarea>
        </div>
        
        <button style="width:100%; padding:12px; background:var(--primary); color:white; 
                border:none; border-radius:8px; font-weight:bold; cursor:pointer;"
                onclick="addToCart('${dishName}')">
            Add to Order - $${(Math.random()*5 + 3).toFixed(2)}
        </button>
    `;
    
    modal.style.display = 'flex';
}

// Open Checkout Modal
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const modalContent = document.getElementById('modalCheckoutContent');
    
    modalContent.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <i class="fas fa-check-circle" style="font-size:50px; color:var(--secondary);"></i>
            <h3 style="margin:10px 0;">Ready to Checkout?</h3>
            <p>Your food will be prepared fresh when you confirm</p>
        </div>
        
        <div style="background:#f9f9f9; padding:15px; border-radius:10px; margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Subtotal:</span>
                <span>$14.45</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Service Fee:</span>
                <span>$1.00</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>Total:</span>
                <span style="color:var(--primary);">$15.45</span>
            </div>
        </div>
        
        <div style="margin:15px 0;">
            <label><strong>Payment Method:</strong></label><br>
            <select style="width:100%; padding:10px; border-radius:8px; border:1px solid #ddd;">
                <option>Meal Plan Balance ($15.75)</option>
                <option>Credit/Debit Card</option>
                <option>Campus Card</option>
                <option>PayPal</option>
            </select>
        </div>
        
        <div style="margin:15px 0;">
            <label><strong>Delivery Time:</strong></label><br>
            <select style="width:100%; padding:10px; border-radius:8px; border:1px solid #ddd;">
                <option>ASAP (15-25 min)</option>
                <option>Schedule for later</option>
            </select>
        </div>
        
        <button style="width:100%; padding:12px; background:var(--secondary); color:white; 
                border:none; border-radius:8px; font-weight:bold; cursor:pointer; margin-top:10px;"
                onclick="placeOrder()">
            Confirm Order
        </button>
    `;
    
    modal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    document.getElementById('dishModal').style.display = 'none';
    document.getElementById('checkoutModal').style.display = 'none';
}

// Add to Cart
function addToCart(dishName) {
    alert(`${dishName} added to your order!`);
    closeModal();
}

// Place Order
function placeOrder() {
    alert('Order placed successfully! You will receive a confirmation shortly.');
    closeModal();
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        closeModal();
    }
}
function toggleFoodOrder() {
    const foodOrderSection = document.getElementById('foodOrderSection');
    const isVisible = foodOrderSection.style.display === 'block';
    foodOrderSection.style.display = isVisible ? 'none' : 'block';
}
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('closed');
}
function filterItems(category) {
    // Set active category styling
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/Hide items
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    showToast(`${name} added to cart!`, "success");
}
const banners = document.querySelectorAll('.promo-banner');
let current = 0;

function showNextBanner() {
    banners[current].classList.remove('active');
    current = (current + 1) % banners.length;
    banners[current].classList.add('active');
}

setInterval(showNextBanner, 4000); // Change every 4 seconds


fetch('http://localhost:3000/api/items')
    .then(res => res.json())
    .then(data => {
        console.log(data); // Display menu items
    });
