/*=============== CONTACT PAGE FUNCTIONALITY ===============*/

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      eventDate: formData.get('eventDate'),
      message: formData.get('message'),
      preferences: formData.get('preferences'),
      newsletter: formData.get('newsletter') ? 'Yes' : 'No'
    };
    
    // Validate form
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Display success message (in real implementation, this would send to server)
    console.log('Form Data:', data);
    
    alert(`Thank you ${data.name}! Your message has been received. We'll get back to you within 24 hours at ${data.email}.`);
    
    // Reset form
    contactForm.reset();
    
    // Optional: Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// FAQ Accordion Functionality
const faqHeaders = document.querySelectorAll('.faq__header');

faqHeaders.forEach(header => {
  header.addEventListener('click', function() {
    const faqItem = this.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq__item.active').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
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

// Form input focus styles
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.backgroundColor = 'rgba(206, 18, 47, 0.05)';
  });
  
  input.addEventListener('blur', function() {
    this.style.backgroundColor = '';
  });
});
