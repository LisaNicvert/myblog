/**
 * Kawaii Theme JavaScript
 * Modern and cool interactions for Hugo theme
 */

(function() {
    'use strict';

    // Theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.querySelector('.kawaii-theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Get saved theme or default to system preference
        let currentTheme = localStorage.getItem('kawaii-theme') || (prefersDark.matches ? 'dark' : 'light');
        
        // Apply theme
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('kawaii-theme', theme);
            currentTheme = theme;
        }
        
        // Initialize theme
        applyTheme(currentTheme);
        
        // Theme toggle click handler
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);
                
                // Add a small animation effect
                document.body.style.transition = 'background-color 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            });
        }
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('kawaii-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.kawaii-mobile-toggle');
        const navMenu = document.querySelector('.kawaii-nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('kawaii-nav-open');
                
                // Animate hamburger
                mobileToggle.classList.toggle('kawaii-mobile-active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('kawaii-nav-open');
                    mobileToggle.classList.remove('kawaii-mobile-active');
                }
            });
        }
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Add scroll-based header styling
    function initScrollHeader() {
        const header = document.querySelector('.kawaii-header');
        let lastScroll = 0;
        
        if (header) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('kawaii-header-scrolled');
                } else {
                    header.classList.remove('kawaii-header-scrolled');
                }
                
                // Hide/show header on scroll
                if (currentScroll > lastScroll && currentScroll > 200) {
                    header.classList.add('kawaii-header-hidden');
                } else {
                    header.classList.remove('kawaii-header-hidden');
                }
                
                lastScroll = currentScroll;
            });
        }
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('kawaii-animate-in');
                }
            });
        }, observerOptions);

        // Observe cards and articles
        document.querySelectorAll('.kawaii-post-card, .kawaii-feature-card, .kawaii-article').forEach(el => {
            observer.observe(el);
        });
    }

    // Add reading progress indicator for articles
    function initReadingProgress() {
        const article = document.querySelector('.kawaii-article');
        if (!article) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'kawaii-reading-progress';
        progressBar.innerHTML = '<div class="kawaii-reading-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const progressBarFill = progressBar.querySelector('.kawaii-reading-progress-bar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBarFill.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        });
    }

    // Add copy code functionality
    function initCodeCopy() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'kawaii-copy-code';
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                </svg>
                Copy
            `;
            
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    button.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        Copied!
                    `;
                    
                    setTimeout(() => {
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                            </svg>
                            Copy
                        `;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            });
            
            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }

    // Search functionality (basic implementation)
    function initSearch() {
        const searchToggle = document.querySelector('.kawaii-search-toggle');
        if (!searchToggle) return;

        const searchModal = document.createElement('div');
        searchModal.className = 'kawaii-search-modal';
        searchModal.innerHTML = `
            <div class="kawaii-search-overlay">
                <div class="kawaii-search-container">
                    <input type="text" class="kawaii-search-input" placeholder="Search posts..." />
                    <div class="kawaii-search-results"></div>
                    <button class="kawaii-search-close">×</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchModal);

        const searchInput = searchModal.querySelector('.kawaii-search-input');
        const searchResults = searchModal.querySelector('.kawaii-search-results');
        const searchClose = searchModal.querySelector('.kawaii-search-close');

        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('kawaii-search-open');
            searchInput.focus();
        });

        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('kawaii-search-open');
        });

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal.querySelector('.kawaii-search-overlay')) {
                searchModal.classList.remove('kawaii-search-open');
            }
        });

        // Simple search implementation (you might want to integrate with a search service)
        let searchData = [];
        
        // Collect searchable content
        document.querySelectorAll('.kawaii-post-card').forEach(card => {
            const title = card.querySelector('.kawaii-card-title a')?.textContent || '';
            const description = card.querySelector('.kawaii-card-description')?.textContent || '';
            const link = card.querySelector('.kawaii-card-title a')?.href || '';
            
            if (title && link) {
                searchData.push({ title, description, link });
            }
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const filteredResults = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );

            if (filteredResults.length === 0) {
                searchResults.innerHTML = '<div class="kawaii-search-no-results">No results found</div>';
            } else {
                searchResults.innerHTML = filteredResults.map(item => `
                    <a href="${item.link}" class="kawaii-search-result">
                        <div class="kawaii-search-result-title">${item.title}</div>
                        <div class="kawaii-search-result-description">${item.description}</div>
                    </a>
                `).join('');
            }
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchModal.classList.remove('kawaii-search-open');
            }
        });
    }

    // Add floating action button for back to top
    function initBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'kawaii-back-to-top';
        backToTop.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5,12 12,5 19,12"></polyline>
            </svg>
        `;
        backToTop.setAttribute('aria-label', 'Back to top');
        
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('kawaii-back-to-top-visible');
            } else {
                backToTop.classList.remove('kawaii-back-to-top-visible');
            }
        });
    }

    // Initialize everything when DOM is loaded
    function init() {
        initThemeToggle();
        initMobileMenu();
        initSmoothScroll();
        initScrollHeader();
        initScrollAnimations();
        initReadingProgress();
        initCodeCopy();
        initSearch();
        initBackToTop();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();