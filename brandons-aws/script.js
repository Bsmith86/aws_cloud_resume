// apiRequest.js

fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/get')
            .then(response => response.json())
            .then((data) => {
                document.getElementById('visitorCount').innerText = data.visitors
            })

async function updateVisitorCount() {
    try {
      const response = await fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/put', {
        method: 'PUT', // Since your Lambda function expects a PUT request
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'L8dCAkQgOJ2tHGlHYWpxT1FAGmRu48vs6eL5Demq' // Include your API key here
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
