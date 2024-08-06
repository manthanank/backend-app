document.addEventListener('DOMContentLoaded', () => {
    const verifyOTPForm = document.getElementById('verifyOTPForm');

    if (verifyOTPForm) {
        verifyOTPForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = verifyOTPForm.elements.email.value;
            const otp = verifyOTPForm.elements.otp.value;

            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiEndpoint = isLocal
                ? "http://localhost:3000/api"
                : "https://backend-app-manthanank.vercel.app/api";

            const response = await fetch(`${apiEndpoint}/verifyOTP?email=${email}&otp=${otp}`);
            
            const result = await response.json();
            // console.log(result);
            alert(result.message);
            if (result.success) {
                window.location.href = 'success.html';
            }
        });
    }
});