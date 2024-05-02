// apiRequest.js

// Replace this URL with your API Gateway endpoint
// const apiUrl = 'https://wj7z0n145l.execute-api.us-east-1.amazonaws.com';

// // Function to make a GET request to the API Gateway endpoint
// function makeApiRequest() {
//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('API response:', data);
//             // You can perform further actions with the API response here
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }


fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/get')
            .then(response => response.json())
            .then((data) => {
                document.getElementById('visitorCount').innerText = data.visitors
            })
// fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/put')
//             .then(response => response.json())
//             .then((data) => {
//                 document.getElementById('count').innerText = data.count
//             })
// Function to make HTTP request to your API endpoint
async function updateVisitorCount() {
    try {
      const response = await fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/put', {
        method: 'PUT', // Since your Lambda function expects a PUT request
        mode: 'no-cors', // Set the mode to 'no-cors'
        headers: {
          'Content-Type': 'application/json'
          // Add any other headers if needed
        },
        body: JSON.stringify(data) // Replace 'data' with your request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to update visitor count');
      }
  
      const data = await response.json();
      console.log('Visitor count updated:', data.visitors);
    } catch (error) {
      console.error('Error updating visitor count:', error);
    }
  }
