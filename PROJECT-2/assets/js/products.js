/*=============== PRODUCTS FILTER FUNCTIONALITY ===============*/

// Get all filter buttons and product sections
const filterBtns = document.querySelectorAll('.filter__btn');
const productSections = document.querySelectorAll('.products__section');

// Add click event listener to each filter button
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('filter__btn--active'));
    
    // Add active class to clicked button
    btn.classList.add('filter__btn--active');
    
    // Get the filter value
    const filterValue = btn.getAttribute('data-filter');
    
    // Show/hide product sections based on filter
    productSections.forEach(section => {
      const category = section.getAttribute('data-category');
      
      if (filterValue === 'all' || filterValue === category) {
        section.classList.remove('hidden');
        section.style.display = 'block';
        // Trigger animation
        section.offsetHeight;
      } else {
        section.classList.add('hidden');
        section.style.display = 'none';
      }
    });
  });
});

// Smooth scroll behavior
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

// Optional: Add to cart functionality
document.querySelectorAll('.product__button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const productName = this.closest('.product__card').querySelector('.product__name').textContent;
    const productPrice = this.closest('.product__card').querySelector('.product__price').textContent;
    
    // Simple alert - you can replace with cart functionality
    alert(`${productName} added to cart!\nPrice: ${productPrice}`);
  });
});
