/*=============== NEW PAGE FUNCTIONALITY ===============*/

// Optional: Add to cart functionality for order buttons
document.querySelectorAll('.new__button, .featured__button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get product information
    const productCard = this.closest('.new__card, .featured__content');
    let productName = '';
    let productPrice = '';
    
    if (productCard.classList.contains('new__card')) {
      productName = productCard.querySelector('.new__name').textContent;
      productPrice = productCard.querySelector('.new__price').textContent;
    } else {
      productName = productCard.querySelector('.featured__title').textContent;
      productPrice = productCard.querySelector('.featured__price').textContent;
    }
    
    // Display confirmation message
    alert(`${productName} added to cart!\nPrice: ${productPrice}\n\nRedirect to checkout or contact us to customize your order.`);
  });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
