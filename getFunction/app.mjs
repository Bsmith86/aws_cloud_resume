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

// Set the AWS region
AWS.config.update({ region: 'us-east-2' });


// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Lambda function handler
export const getFunction = async (event, context) => {
  try {
    const params = {
      TableName: 'cloud-resume-challenge',
      Key: {
        'ID': { S: 'visitors' }
      }
    };

    const data = await dynamodb.getItem(params).promise();

    // Check if the item exists and if it contains the 'Visitors' attribute
    if (!data.Item || !data.Item.visitors || !data.Item.visitors.N) {
      throw new Error('Item or attribute not found');
    }

    // Parse the 'Visitors' attribute value as an integer
    const visitors = parseInt(data.Item.visitors.N);

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ visitors })
    };

    return response;
  } catch (error) {
    console.error('Error retrieving count from DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
