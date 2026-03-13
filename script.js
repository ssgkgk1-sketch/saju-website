// saju-website/script.js - Final Version
window.addEventListener("DOMContentLoaded", function() {
    
    // --- Particles.js Starfield Background ---
    if (typeof particlesJS !== 'undefined') {
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
    }

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

    // --- Formspree Logic & UI Transition ---
    const form = document.getElementById("saju-form");
    const formContainer = document.getElementById("form-container");
    const successMessage = document.getElementById("success-message");
    
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const submitBtn = form.querySelector('.submit-btn');
            
            submitBtn.disabled = true;
            submitBtn.textContent = '신청 전송 중...';

            // 서버 응답과 상관없이 사용자에게는 즉시 성공 화면을 보여줌 (에러 팝업 완전 제거)
            fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: {'Accept': 'application/json'}
            }).catch(error => {
                console.log("Background email send error, but continuing flow.");
            });

            // 화면 전환: 입력창 숨기고 성공 메시지 표시
            if (formContainer && successMessage) {
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
                // 화면을 성공 메시지 위치로 부드럽게 이동
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});

// 탭 전환 로직
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
        element.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 포춘쿠키 로직
const fortunes = [
    "뜻밖의 인연이 당신의 하루를 빛나게 할 것입니다.",
    "오랫동안 기다려온 소식이 드디어 문을 두드리는 날입니다.",
    "오늘은 본인의 감각을 믿으세요. 당신의 선택은 옳을 것입니다.",
    "작은 친절이 큰 행운이 되어 돌아올 것입니다.",
    "새로운 시작을 하기에 완벽한 기운이 모이고 있습니다.",
    "마음의 여유를 가지면 보이지 않던 기회가 보일 것입니다."
];

function crackCookie() {
    const msg = document.getElementById('cookie-msg');
    const cookieBtn = document.getElementById('cookie-btn');
    if (msg && cookieBtn) {
        msg.style.display = 'block';
        msg.innerText = fortunes[Math.floor(Math.random() * fortunes.length)];
        cookieBtn.innerText = '🍪';
        setTimeout(() => { cookieBtn.innerText = '🥠'; }, 800);
    }
}

// 오늘의 운세 로직
function getDailyFortune() {
    const y = document.getElementById('birth-year-v')?.value;
    const m = document.getElementById('birth-month-v')?.value;
    const d = document.getElementById('birth-day-v')?.value;
    const resultBox = document.getElementById('daily-result-box');
    const totalLuck = document.getElementById('total-luck');

    if(!y || !m || !d) { 
        alert("생년월일을 모두 입력해주세요!"); 
        return; 
    }
    
    if (resultBox && totalLuck) {
        resultBox.style.display = 'block';
        totalLuck.innerText = `입력하신 ${y}년 ${m}월 ${d}일의 기운을 분석한 결과, 오늘은 정적인 활동보다 동적인 활동에서 큰 이득이 있는 날입니다. 자신감을 가지고 움직이세요!`;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// 태어난 시간 입력 제어
function toggleTimeInput(checkbox) {
    const hour = document.getElementById('birth-hour-input');
    const min = document.getElementById('birth-min-input');
    if (hour && min) {
        hour.disabled = checkbox.checked;
        min.disabled = checkbox.checked;
        hour.style.opacity = checkbox.checked ? '0.3' : '1';
        min.style.opacity = checkbox.checked ? '0.3' : '1';
    }
}
