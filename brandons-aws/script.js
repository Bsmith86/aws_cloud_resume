// apiRequest.js
// async function updateVisitorCount() {
//     try {
//         const data = {}; // Initialize data object here or assign it a value
//         const response = await fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/put', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-api-key': 'L8dCAkQgOJ2tHGlHYWpxT1FAGmRu48vs6eL5Demq'
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update visitor count');
//         }

//         const responseData = await response.json();
//         console.log('Visitor count updated:', responseData.visitors);
//     } catch (error) {
//         console.error('Error updating visitor count:', error);
//     }
// }


import AWS from 'aws-sdk';

// Set the AWS region
AWS.config.update({ region: 'us-east-2' });

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Function to invoke the putFunction Lambda
async function invokePutFunction() {
    try {
        // Invoke the Lambda function
        const lambda = new AWS.Lambda();
        const params = {
            FunctionName: 'MyPutFunction', // Name of your Lambda function
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({})
        };

        const result = await lambda.invoke(params).promise();
        console.log('Put function invoked successfully:', result);
    } catch (error) {
        console.error('Error invoking putFunction:', error);
    }
}

// Call the function to invoke putFunction Lambda
invokePutFunction();


fetch('https://vp0vola44c.execute-api.us-east-2.amazonaws.com/Prod/get')
            .then(response => response.json())
            .then((data) => {
                document.getElementById('visitorCount').innerText = data.visitors
            })

           
            