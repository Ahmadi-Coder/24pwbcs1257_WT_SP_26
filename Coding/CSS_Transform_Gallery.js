document.addEventListener('DOMContentLoaded', function() {
    console.log('CSS Transform Gallery loaded');
    
    // Playground elements
    const playgroundBox = document.getElementById('playgroundBox');
    const rotateX = document.getElementById('rotateX');
    const rotateY = document.getElementById('rotateY');
    const rotateZ = document.getElementById('rotateZ');
    const scale = document.getElementById('scale');
    const translateX = document.getElementById('translateX');
    const translateY = document.getElementById('translateY');
    const resetBtn = document.getElementById('resetBtn');
    
    // Value display elements
    const rotateXVal = document.getElementById('rotateXVal');
    const rotateYVal = document.getElementById('rotateYVal');
    const rotateZVal = document.getElementById('rotateZVal');
    const scaleVal = document.getElementById('scaleVal');
    const translateXVal = document.getElementById('translateXVal');
    const translateYVal = document.getElementById('translateYVal');
    
    // Update transform function
    function updateTransform() {
        const rx = rotateX.value;
        const ry = rotateY.value;
        const rz = rotateZ.value;
        const s = scale.value;
        const tx = translateX.value;
        const ty = translateY.value;
        
        // Update value displays
        rotateXVal.textContent = rx;
        rotateYVal.textContent = ry;
        rotateZVal.textContent = rz;
        scaleVal.textContent = s;
        translateXVal.textContent = tx;
        translateYVal.textContent = ty;
        
        // Apply transform
        const transform = `
            translate(${tx}px, ${ty}px)
            scale(${s})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
            rotateZ(${rz}deg)
        `;
        
        playgroundBox.style.transform = transform;
    }
    
    // Add event listeners to all inputs
    const inputs = [rotateX, rotateY, rotateZ, scale, translateX, translateY];
    inputs.forEach(input => {
        input.addEventListener('input', updateTransform);
    });
    
    // Reset button
    resetBtn.addEventListener('click', function() {
        rotateX.value = 0;
        rotateY.value = 0;
        rotateZ.value = 0;
        scale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
        
        updateTransform();
    });
    
    // Initial update
    updateTransform();
});