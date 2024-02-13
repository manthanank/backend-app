document.addEventListener('DOMContentLoaded', () => {
    const sendOTPForm = document.getElementById('sendOTPForm');

    if (sendOTPForm) {
        sendOTPForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = sendOTPForm.elements.email.value;
            
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiEndpoint = isLocal
                ? "http://localhost:3000/api"
                : "https://backend-app-8ev9.onrender.com/api";

            const response = await fetch(`${apiEndpoint}/sendOTP?email=${email}`);

            const result = await response.json();
            // console.log(result);
            alert(result.message);
        });
    }
});