'use strict';

import AWS from 'aws-sdk';

// Set the AWS region
AWS.config.update({ region: 'us-east-2' });

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Lambda function handler
export const putFunction = async (event, context) => {
  try {
    // Define parameters for DynamoDB query to retrieve current count value
    const params = {
      TableName: 'cloud-resume-challenge',
      Key: {
        'ID': { S: 'visitors' }
      }
    };

    // Retrieve item from DynamoDB
    const data = await dynamodb.getItem(params).promise();

    // Extract the current count value from the DynamoDB response
    let count = parseInt(data.Item.visitors.N);

    // Increment the count value by one
    count++;

    // Update the count value in DynamoDB
    const updateParams = {
      TableName: 'cloud-resume-challenge',
      Key: {
        'ID': { S: 'visitors' }
      },
      UpdateExpression: 'SET #v = :count', // Use ':count' instead of ':visitors'
      ExpressionAttributeNames: {
        '#v': 'visitors'
      },
      ExpressionAttributeValues: {
        ':count': { N: count.toString() } // Use 'count' instead of 'visitors'
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
      body: JSON.stringify({ count }) // Return the updated count value
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
