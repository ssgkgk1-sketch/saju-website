window.addEventListener("DOMContentLoaded", function() {
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
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "おっと！フォームの送信に問題がありました";
                        status.style.color = "red";
                    }
                })
            }
        }).catch(error => {
            status.innerHTML = "おっと！フォームの送信に問題がありました";
            status.style.color = "red";
        });
    }
    form.addEventListener("submit", handleSubmit)
});
