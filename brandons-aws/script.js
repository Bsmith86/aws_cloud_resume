apiRequest.js
async function updateVisitorCount() {
    try {
        const data = {}; // Initialize data object here or assign it a value
        const response = await fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/put', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'L8dCAkQgOJ2tHGlHYWpxT1FAGmRu48vs6eL5Demq'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update visitor count');
        }

        const responseData = await response.json();
        console.log('Visitor count updated:', responseData.visitors);
    } catch (error) {
        console.error('Error updating visitor count:', error);
    }
}

fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/get')
            .then(response => response.json())
            .then((data) => {
                document.getElementById('visitorCount').innerText = data.visitors
            })

           
            