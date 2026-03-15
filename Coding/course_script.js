/**
 * Course Schedule Interactive Features
 * - Filter functionality
 * - Row interactions
 * - Dynamic counters
 * - Mobile responsive helpers
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // FILTER FUNCTIONALITY
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tableRows = document.querySelectorAll('.course-table tbody tr');
    const tableBody = document.querySelector('.course-table tbody');
    
    // Filter button click handler
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows with animation
            filterRows(filter);
            updateCounters(filter);
        });
    });
    
    function filterRows(filter) {
        tableRows.forEach((row, index) => {
            const type = row.getAttribute('data-type');
            
            // Add loading state
            row.classList.add('loading');
            
            setTimeout(() => {
                if (filter === 'all' || type === filter) {
                    row.style.display = '';
                    row.classList.add('visible');
                    // Staggered animation
                    row.style.animationDelay = `${index * 0.05}s`;
                } else {
                    row.style.display = 'none';
                    row.classList.remove('visible');
                }
                row.classList.remove('loading');
            }, 150);
        });
    }
    
    // ==========================================
    // DYNAMIC COUNTERS
    // ==========================================
    function updateCounters(filter) {
        const counts = {
            all: tableRows.length,
            core: document.querySelectorAll('tr[data-type="core"]').length,
            elective: document.querySelectorAll('tr[data-type="elective"]').length,
            lab: document.querySelectorAll('tr[data-type="lab"]').length
        };
        
        // Animate number changes
        animateNumber('totalCount', filter === 'all' ? counts.all : 
                     (filter === 'core' ? counts.core : 
                     filter === 'elective' ? counts.elective : counts.lab));
        
        animateNumber('coreCount', counts.core);
        animateNumber('electiveCount', counts.elective);
        animateNumber('labCount', counts.lab);
    }
    
    function animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const startValue = parseInt(element.textContent);
        const duration = 500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // ==========================================
    // ROW INTERACTIONS
    // ==========================================
    tableRows.forEach(row => {
        // Click to highlight
        row.addEventListener('click', function() {
            // Remove highlight from other rows
            tableRows.forEach(r => r.classList.remove('selected'));
            
            // Toggle highlight on clicked row
            this.classList.toggle('selected');
            
            // Show course details (could be expanded)
            const courseName = this.querySelector('td:nth-child(2)').textContent;
            console.log(`Selected: ${courseName}`);
        });
        
        // Double click to show alert with details
        row.addEventListener('dblclick', function() {
            const cells = this.querySelectorAll('td');
            const details = {
                code: cells[0].textContent,
                name: cells[1].textContent,
                instructor: cells[2].textContent,
                schedule: cells[3].textContent,
                room: cells[4].textContent,
                credits: cells[5].textContent,
                type: cells[6].textContent
            };
            
            showCourseModal(details);
        });
    });
    
    // Simple modal function
    function showCourseModal(details) {
        // Create modal if doesn't exist
        let modal = document.getElementById('courseModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'courseModal';
            modal.className = 'course-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>${details.name}</h2>
                    <div class="modal-details"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close button handler
            modal.querySelector('.close-btn').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }
        
        // Update content
        modal.querySelector('h2').textContent = details.name;
        modal.querySelector('.modal-details').innerHTML = `
            <p><strong>Course Code:</strong> ${details.code}</p>
            <p><strong>Instructor:</strong> ${details.instructor}</p>
            <p><strong>Schedule:</strong> ${details.schedule}</p>
            <p><strong>Room:</strong> ${details.room}</p>
            <p><strong>Credits:</strong> ${details.credits}</p>
            <p><strong>Type:</strong> ${details.type}</p>
        `;
        
        modal.style.display = 'flex';
    }
    
    // ==========================================
    // MOBILE RESPONSIVE HELPERS
    // ==========================================
    function setupMobileTable() {
        // Add data-labels for mobile view
        const headers = Array.from(document.querySelectorAll('.course-table th')).map(th => th.textContent);
        
        tableRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index]);
                }
            });
        });
    }
    
    // Initialize mobile setup
    setupMobileTable();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupMobileTable();
        }, 250);
    });
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    let selectedRowIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedRowIndex = (selectedRowIndex + 1) % visibleRows.length;
            highlightRow(visibleRows[selectedRowIndex]);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedRowIndex = selectedRowIndex <= 0 ? visibleRows.length - 1 : selectedRowIndex - 1;
            highlightRow(visibleRows[selectedRowIndex]);
        } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
            visibleRows[selectedRowIndex].dispatchEvent(new Event('dblclick'));
        }
    });
    
    function highlightRow(row) {
        tableRows.forEach(r => r.classList.remove('keyboard-selected'));
        row.classList.add('keyboard-selected');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // ==========================================
    // INITIALIZE
    // ==========================================
    console.log('Course Schedule Loaded Successfully!');
    console.log(`Total Courses: ${tableRows.length}`);
    
    // Add initial animation
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for modal and selected states dynamically
const style = document.createElement('style');
style.textContent = `
    .course-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: modalSlideIn 0.3s ease;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .close-btn {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 28px;
        cursor: pointer;
        color: #64748b;
        transition: color 0.2s;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .close-btn:hover {
        color: #1e293b;
        background: #f1f5f9;
    }
    
    .modal-content h2 {
        margin-bottom: 20px;
        color: #1e293b;
        font-size: 1.5rem;
        padding-right: 30px;
    }
    
    .modal-details p {
        margin: 12px 0;
        color: #475569;
        font-size: 1rem;
        padding: 8px 0;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .modal-details p:last-child {
        border-bottom: none;
    }
    
    .modal-details strong {
        color: #4f46e5;
        display: inline-block;
        width: 120px;
    }
    
    .selected {
        background-color: #c7d2fe !important;
        position: relative;
    }
    
    .keyboard-selected {
        outline: 3px solid #4f46e5;
        outline-offset: -3px;
    }
    
    tr.selected::after {
        content: '✓';
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: #4f46e5;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);