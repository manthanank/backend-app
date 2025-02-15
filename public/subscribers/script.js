document.addEventListener('DOMContentLoaded', function () {
  const subscribersTableBody = document.getElementById('subscribersTableBody');
  let currentPage = 1;
  const pageSize = 10; // Set your default page size

  // Function to handle delegated events
  function handleTableClick(event) {
    const target = event.target;

    // Check if the clicked element or its parent has the specified data-action attribute
    const actionElement = target.closest('[data-action="deleteSubscriber"]');
    if (actionElement) {
      const subscriberId = actionElement.dataset.subscriberId;

      if (
        subscriberId &&
        confirm('Are you sure you want to delete this subscriber?')
      ) {
        deleteSubscriber(subscriberId);
      }
    }
  }

  // Add event listener to the tbody for delegated events
  subscribersTableBody.addEventListener('click', handleTableClick);

  // Function to create a subscriber row
  function createSubscriberRow(subscriber) {
    const row = document.createElement('tr');
    row.setAttribute('data-subscriber-id', subscriber._id);

    // Create and append ID, Name, Email cells
    ['_id', 'email'].forEach((key) => {
      const cell = document.createElement('td');
      cell.textContent = subscriber[key];
      row.appendChild(cell);
    });

    // Create and append Delete button cell
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.action = 'deleteSubscriber';
    deleteButton.dataset.subscriberId = subscriber._id;
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

  async function fetchAndPopulateSubscribers(page) {
    try {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const apiEndpoint = isLocal
        ? 'http://localhost:3000/api/subscribers'
        : 'https://backend-app-manthanank.vercel.app/api/subscribers';

      const response = await fetch(
        `${apiEndpoint}?page=${page}&pageSize=${pageSize}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Clear the table body
      subscribersTableBody.innerHTML = '';

      if (data.data.length === 0) {
        displayNoSubscribersMessage();
      } else {
        // Add actual subscriber rows
        data.data.forEach((subscriber) => {
          subscribersTableBody.appendChild(createSubscriberRow(subscriber));
        });
      }

      // Update total count and page count
      updateTotalAndPageCount(data.totalSubscribers);

      // Update current page display
      updateCurrentPageDisplay();
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      displayErrorMessage('An error occurred while fetching subscribers.');
      displayNoSubscribersMessage();
    }
  }

  function displayNoSubscribersMessage() {
    const noSubscribersRow = document.createElement('tr');
    const noSubscribersCell = document.createElement('td');
    noSubscribersCell.colSpan = 12;
    noSubscribersCell.textContent = 'No subscribers available.';
    noSubscribersCell.classList.add('centered-message');
    noSubscribersRow.appendChild(noSubscribersCell);
    subscribersTableBody.appendChild(noSubscribersRow);
  }

  function updateTotalAndPageCount(totalSubscribers) {
    const totalSubscribersElement = document.getElementById('totalSubscribers');
    const pageCountElement = document.getElementById('pageCount');

    totalSubscribersElement.textContent = `Total Subscribers: ${totalSubscribers}`;

    const totalPages = Math.ceil(totalSubscribers / pageSize);
    const currentPageDisplay = totalPages > 0 ? currentPage : 0;

    pageCountElement.textContent = `Page ${currentPageDisplay} of ${totalPages}`;
  }

  function updateCurrentPageDisplay() {
    document.getElementById('currentPage').textContent = `Page ${currentPage}`;
  }

  // Event listener for Previous Page button
  document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      fetchAndPopulateSubscribers(currentPage);
    }
  });

  // Event listener for Next Page button
  document
    .getElementById('nextPage')
    .addEventListener('click', async function () {
      try {
        const isLocal =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1';
        const apiEndpoint = isLocal
          ? 'http://localhost:3000/api/subscribers'
          : 'https://backend-app-manthanank.vercel.app/api/subscribers';

        const response = await fetch(
          `${apiEndpoint}?page=${currentPage + 1}&pageSize=${pageSize}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const totalPages = Math.ceil(data.totalSubscribers / pageSize);

        if (currentPage < totalPages) {
          currentPage++;
          await fetchAndPopulateSubscribers(currentPage);
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        displayErrorMessage('An error occurred while fetching subscribers.');
      }
    });

  // Initial fetch and populate
  fetchAndPopulateSubscribers(currentPage);

  // Function to delete a subscriber
  async function deleteSubscriber(subscriberId) {
    try {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const apiEndpoint = isLocal
        ? 'http://localhost:3000/api/subscribers'
        : 'https://backend-app-manthanank.vercel.app/api/subscribers';

      const response = await fetch(`${apiEndpoint}/${subscriberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted subscriber row from the table
        const deletedRow = document.querySelector(
          `[data-subscriber-id="${subscriberId}"]`,
        );
        if (deletedRow) {
          deletedRow.remove();
        }

        // Optionally, display a success message to the user
        // You may want to handle the case where the deleted row is not found (for consistency)

        // Refresh the table after successful deletion
        await fetchAndPopulateSubscribers(currentPage);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      displayErrorMessage('An error occurred while deleting the subscriber.');
    }
  }
});
