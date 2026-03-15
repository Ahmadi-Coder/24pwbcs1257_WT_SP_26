const form = document.getElementById('registrationForm');
const inputs = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    role: document.getElementById('role'),
    password: document.getElementById('password'),
    terms: document.getElementById('terms')
};
const togglePasswordBtn = document.getElementById('togglePassword');
const successModal = document.getElementById('successModal');
const submitBtn = form.querySelector('button[type="submit"]');

// Password Visibility Toggle
togglePasswordBtn.addEventListener('click', () => {
    const type = inputs.password.getAttribute('type') === 'password' ? 'text' : 'password';
    inputs.password.setAttribute('type', type);
    
    // Update Icon
    const eyeIcon = document.getElementById('eyeIcon');
    if (type === 'text') {
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
    } else {
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    }
});

// Real-time Validation
const validators = {
    fullName: (val) => val.length >= 2,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    role: (val) => val !== "",
    password: (val) => val.length >= 8,
    terms: (val) => val === true
};

// Add input listeners
Object.keys(inputs).forEach(key => {
    const input = inputs[key];
    if (key === 'terms') {
        input.addEventListener('change', () => validateField(key, input.checked));
    } else {
        input.addEventListener('input', () => validateField(key, input.value));
        input.addEventListener('blur', () => validateField(key, input.value));
    }
});

function validateField(key, value) {
    const isValid = validators[key](value);
    const input = inputs[key];
    
    if (key === 'terms') {
        const errorDiv = document.getElementById('termsError');
        if (!isValid) {
            errorDiv.classList.remove('hidden');
        } else {
            errorDiv.classList.add('hidden');
        }
        return isValid;
    }

    if (!isValid && value !== '') {
        input.classList.add('error');
        input.classList.remove('success');
        return false;
    } else if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
        return true;
    } else {
        input.classList.remove('error', 'success');
        return false;
    }
}

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all
    let allValid = true;
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        const value = key === 'terms' ? input.checked : input.value;
        if (!validateField(key, value)) {
            allValid = false;
            if (key !== 'terms') input.classList.add('error');
        }
    });

    if (!allValid) {
        // Shake the form
        form.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        setTimeout(() => form.style.animation = '', 500);
        return;
    }

    // Simulate API Call
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    
    showSuccess();
});

function showSuccess() {
    successModal.classList.add('active');
    createConfetti();
}

function resetForm() {
    successModal.classList.remove('active');
    form.reset();
    Object.values(inputs).forEach(input => {
        if (input.type !== 'checkbox') {
            input.classList.remove('success', 'error');
        }
    });
}

// Confetti Effect
function createConfetti() {
    const colors = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}