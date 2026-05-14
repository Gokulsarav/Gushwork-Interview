document.addEventListener('DOMContentLoaded', function () {

    // Product Gallery Thumbnails
    const thumbItems = document.querySelectorAll('.thumb');
    const heroImage = document.querySelector('.main-product-image');

    // gallery image sources
    const galleryImages = [
        "./assets/hdpe-product.jpg",
        "./assets/hdpe-product.jpg",
        "./assets/hdpe-product.jpg",
        "./assets/hdpe-product.jpg",
        "./assets/hdpe-product.jpg",
        "./assets/hdpe-product.jpg"
    ];

    // Set up thumbnail click handlers
    thumbItems.forEach(function (thumb, i) {
        // apply background preview on each thumb
        if (galleryImages[i]) {
            thumb.style.backgroundImage = `url(${galleryImages[i]})`;
            thumb.style.backgroundSize = "cover";
        }

        thumb.addEventListener('click', function () {
            // clear active state from all thumbs
            thumbItems.forEach(function (t) { t.classList.remove('active'); });
            thumb.classList.add('active');

            // swap the hero image with a quick fade
            if (heroImage && galleryImages[i]) {
                heroImage.style.opacity = '0.6';
                setTimeout(function () {
                    heroImage.src = galleryImages[i];
                    heroImage.style.opacity = '1';
                }, 120);
            }
        });
    });

    // Gallery Arrow Navigation
    const prevArrow = document.querySelector('.product-gallery .prev');
    const nextArrow = document.querySelector('.product-gallery .next');
    let activeSlide = 0;

    // switches the hero image and highlights the right thumbnail
    function switchGallerySlide(idx) {
        thumbItems.forEach(function (t) { t.classList.remove('active'); });
        if (thumbItems[idx]) thumbItems[idx].classList.add('active');

        if (heroImage && galleryImages[idx]) {
            heroImage.style.opacity = '0.6';
            setTimeout(function () {
                heroImage.src = galleryImages[idx];
                heroImage.style.opacity = '1';
            }, 120);
        }
    }

    // prev/next button handlers
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', function () {
            if (activeSlide === 0) {
                activeSlide = galleryImages.length - 1;
            } else {
                activeSlide--;
            }
            switchGallerySlide(activeSlide);
        });
        nextArrow.addEventListener('click', function () {
            if (activeSlide === galleryImages.length - 1) {
                activeSlide = 0;
            } else {
                activeSlide++;
            }
            switchGallerySlide(activeSlide);
        });
    }

    // Enhanced Side-by-Side Zoom functionality
    function initProductZoom(imgID, resultID, lensID) {
        const img = document.getElementById(imgID);
        const result = document.getElementById(resultID);
        const lens = document.getElementById(lensID);

        if (!img || !result || !lens) return;

        let cx, cy;

        function updateRatios() {
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
            result.style.backgroundSize = (img.offsetWidth * cx) + "px " + (img.offsetHeight * cy) + "px";
        }

        img.addEventListener('load', updateRatios);
        window.addEventListener('resize', updateRatios);
        updateRatios();

        function moveLens(e) {
            e.preventDefault();
            const pos = getCursorPos(e);
            let x = pos.x - (lens.offsetWidth / 2);
            let y = pos.y - (lens.offsetHeight / 2);

            if (x > img.offsetWidth - lens.offsetWidth) x = img.offsetWidth - lens.offsetWidth;
            if (x < 0) x = 0;
            if (y > img.offsetHeight - lens.offsetHeight) y = img.offsetHeight - lens.offsetHeight;
            if (y < 0) y = 0;

            lens.style.left = x + "px";
            lens.style.top = y + "px";
            result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        }

        function getCursorPos(e) {
            const a = img.getBoundingClientRect();
            let x = (e.pageX || e.touches[0].pageX) - a.left - window.pageXOffset;
            let y = (e.pageY || e.touches[0].pageY) - a.top - window.pageYOffset;
            return { x: x, y: y };
        }

        const showZoom = () => {
            lens.style.display = "block";
            result.style.display = "block";
            result.style.backgroundImage = `url('${img.src}')`;
            updateRatios();
        };

        const hideZoom = () => {
            lens.style.display = "none";
            result.style.display = "none";
        };

        img.addEventListener("mouseenter", showZoom);
        img.addEventListener("mousemove", moveLens);
        img.addEventListener("mouseleave", hideZoom);

        // Touch support
        img.addEventListener("touchstart", showZoom);
        img.addEventListener("touchmove", moveLens);
        img.addEventListener("touchend", hideZoom);
    }

    initProductZoom('main-product-image', 'zoom-result', 'zoom-lens');

    // Keep the simple zoom for app cards
    function initSimpleZoom(containerSelector, imageSelector, scale = 1.3) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const image = container.querySelector(imageSelector);
            if (!image) return;
            container.addEventListener('mousemove', function (e) {
                const bounds = container.getBoundingClientRect();
                const posX = ((e.clientX - bounds.left) / bounds.width) * 100;
                const posY = ((e.clientY - bounds.top) / bounds.height) * 100;
                image.style.transformOrigin = posX + '% ' + posY + '%';
                image.style.transform = `scale(${scale})`;
            });
            container.addEventListener('mouseleave', function () {
                image.style.transform = 'scale(1)';
            });
        });
    }
    initSimpleZoom('.app-card', 'img', 1.3);


    // FAQ Toggle (exclusive)
    const faqEntries = document.querySelectorAll('.faq-item');

    faqEntries.forEach(function (entry) {
        var trigger = entry.querySelector('.faq-header');
        trigger.addEventListener('click', function () {
            var wasOpen = entry.classList.contains('active');

            faqEntries.forEach(function (faq) {
                faq.classList.remove('active');
                faq.querySelector('.faq-body').style.display = 'none';
                faq.querySelector('.faq-toggle i').className = 'fa-solid fa-chevron-down';
            });

            if (!wasOpen) {
                entry.classList.add('active');
                entry.querySelector('.faq-body').style.display = 'block';
                entry.querySelector('.faq-toggle i').className = 'fa-solid fa-chevron-up';
            }
        });
    });

    // Modals
    const downloadModal = document.getElementById('downloadModal');
    const openDownloadBtn = document.getElementById('openDownloadModal');
    const closeDownloadBtn = document.getElementById('closeDownloadModal');

    const quoteModal = document.getElementById('quoteModal');
    const openQuoteBtn = document.getElementById('openQuoteModal');
    const closeQuoteBtn = document.getElementById('closeQuoteModal');

    // UI Logic: Show 'Download' modal
    if (openDownloadBtn && downloadModal) {
        openDownloadBtn.addEventListener('click', () => {
            downloadModal.classList.add('active');
        });
    }
    // UI Logic: Show 'Quote' modal
    if (openQuoteBtn && quoteModal) {
        openQuoteBtn.addEventListener('click', () => {
            quoteModal.classList.add('active');
        });
    }

    // UI Logic: Close buttons for modals
    if (closeDownloadBtn && downloadModal) {
        closeDownloadBtn.addEventListener('click', () => downloadModal.classList.remove('active'));
    }
    if (closeQuoteBtn && quoteModal) {
        closeQuoteBtn.addEventListener('click', () => quoteModal.classList.remove('active'));
    }

    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) downloadModal.classList.remove('active');
        if (e.target === quoteModal) quoteModal.classList.remove('active');
    });

    const carouselTrack = document.querySelector('.apps-carousel');
    const scrollBtns = document.querySelectorAll('.apps-nav .nav-circle');
    var scrollStep = 340;

    if (carouselTrack && scrollBtns.length >= 2) {
        scrollBtns[0].addEventListener('click', function () {
            carouselTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
        scrollBtns[1].addEventListener('click', function () {
            carouselTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    // Manufacturing Stepper
    // controls the 8-step process section with dynamic content swapping
    const processPanel = document.querySelector('.mfg-content-split');
    const stepDots = document.querySelectorAll('.mfg-step');
    const stepPrev = document.querySelector('.mfg-prev');
    const stepNext = document.querySelector('.mfg-next');

    if (processPanel && stepDots.length > 0) {
        var stepIndex = 0;

        // content for each manufacturing stage
        const mfgData = [
            {
                title: "High-Grade Raw Material Selection",
                desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
                checklist: ["PE100 grade material", "Optimal molecular weight distribution"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Advanced Extrusion Process",
                desc: "State-of-the-art extruders maintain uniform melt temperature and steady output for consistent pipe quality.",
                checklist: ["Continuous monitoring", "Energy efficient systems"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Precision Cooling",
                desc: "Controlled cooling baths ensure uniform structural integrity without internal stresses.",
                checklist: ["Multi-stage cooling baths", "Temperature regulated"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Accurate Sizing",
                desc: "Vacuum calibration chambers lock exactly to specified diameters and tolerances.",
                checklist: ["Laser diameter control", "Zero tolerance deviation"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Stringent Quality Control",
                desc: "Inline ultrasonic testing checks wall thickness and searches for structural imperfections.",
                checklist: ["Ultrasonic scanning", "Hydraulic pressure testing"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Continuous Marking",
                desc: "Hot foil or inkjet printing applied sequentially for full batch traceability.",
                checklist: ["Standard compliance marks", "Meter marking"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Automated Cutting",
                desc: "Planetary saws produce perfectly clean, square cuts at exact specified lengths.",
                checklist: ["Dust-free extraction", "Chamfering capabilities"],
                img: "./assets/hdpe-product.jpg"
            },
            {
                title: "Secure Packaging",
                desc: "Coiling or straight length bundling prepared for safe transport and outdoor storage.",
                checklist: ["UV resistant wrapping", "Secure strapping"],
                img: "./assets/hdpe-product.jpg"
            }
        ];

        // renders the right content for a given step index
        function renderStep(idx) {
            stepDots.forEach(function (s) { s.classList.remove('active'); });
            if (stepDots[idx]) stepDots[idx].classList.add('active');

            var heading = processPanel.querySelector('.mfg-step-title');
            var desc = processPanel.querySelector('.mfg-step-desc');
            var checkList = processPanel.querySelector('.mfg-checklist');
            var photo = processPanel.querySelector('.mfg-content-right img');

            if (heading && mfgData[idx]) heading.textContent = mfgData[idx].title;
            if (desc && mfgData[idx]) desc.textContent = mfgData[idx].desc;

            // rebuild the checklist items
            if (checkList && mfgData[idx]) {
                checkList.innerHTML = '';
                mfgData[idx].checklist.forEach(function (text) {
                    var li = document.createElement('li');
                    li.innerHTML = '<img src="./assets/icons/check-circle.svg" class="check-icon" alt="Check"> ' + text;
                    checkList.appendChild(li);
                });
            }

            if (photo && mfgData[idx]) photo.src = mfgData[idx].img;
        }

        // prev/next controls for the stepper
        if (stepPrev && stepNext) {
            stepPrev.addEventListener('click', function () {
                stepIndex = (stepIndex > 0) ? stepIndex - 1 : mfgData.length - 1;
                renderStep(stepIndex);
            });
            stepNext.addEventListener('click', function () {
                stepIndex = (stepIndex < mfgData.length - 1) ? stepIndex + 1 : 0;
                renderStep(stepIndex);
            });
        }

        // clicking a step dot jumps straight to it
        stepDots.forEach(function (dot, n) {
            dot.addEventListener('click', function () {
                stepIndex = n;
                renderStep(stepIndex);
            });
        });
    }

    // Header Scroll Behaviour
    var siteHeader = document.querySelector('.main-header');

    if (siteHeader) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                siteHeader.classList.add('is-sticky');
            } else {
                siteHeader.classList.remove('is-sticky');
            }
        });
    }



});

