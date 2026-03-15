// Add click handlers to all CTA buttons
document.querySelectorAll('.card-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Add loading state
        this.classList.add('loading');
        const originalText = this.textContent;
        
        // Simulate API call
        setTimeout(() => {
            this.classList.remove('loading');
            this.textContent = '✓ Added';
            this.style.background = '#10b981';
            
            // Reset after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        }, 800);
    });
});

// Quick view buttons
document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const cardTitle = this.closest('.product-card').querySelector('.card-title').textContent;
        alert(`Quick view: ${cardTitle}`);
    });
});

// Card click handler
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        console.log(`Viewing product: ${title}`);
    });
});