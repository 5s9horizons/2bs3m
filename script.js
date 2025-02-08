$(document).ready(function(){

    // Function to update the theme and icon based on the provided theme value
    function setTheme(theme) {
    // Set a data attribute on body for CSS styling
    $('body').attr('data-theme', theme);

    if (theme === 'dark') {
        // Change the button icon to a semi-moon (Font Awesome moon icon)
        $('#themeToggle').html('<i class="fas fa-moon"></i>');
        // Optional: add dark mode classes to body or other elements
        $('body').addClass('bg-dark text-white');
    } else {
        // Default light theme with sun icon
        $('#themeToggle').html('<i class="fas fa-sun"></i>');
        $('body').removeClass('bg-dark text-white');
    }
    }

    // On page load, check local storage for theme preference
    let savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // When the theme toggle button is clicked
    $('#themeToggle').on('click', function(){
    // Determine the new theme based on current setting
    let currentTheme = $('body').attr('data-theme') || 'light';
    let newTheme = (currentTheme === 'light') ? 'dark' : 'light';

    // Update theme and store the choice in local storage
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    });

    // ... Other code (such as your cart panel and products grid code) ...

    

  /* --- CART PANEL OPEN/CLOSE LOGIC --- */
  $('#cartBtn').on('click', function(e){
    e.preventDefault();
    var windowWidth = $(window).width();
    var panelWidth = (windowWidth >= 1200) ? '100%' : '80%';
    // Définir des seuils pour adapter la largeur
    if(windowWidth >= 1000) {
      // Pour grands écrans, occuper toute la largeur (mode page complète)
      panelWidth = '80%';
    } else {
      // Pour tablettes ou fenêtres plus petites, occuper par exemple 80%
      panelWidth = '80%';
    }
    $('#cart-panel').css('width', panelWidth).css('right', '0');
  });

  // Fermer le panneau
  $('#closeCart').on('click', function(){
    $('#cart-panel').css('right', '-100%');
  });

// Cart array to store added products
var cart = [];

// Function to update cart preview
function updateCartPreview() {
    var cartItemsHtml = '';
    var total = 0;
    var itemCount = 0;
    cart.forEach(function(item) {
        cartItemsHtml += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} - ${item.price}€
                <span class="badge badge-primary badge-pill">${item.quantity}</span>
                <button class="btn btn-danger btn-sm btn-delete-from-cart" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </li>
        `;
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });
    $('#cart-items').html(cartItemsHtml);
    $('#cart-total').text(total.toFixed(2));
    $('#cartCount').text(itemCount);
}

// Event listener for "Delete from Cart" buttons
    $(document).on('click', '.btn-delete-from-cart', function(e) {
        e.preventDefault();
        var productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId);
        updateCartPreview();
    });

    // Event listener for "Command" button
        $('#commandBtn').on('click', function(e) {
            e.preventDefault();
            $('#communicationModal').modal('show');
        });

// Event listener for "Email" button
$('#emailBtn').on('click', function(e) {
    e.preventDefault();
    var email = "sene.5s9horizons@gmail.com"; // Replace with the business owner's email
    var subject = "New Order";
    var body = "Hello,\n\nI would like to place an order with the following items:\n\n";
    cart.forEach(function(item) {
        body += `${item.name} - ${item.price}€ x ${item.quantity}\n`;
    });
    body += `\nTotal: ${$('#cart-total').text()}€\n\nThank you.`;
    var mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    $('#communicationModal').modal('hide');
});

// Event listener for "WhatsApp" button
$('#whatsappBtn').on('click', function(e) {
    e.preventDefault();
    var phoneNumber = "1234567890"; // Replace with the business owner's WhatsApp number
    var message = "Hello,%0A%0AI would like to place an order with the following items:%0A%0A";
    cart.forEach(function(item) {
        message += `${item.name} - ${item.price}€ x ${item.quantity}%0A`;
    });
    message += `%0ATotal: ${$('#cart-total').text()}€%0A%0AThank you.`;
    var whatsappLink = `https://wa.me/${789229104}?text=${message}`;
    window.open(whatsappLink, '_blank');
    $('#communicationModal').modal('hide');
});

// Event listener for "SMS" button
$('#smsBtn').on('click', function(e) {
    e.preventDefault();
    var phoneNumber = "1234567890"; // Replace with the business owner's phone number
    var message = "Hello, I would like to place an order with the following items:\n\n";
    cart.forEach(function(item) {
        message += `${item.name} - ${item.price}€ x ${item.quantity}\n`;
    });
    message += `\nTotal: ${$('#cart-total').text()}€\n\nThank you.`;
    var smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
    $('#communicationModal').modal('hide');
});

// Event listener for "Telegram" button
$('#telegramBtn').on('click', function(e) {
    e.preventDefault();
    var username = "businessowner"; // Replace with the business owner's Telegram username
    var message = "Hello, I would like to place an order with the following items:\n\n";
    cart.forEach(function(item) {
        message += `${item.name} - ${item.price}€ x ${item.quantity}\n`;
    });
    message += `\nTotal: ${$('#cart-total').text()}€\n\nThank you.`;
    var telegramLink = `tg://msg?text=${encodeURIComponent(message)}&to=${username}`;
    window.location.href = telegramLink;
    $('#communicationModal').modal('hide');
});

// Event listener for "Messenger" button
$('#messengerBtn').on('click', function(e) {
    e.preventDefault();
    var pageId = "1234567890"; // Replace with the business owner's Facebook Page ID
    var message = "Hello, I would like to place an order with the following items:\n\n";
    cart.forEach(function(item) {
        message += `${item.name} - ${item.price}€ x ${item.quantity}\n`;
    });
    message += `\nTotal: ${$('#cart-total').text()}€\n\nThank you.`;
    var messengerLink = `fb-messenger://share/?link=${encodeURIComponent(message)}&app_id=${pageId}`;
    window.location.href = messengerLink;
    $('#communicationModal').modal('hide');
});

// Event listener for "Add to Cart" buttons
$(document).on('click', '.btn-add-to-cart', function(e) {
    e.preventDefault();
    var productId = $(this).data('id');
    var product = products.find(p => p.id === productId);
    var cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.priceCurrent,
            quantity: 1
        });
    }

    updateCartPreview();
});

  

  // Optionnel : Ajuster dynamiquement lors du redimensionnement
  $(window).resize(function(){
    if ($('#cart-panel').css('right') === '0px'){
      var windowWidth = $(window).width();
      var panelWidth = (windowWidth >= 1200) ? '100%' : '80%';
      $('#cart-panel').css('width', panelWidth);
    }
  });



  /* --- PRICE RANGE DISPLAY --- */
  
  //$('#priceRange').on('input change', function(){
    //var maxPrice = $(this).val();
    //$('#priceValue').text('Price: 0 - ' + maxPrice + '€');
  //});

  /* --- PRODUCTS GRID: Generate and Inject Cards --- */

