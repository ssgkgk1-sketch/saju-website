window.addEventListener("DOMContentLoaded", function() {
    // Populate time dropdowns
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

    // Handle "Unknown time" checkbox
    const unknownTimeCheckbox = document.getElementById('time-unknown');
    if (unknownTimeCheckbox && hourSelect && minuteSelect) {
        unknownTimeCheckbox.addEventListener('change', function() {
            const isDisabled = this.checked;
            hourSelect.disabled = isDisabled;
            minuteSelect.disabled = isDisabled;
            if (isDisabled) {
                hourSelect.value = "";
                minuteSelect.value = "";
                hourSelect.required = false;
                minuteSelect.required = false;
            } else {
                hourSelect.required = true;
                minuteSelect.required = true;
            }
        });
    }

    // Formspree form submission logic
    var form = document.getElementById("saju-form");
    var paymentInstructions = document.getElementById("payment-instructions");
    var formContainer = document.getElementById("form-container");


    async function handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // On success, redirect to KakaoTalk open chat
                window.location.href = "https://open.kakao.com/o/sgbQDnii";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert("입력 내용에 오류가 있습니다: " + data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("오류가 발생했습니다. 다시 시도해주세요.");
                    }
                })
            }
        }).catch(error => {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        });
    }
    form.addEventListener("submit", handleSubmit)
});
