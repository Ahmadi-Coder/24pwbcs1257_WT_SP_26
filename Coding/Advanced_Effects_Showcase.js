document.addEventListener('DOMContentLoaded', function() {
    console.log('Advanced Effects Showcase loaded');
    
    // Shadow Builder
    const shadowPreview = document.getElementById('shadowPreview');
    const xOffset = document.getElementById('xOffset');
    const yOffset = document.getElementById('yOffset');
    const blurRadius = document.getElementById('blurRadius');
    const spreadRadius = document.getElementById('spreadRadius');
    const shadowOpacity = document.getElementById('shadowOpacity');
    const shadowColor = document.getElementById('shadowColor');
    const insetShadow = document.getElementById('insetShadow');
    const copyBtn = document.getElementById('copyCSS');
    
    // Value displays
    const xVal = document.getElementById('xVal');
    const yVal = document.getElementById('yVal');
    const blurVal = document.getElementById('blurVal');
    const spreadVal = document.getElementById('spreadVal');
    const opacityVal = document.getElementById('opacityVal');
    
    function updateShadow() {
        const x = xOffset.value;
        const y = yOffset.value;
        const blur = blurRadius.value;
        const spread = spreadRadius.value;
        const opacity = shadowOpacity.value;
        const color = shadowColor.value;
        const inset = insetShadow.checked ? 'inset ' : '';
        
        // Update displays
        xVal.textContent = x;
        yVal.textContent = y;
        blurVal.textContent = blur;
        spreadVal.textContent = spread;
        opacityVal.textContent = opacity;
        
        // Convert hex to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        const shadowValue = `${inset}${x}px ${y}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        shadowPreview.style.boxShadow = shadowValue;
    }
    
    // Add listeners
    [xOffset, yOffset, blurRadius, spreadRadius, shadowOpacity, shadowColor, insetShadow].forEach(el => {
        el.addEventListener('input', updateShadow);
    });
    
    // Copy CSS
    copyBtn.addEventListener('click', function() {
        const x = xOffset.value;
        const y = yOffset.value;
        const blur = blurRadius.value;
        const spread = spreadRadius.value;
        const opacity = shadowOpacity.value;
        const color = shadowColor.value;
        const inset = insetShadow.checked ? 'inset ' : '';
        
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        const cssCode = `box-shadow: ${inset}${x}px ${y}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity});`;
        
        navigator.clipboard.writeText(cssCode).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = 'Copy CSS';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
    
    // Day/Night toggle animation
    const dayNightToggle = document.getElementById('dayNightToggle');
    dayNightToggle.addEventListener('change', function() {
        console.log('Day/Night:', this.checked ? 'Night' : 'Day');
    });
    
    // Initial update
    updateShadow();
});