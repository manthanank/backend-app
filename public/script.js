document.addEventListener("DOMContentLoaded", function () {
    const contactsTableBody = document.getElementById('contactsTableBody');
    let currentPage = 1;
    const pageSize = 10; // Set your default page size

    // Function to handle delegated events
    function handleTableClick(event) {
        const target = event.target;

        // Check if the clicked element or its parent has the specified data-action attribute
        const actionElement = target.closest('[data-action="deleteContact"]');
        if (actionElement) {
            const contactId = actionElement.dataset.contactId;

            if (contactId && confirm('Are you sure you want to delete this contact?')) {
                deleteContact(contactId);
            }
        }
    }

    // Add event listener to the tbody for delegated events
    contactsTableBody.addEventListener('click', handleTableClick);

    // Function to create a contact row
    function createContactRow(contact) {
        const row = document.createElement('tr');
        row.setAttribute('data-contact-id', contact._id);

        // Create and append ID, Name, Email cells
        ['_id', 'name', 'email', 'message'].forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = contact[key];
            row.appendChild(cell);
        });

        // Create and append Delete button cell
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.action = 'deleteContact';
        deleteButton.dataset.contactId = contact._id;
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        return row;
    }

    // Function to display an error message
    function displayErrorMessage(message) {
        const errorElement = document.getElementById('errorMessage');
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Optional: Implement a mechanism to hide the error message after a certain duration
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }

    async function fetchAndPopulateContacts(page) {
        try {
            // const apiEndpoint = "http://localhost:3000/api/contacts";
            const apiEndpoint = "https://backend-app-8ev9.onrender.com/api/contacts";
            const response = await fetch(`${apiEndpoint}?page=${page}&pageSize=${pageSize}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Clear the table body
            contactsTableBody.innerHTML = '';

            if (data.data.length === 0) {
                displayNoContactsMessage();
            } else {
                // Add actual contact rows
                data.data.forEach(contact => {
                    contactsTableBody.appendChild(createContactRow(contact));
                });
            }

            // Update total count and page count
            updateTotalAndPageCount(data.totalContacts);

            // Update current page display
            updateCurrentPageDisplay();
        } catch (error) {
            console.error('Error fetching contacts:', error);
            displayErrorMessage('An error occurred while fetching contacts.');
            displayNoContactsMessage();
        }
    }

    function displayNoContactsMessage() {
        const noContactsRow = document.createElement('tr');
        const noContactsCell = document.createElement('td');
        noContactsCell.colSpan = 12;
        noContactsCell.textContent = 'No contacts available.';
        noContactsCell.classList.add('centered-message');
        noContactsRow.appendChild(noContactsCell);
        contactsTableBody.appendChild(noContactsRow);
    }

    function updateTotalAndPageCount(totalContacts) {
        const totalContactsElement = document.getElementById('totalContacts');
        const pageCountElement = document.getElementById('pageCount');

        totalContactsElement.textContent = `Total Contacts: ${totalContacts}`;
        pageCountElement.textContent = `Page ${currentPage} of ${Math.ceil(totalContacts / pageSize)}`;
    }

    function updateCurrentPageDisplay() {
        document.getElementById('currentPage').textContent = `Page ${currentPage}`;
    }


    // Event listener for Previous Page button
    document.getElementById('prevPage').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            fetchAndPopulateContacts(currentPage);
        }
    });

    // Event listener for Next Page button
    document.getElementById('nextPage').addEventListener('click', async function () {
        try {
            // const apiEndpoint = "http://localhost:3000/api/contacts";
            const apiEndpoint = "https://backend-app-8ev9.onrender.com/api/contacts";
            const response = await fetch(`${apiEndpoint}?page=${currentPage + 1}&pageSize=${pageSize}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const totalPages = Math.ceil(data.totalContacts / pageSize);

            if (currentPage < totalPages) {
                currentPage++;
                await fetchAndPopulateContacts(currentPage);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            displayErrorMessage('An error occurred while fetching contacts.');
        }
    });

    // Initial fetch and populate
    fetchAndPopulateContacts(currentPage);

    // Function to delete a contact
    async function deleteContact(contactId) {
        try {
            // const apiEndpoint = "http://localhost:3000/api/contacts";
            const apiEndpoint = "https://backend-app-8ev9.onrender.com/api/contacts";
            const response = await fetch(`${apiEndpoint}/${contactId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the deleted contact row from the table
                const deletedRow = document.querySelector(`[data-contact-id="${contactId}"]`);
                if (deletedRow) {
                    deletedRow.remove();
                }

                // Optionally, display a success message to the user
                // You may want to handle the case where the deleted row is not found (for consistency)

                // Refresh the table after successful deletion
                await fetchAndPopulateContacts(currentPage);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            displayErrorMessage('An error occurred while deleting the contact.');
        }
    }
});
