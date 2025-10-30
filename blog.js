// Category filtering
const filterButtons = document.querySelectorAll('.category-filter');
const blogCards = document.querySelectorAll('.blog-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        blogCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add click handlers to blog cards
blogCards.forEach(card => {
    card.addEventListener('click', () => {
        alert('Blog post coming soon! This is a placeholder for future content.');
    });
});