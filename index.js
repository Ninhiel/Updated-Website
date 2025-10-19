const openNav = document.querySelector('#menu-toggle');
const NavContainer = document.querySelector('.NavContainer');
const close = document.querySelector('#Close');

openNav.addEventListener("click", ()=> {
    if(openNav) {
        NavContainer.style.display = "flex";
    } 
})

close.addEventListener('click', ()=> {
    if (close) {
        NavContainer.style.display = "none";
    }
})

const slider = document.getElementById('slider');
let index = 0;
const slides = document.querySelectorAll('.slide').length;
const slideWidth = 700; 

setInterval(() => {
    index = (index + 1) % slides;
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
}, 3000);

const storiesGrid = document.getElementById('storiesGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scrollDistance = 310; 
const autoScrollInterval = 3000; 
let scrollTimer;

function startAutoScroll() {
    if (scrollTimer) return;

    scrollTimer = setInterval(() => {
        const scrollEnd = storiesGrid.scrollWidth - storiesGrid.clientWidth;
        if (storiesGrid.scrollLeft >= scrollEnd - 5) {
            storiesGrid.scrollLeft = 0;
        } else {
            storiesGrid.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        }
    }, autoScrollInterval);
}
function stopAutoScroll() {
    clearInterval(scrollTimer);
    scrollTimer = null; 
}
function resetAutoScroll() {
    stopAutoScroll(); 
    startAutoScroll();
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        storiesGrid.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        resetAutoScroll();
    });
}
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        storiesGrid.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        resetAutoScroll();
    });
}
if (storiesGrid) {
    storiesGrid.addEventListener('mouseenter', stopAutoScroll);
    storiesGrid.addEventListener('mouseleave', startAutoScroll);
    startAutoScroll();
}

// Subject Hover Dropdown Functionality 
const bottomNav = document.querySelector('.bottomNavBAR');
const subjectDropdown = document.getElementById('subjectDropdown');

if (bottomNav && subjectDropdown) {
    subjectDropdown.style.display = 'none';
    subjectDropdown.style.position = 'absolute';

    const subjectLinks = bottomNav.querySelectorAll('.courses-links a');

    function showDropdownFor(link) {
        // Make dropdown visible but hidden to measure its width
        subjectDropdown.style.display = 'block';
        subjectDropdown.style.visibility = 'hidden';
        subjectDropdown.style.left = '0px';

        const rect = link.getBoundingClientRect();
        const navRect = bottomNav.getBoundingClientRect();
        const dropdownWidth = subjectDropdown.offsetWidth || subjectDropdown.getBoundingClientRect().width || 200;

        // center dropdown relative to the hovered link
        let left = rect.left - navRect.left + bottomNav.scrollLeft + (rect.width / 2) - (dropdownWidth / 2);

        // clamp so dropdown stays inside bottomNav bounds
        const minLeft = 0;
        const maxLeft = Math.max(0, bottomNav.clientWidth - dropdownWidth);
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;

        subjectDropdown.style.left = `${left}px`;
        subjectDropdown.style.top = `${rect.bottom - navRect.top}px`;

        // restore visibility
        subjectDropdown.style.visibility = 'visible';
        subjectDropdown.style.display = 'block';
    }

    let hideTimer = null;
    function scheduleHide() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            if (![...subjectLinks].some(l => l.matches(':hover')) && !subjectDropdown.matches(':hover')) {
                subjectDropdown.style.display = 'none';
                subjectLinks.forEach(l => l.classList.remove('subject-active'));
            }
        }, 50);
    }

    subjectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            showDropdownFor(link);
            subjectLinks.forEach(l => l.classList.remove('subject-active'));
            link.classList.add('subject-active');
        });

        link.addEventListener('mouseleave', () => {
            scheduleHide();
        });
    });

    subjectDropdown.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
        subjectDropdown.style.display = 'block';
    });
    subjectDropdown.addEventListener('mouseleave', scheduleHide);

    window.addEventListener('resize', () => {
        subjectDropdown.style.display = 'none';
    });
}

// Search Overlay Functionality
let searchIcon = document.getElementById('searchIcon') || document.querySelector('.search .fa-search') || document.querySelector('.search i');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');

function hideSearch() {
    if (searchOverlay) {
        searchOverlay.style.opacity = '0'; 
        setTimeout(() => {
            searchOverlay.style.display = 'none';
        }, 300); 
    }
}

function showSearch() {
    if (!searchOverlay) return;
    searchOverlay.style.display = 'block';
    // allow CSS transition; small timeout ensures opacity transition works
    setTimeout(() => {
        searchOverlay.style.opacity = '1';
        if (searchInput) searchInput.focus();
    }, 10);
}

if (searchIcon && searchOverlay) {
    searchIcon.addEventListener('click', (event) => {
        event.preventDefault();
        showSearch();
    });
}

// close handlers
if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', hideSearch);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchOverlay && searchOverlay.style.opacity === '1') {
        hideSearch();
    }
});

if (searchOverlay) {
    searchOverlay.addEventListener('click', (event) => {
        if (event.target === searchOverlay) {
            hideSearch();
        }
    });
}

// handle Enter key on search input
if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                console.log('Search query:', query);
            }
            hideSearch();
        }
    });
}
