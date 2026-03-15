// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
    
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        console.log('Mobile elements found');
        
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile toggle clicked');
            
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Mobile elements not found');
    }

    // Mobile dropdowns
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    console.log('Found mobile dropdowns:', mobileDropdownToggles.length);
    
    mobileDropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile dropdown clicked');
            
            const dropdown = this.parentElement;
            dropdown.classList.toggle('open');
        });
    });

    // Sidebar dropdowns
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    console.log('Found sidebar toggles:', sidebarToggles.length);
    
    sidebarToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sidebar toggle clicked');
            
            const item = this.closest('.sidebar-item');
            item.classList.toggle('open');
        });
    });

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Add click handlers for nav buttons (demo)
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const text = this.textContent.trim();
            console.log('Button clicked:', text);
            alert('Clicked: ' + text);
        });
    });

    // Close mobile menu when clicking on regular links
    const regularLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle)');
    regularLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

});