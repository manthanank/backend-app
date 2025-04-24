const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';
const apiEndpoint = isLocal
  ? 'http://localhost:3000/api/locations'
  : 'https://backend-app-manthanank.vercel.app/api/locations';

async function fetchStates() {
  const response = await fetch(`${apiEndpoint}/states`);
  const states = await response.json();
  const statesDropdown = document.getElementById('statesDropdown');
  states.forEach((state) => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    statesDropdown.appendChild(option);
  });
  statesDropdown.addEventListener('change', fetchDistricts);
}

async function fetchDistricts() {
  const state = document.getElementById('statesDropdown').value;
  const response = await fetch(`${apiEndpoint}/districts/${state}`);
  const districts = await response.json();
  const districtsDropdown = document.getElementById('districtsDropdown');
  districtsDropdown.innerHTML = '<option value="">Select District</option>';
  districts.forEach((district) => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    districtsDropdown.appendChild(option);
  });
}

// Fetch states on page load
fetchStates();
