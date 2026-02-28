// saju-website/script.js - Final Version
window.addEventListener("DOMContentLoaded", function() {
    
    // --- Particles.js Starfield Background ---
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 250, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } },
        "size": { "value": 2, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 0.5, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }, },
      "retina_detect": true
    });

    // --- Scroll-in Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.scroll-animation');
    elementsToAnimate.forEach((el, index) => {
        if (el.classList.contains('suggestion-card') || el.classList.contains('price-card')) {
            el.style.setProperty('--delay', `${(index % 3) * 0.15}s`);
        }
        observer.observe(el);
    });

    // --- Populate Time Dropdowns ---
    function populateTime(selectElement, max, label) {
        for (let i = 0; i < max; i++) {
            let option = document.createElement("option");
            let value = i.toString().padStart(2, '0');
            option.value = value;
            option.textContent = value + label;
            selectElement.appendChild(option);
        }
    }
    const hourSelect = document.getElementById('birth-hour');
    const minuteSelect = document.getElementById('birth-minute');
    if(hourSelect) populateTime(hourSelect, 24, '시');
    if(minuteSelect) populateTime(minuteSelect, 60, '분');

    // --- Handle "Unknown time" checkbox ---
    const unknownTimeCheckbox = document.getElementById('time-unknown');
    if (unknownTimeCheckbox && hourSelect && minuteSelect) {
        unknownTimeCheckbox.addEventListener('change', function() {
            const isDisabled = this.checked;
            hourSelect.disabled = isDisabled;
            minuteSelect.disabled = isDisabled;
            if (isDisabled) {
                hourSelect.required = false; minuteSelect.required = false;
            } else {
                hourSelect.required = true; minuteSelect.required = true;
            }
        });
    }

    // --- Formspree Logic ---
    var form = document.getElementById("saju-form");
    var formContainer = document.getElementById("form-container");
    var paymentInstructions = document.getElementById("payment-instructions");
    
    async function handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        var submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {'Accept': 'application/json'}
        }).then(response => {
            if (response.ok) {
                formContainer.style.display = 'none';
                paymentInstructions.style.display = 'block';
            } else {
                response.json().then(data => {
                    alert(data.errors ? data.errors.map(e => e.message).join(", ") : "오류가 발생했습니다.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = '상담 신청하기';
                })
            }
        }).catch(error => {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
            submitBtn.disabled = false;
            submitBtn.textContent = '상담 신청하기';
        });
    }
    form.addEventListener("submit", handleSubmit)
});