// Sample products array
var products = [
//multiple tags
    { id: 1, name: "Product 1", image: "images/undraw_Add_color_re_buro.png", rating: 3.5, priceBefore: 100, priceCurrent: 80, tags: ["New", "Hot"] },

    { id: 2, name: "Product 2", image: "images/undraw_android_jr64.png", rating: 4, priceBefore: null, priceCurrent: 60, tags: ["Promo"] },

    { id: 3, name: "Product 3", image: "images/Nanami.jpg", rating: 2.5, priceBefore: 80, priceCurrent: 50, tags: ["Sale", "Limited"] },

    { id: 4, name: "Product 4", image: "images/undraw_undraw_undraw_undraw_businessman_e7v0_qrld_-1-_hvmv_(1)_ik9c.png", rating: 4.5, priceBefore: 120, priceCurrent: 90, tag: ["Hot", "Cosmetics"] },

    { id: 5, name: "Product 5", image: "images/undraw_video_files_fu10.png", rating: 5, priceBefore: 150, priceCurrent: 130, tag: ["Best", "Clothes"] },

    { id: 6, name: "Product 6", image: "images/undraw_visual_data_re_mxxo.png", rating: 3, priceBefore: null, priceCurrent: 70, tag: ["Limited", "Furnitures"] },

    { id: 7, name: "Product 7", image: "images/undraw_void_3ggu.png", rating: 4.2, priceBefore: 110, priceCurrent: 95, tag: ["New", "Electronics"] },
    
    { id: 8, name: "Product 8", image: "images/undraw_zoom_in_1txs.png", rating: 3.8, priceBefore: 90, priceCurrent: 60, tag: ["Promo", "Office"] }
];

