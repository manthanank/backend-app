document.getElementById("unsubscribe").addEventListener("click", async function () {
    try {
        // Get the email from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        // console.log(email);
        if (!email) {
            document.getElementById('message').textContent = 'No email found in the URL.';
            return;
        }

        // Send a POST request to the server
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiEndpoint = isLocal
            ? "http://localhost:3000/api"
            : "https://backend-app-8ev9.onrender.com/api";

        const response = await fetch(`${apiEndpoint}/unsubscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.text();
        console.log('Unsubscribe response:', data);
        document.getElementById('message').textContent = data;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        document.getElementById('message').textContent = 'An error occurred while unsubscribing.';
    }
});
