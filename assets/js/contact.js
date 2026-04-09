// ==================== Contact Form Handler ====================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const country = document.getElementById('country').value;
    const musicGenre = document.getElementById('musicGenre').value;
    const instrument = document.getElementById('instrument').value.trim();
    
    // Validate form
    if (!validateForm(firstName, lastName, email, country, musicGenre, instrument)) {
        showMessage('Please fill in all fields!', 'error');
        return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address!', 'error');
        return;
    }
    
    // If all validation passes - Log the form data
    console.log('✅ Form submitted successfully! Form Data:', {
        firstName,
        lastName,
        email,
        country,
        musicGenre,
        instrument
    });
    
    // Show success modal
    showSuccessModal(firstName);
    
    // Reset form after modal closes
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 3000);
}

function validateForm(firstName, lastName, email, country, musicGenre, instrument) {
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !country || !musicGenre || !instrument) {
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    let messageElement = document.querySelector('.form-message');
    
    // Remove existing message if any
    if (messageElement) {
        messageElement.remove();
    }
    
    // Create new message element
    messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after the h1
    const heading = document.querySelector('.contact-section h1');
    heading.parentNode.insertBefore(messageElement, heading.nextSibling);
    
    // Auto remove error message after 4 seconds
    if (type === 'error') {
        setTimeout(() => {
            if (messageElement) {
                messageElement.remove();
            }
        }, 4000);
    }
}

function showSuccessModal(firstName) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.success-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">✓</div>
        </div>
        <div class="modal-body">
            <h2>Thank You!</h2>
            <p>Hi <strong>${firstName}</strong>, your message has been received successfully!</p>
            <p class="modal-subtitle">We will get back to you as soon as possible.</p>
        </div>
        <div class="modal-footer">
            <button class="modal-close-btn">Close</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Close button handler
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });
    
    // Click outside modal to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.classList.remove('show');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }
    }, 3000);
}

function removeMessage() {
    const messageElement = document.querySelector('.form-message');
    if (messageElement) {
        messageElement.remove();
    }
}
