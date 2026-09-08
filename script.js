/* =========================================================
   AL-JAMIL — PREMIUM INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* PAGE LOAD */
    document.body.classList.add("page-ready");


    /* SMOOTH NAVIGATION */
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* SCROLL REVEAL */
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* NAVBAR SCROLL EFFECT */
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* ACTIVE NAVIGATION LINK */
    const sections = document.querySelectorAll("main section");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* HERO MOUSE MOVEMENT */
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (hero && heroContent && window.matchMedia("(pointer:fine)").matches) {

        hero.addEventListener("mousemove", event => {

            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            heroContent.style.transform =
                `translate3d(${x * 10}px, ${y * 10}px, 0)`;
        });

        hero.addEventListener("mouseleave", () => {
            heroContent.style.transform =
                "translate3d(0, 0, 0)";
        });
    }


    /* VIDEO AUTOPLAY */
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const playVideo = () => {
            const promise = video.play();

            if (promise !== undefined) {
                promise.catch(() => {
                    /* Browser blocked autoplay */
                });
            }
        };

        playVideo();

        video.addEventListener("loadeddata", playVideo);
    });


    /* PRODUCT CARD HOVER */
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("is-hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-hovered");
        });
    });


    /* LAZY LOAD IMAGES */
    const images = document.querySelectorAll("img");

    images.forEach(image => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }

        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });
    });


    /* KEYBOARD ACCESSIBILITY */
    document.addEventListener("keydown", event => {

        if (event.key === "Tab") {
            document.body.classList.add("keyboard-navigation");
        }
    });


    /* REDUCED MOTION */
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {

        document.documentElement.style.scrollBehavior = "auto";

        videos.forEach(video => {
            video.pause();
        });
    }

});