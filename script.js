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
                // When "unknown" is checked, clear values and make not required
                hourSelect.value = "";
                minuteSelect.value = "";
                hourSelect.required = false;
                minuteSelect.required = false;
            } else {
                // When unchecked, make required again
                hourSelect.required = true;
                minuteSelect.required = true;
            }
        });
    }

    // Formspree form submission logic
    var form = document.getElementById("saju-form");
    var status = document.getElementById("form-status");

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
                status.innerHTML = "신청이 성공적으로 접수되었습니다. 감사합니다.";
                status.style.color = "green";
                form.reset();
                // After form reset, also reset the state of the time selectors
                if (unknownTimeCheckbox && hourSelect && minuteSelect) {
                    hourSelect.disabled = false;
                    minuteSelect.disabled = false;
                    hourSelect.required = true;
                    minuteSelect.required = true;
                    unknownTimeCheckbox.checked = false;
                }
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "오류가 발생했습니다. 다시 시도해주세요.";
                        status.style.color = "red";
                    }
                })
            }
        }).catch(error => {
            status.innerHTML = "오류가 발생했습니다. 다시 시도해주세요.";
            status.style.color = "red";
        });
    }
    form.addEventListener("submit", handleSubmit)
});
