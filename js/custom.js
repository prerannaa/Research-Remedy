// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// Add scroll effect to navigation bar for better contrast
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header_section');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Service cards: collapse to 50% height and expand on "Read More"
function initServiceReadMore() {
    var toggles = document.querySelectorAll('.service-read-more');
    if (!toggles.length) return;

    toggles.forEach(function(toggle) {
        // Prevent duplicate listeners if this is re-initialized
        if (toggle.dataset.readMoreInit === 'true') return;

        var detailBox = toggle.closest('.detail-box');
        if (!detailBox) return;

        var box = toggle.closest('.box');
        if (!box) return;

        var p = detailBox.querySelector('p');
        if (!p) return;

        // Measure natural sizes (uncollapsed)
        toggle.style.display = 'none';
        p.style.overflow = 'visible';
        p.style.maxHeight = 'none';

        // Use 50% of the whole card height as the collapsed text height target
        var boxHeight = box.getBoundingClientRect().height;
        var collapsedHeight = Math.max(80, Math.round(boxHeight * 0.5));
        var fullHeight = p.scrollHeight;

        // Only enable "Read More" if the text would overflow the collapsed height
        if (fullHeight <= collapsedHeight + 1) {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.textContent = 'Read Less';
            p.classList.remove('is-collapsed');
            // keep paragraph fully visible
            p.style.overflow = 'visible';
            p.style.maxHeight = 'none';
            // keep toggle hidden since it isn't needed
            toggle.style.display = 'none';
            toggle.dataset.readMoreInit = 'true';
            return;
        }

        // Collapse
        p.style.overflow = 'hidden';
        p.dataset.fullHeight = String(fullHeight);
        p.dataset.collapsedHeight = String(collapsedHeight);
        p.style.maxHeight = collapsedHeight + 'px';
        p.classList.add('is-collapsed');
        toggle.textContent = 'Read More';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.style.display = '';

        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                p.style.maxHeight = p.dataset.collapsedHeight + 'px';
                p.classList.add('is-collapsed');
                toggle.textContent = 'Read More';
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                // Recompute full height in case fonts/layout changed
                p.style.maxHeight = 'none';
                var newFullHeight = p.scrollHeight;
                p.dataset.fullHeight = String(newFullHeight);
                p.style.maxHeight = newFullHeight + 'px';
                p.classList.remove('is-collapsed');
                toggle.textContent = 'Read Less';
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        toggle.dataset.readMoreInit = 'true';
    });
}

document.addEventListener('DOMContentLoaded', initServiceReadMore);

// Contact form: simple client-side validation + feedback message (no backend)
function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var statusEl = document.getElementById('contactFormStatus');

    function setStatus(message, type) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.style.color = type === 'error' ? '#b00020' : '#1b5e20';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = (document.getElementById('contactName') || {}).value || '';
        var email = (document.getElementById('contactEmail') || {}).value || '';
        var subject = (document.getElementById('contactSubject') || {}).value || '';
        var message = (document.getElementById('contactMessage') || {}).value || '';

        name = name.trim();
        email = email.trim();
        subject = subject.trim();
        message = message.trim();

        if (!name || !email || !subject || !message) {
            setStatus('Please fill in all fields.', 'error');
            return;
        }

        // Basic email check
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setStatus('Please enter a valid email address.', 'error');
            return;
        }

        setStatus('Thanks! Your message has been recorded (demo form).', 'success');
        form.reset();
    });
}

document.addEventListener('DOMContentLoaded', initContactForm);


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});



/** google_map js **/
function myMap() {
    var el = document.getElementById("googleMap");
    if (!el || !window.google || !google.maps) return;

    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(el, mapProp);
}