// Shuffle function
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Shuffle and select a fixed number of products to display
shuffle(products);
var numberToShow = 6; // Change as needed
var selectedProducts = products.slice(0, numberToShow);
var gridHtml = '';
selectedProducts.forEach(function(prod) {
    gridHtml += `
        <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-4 product-item d-flex">
            <div class="card flex-grow-1">
                <div class="position-relative">
                    <img src="${prod.image}" class="card-img-top" alt="${prod.name}">
                    <span class="badge badge-danger position-absolute" style="top:10px; right:10px;">${prod.tag}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${prod.name}</h5>
                    
                    <p class="card-text">
                        ${prod.priceBefore ? `<del>${prod.priceBefore}€</del> ` : ''}<strong>${prod.priceCurrent}€</strong>
                    </p>
                    <a href="#" class="btn btn-sm btn-outline-primary">View Options</a><br><br>
                    <a href="#" class="btn btn-sm btn-primary btn-add-to-cart" data-id="${prod.id}"><i class="fas fa-plus"></i><i class="fas fa-cart-plus"></i></a>
                </div>
            </div>
        </div>
    `;
    //<div class="mb-2">
      //${generateStars(prod.rating)}
                    //</div>
});

$('#products-grid').html(gridHtml);

function displayProducts(products) {
var gridHtml = '';
products.forEach(function(prod) {
    gridHtml += `
        <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-4 product-item d-flex">
            <div class="card flex-grow-1">
                <div class="position-relative">
                    <img src="${prod.image}" class="card-img-top" alt="${prod.name}">
                    <span class="badge badge-danger position-absolute" style="top:10px; right:10px;">${prod.tag}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${prod.name}</h5>
                    
                    <p class="card-text">
                        ${prod.priceBefore ? `<del>${prod.priceBefore}€</del> ` : ''}<strong>${prod.priceCurrent}€</strong>
                    </p>
                    <a href="#" class="btn btn-sm btn-outline-primary">View Options</a><br><br>
                    <a href="#" class="btn btn-sm btn-primary btn-add-to-cart" data-id="${prod.id}"><i class="fas fa-plus"></i><i class="fas fa-cart-plus"></i></a>
                </div>
            </div>
        </div>
    `;
    //<div class="mb-2">
      //${generateStars(prod.rating)}
                    //</div>
});
$('#products-grid').html(gridHtml);
}

$('#searchInput').on('input', function() {
var searchTerm = $(this).val().toLowerCase();
var filteredProducts = products.filter(function(product) {
    return product.name.toLowerCase().includes(searchTerm);
});
displayProducts(filteredProducts);
});




// Initialize Masonry Layout
var $grid = $('#products-grid').masonry({
    itemSelector: '.product-item',
    percentPosition: true,
    columnWidth: '.product-item'
});
// Ensure images are loaded before laying out items
$grid.imagesLoaded().progress(function() {
    $grid.masonry('layout');
});

// Function to generate star ratings
//function generateStars(rating) {
    //var html = '';
    //for (var i = 1; i <= 5; i++) {
        //if (rating >= i) {
            //html += '<i class="fas fa-star text-warning"></i>';
        //} else if (rating > i - 1 && rating < i) {
            //html += '<i class="fas fa-star-half-alt text-warning"></i>';
        //} else {
            //html += '<i class="far fa-star text-warning"></i>';
        //}
    //}
    //return html;
//}
});

// Ajoutez dans votre script
window.addEventListener('load', function() {
document.getElementById('loader').classList.add('hidden');
});