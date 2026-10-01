// Navbar active state + smooth scrolling dengan offset navbar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('#beranda, #program, #membership, #trainer, #fasilitas, #testimoni, #kontak');

    function setActive(hash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Klik: pindah active langsung + scroll halus
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            setActive(targetId);
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // update URL tanpa loncat
                history.replaceState(null, '', targetId);
            }
        });
    });

    // Scroll: active ngikutin section yang lagi kelihatan (scrollspy)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive('#' + entry.target.id);
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(sec => observer.observe(sec));

    // Smooth scrolling umum untuk link lain (footer, tombol, dsb)
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
