/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

// Import the AWS SDK
import AWS from 'aws-sdk';

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Lambda function handler
export const putFunction = async (event, context) => {
  try {
    // Define parameters for DynamoDB query to retrieve current count value
    const params = {
      TableName: 'cloud-resume-challenge', // Name of your DynamoDB table
      Key: {
        'ID': { S: 'visitors' } // Primary key and value to retrieve
      }
    };

    // Retrieve item from DynamoDB
    const data = await dynamodb.getItem(params).promise();

    // Extract the current count value from the DynamoDB response
    let count = parseInt(data.Item.visitors.N); // Access 'visitors' attribute

    // Increment the count value by one
    count++;

    // Update the count value in DynamoDB
    const updateParams = {
      TableName: 'cloud-resume-challenge', // Name of your DynamoDB table
      Key: {
        'ID': { S: 'visitors' } // Primary key and value to update
      },
      UpdateExpression: 'SET #v = :count',
      ExpressionAttributeNames: {
        '#v': 'visitors' // Attribute representing the count value in DynamoDB
      },
      ExpressionAttributeValues: {
        ':count': { N: count.toString() } // Assuming the count attribute is stored as a number
      }
    };

    // Update the item in DynamoDB
    await dynamodb.updateItem(updateParams).promise();

    // Construct the response object with the updated count value
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ count })
    };

    // Return the response
    return response;
  } catch (error) {
    // Handle errors
    console.error('Error updating count in DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

