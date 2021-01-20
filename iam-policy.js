// Import required AWS SDK clients and commands for Node.js
const { IAMClient, CreatePolicyCommand } = require("@aws-sdk/client-iam");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Create IAM service object
const iam = new IAMClient({ region: REGION });

// Set the parameters
const myManagedPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "logs:CreateLogGroup",
      Resource: "RESOURCE_ARN", // RESOURCE_ARN
    },
    {
      Effect: "Allow",
      Action: [
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
      ],
      Resource: "DYNAMODB_POLICY_NAME", // DYNAMODB_POLICY_NAME; e.g., "myDynamoDBName"
    },
  ],
};

console.log(process.argv);
const params = {
  PolicyDocument: JSON.stringify(myManagedPolicy),
  PolicyName: process.argv[4],
};

const run = async () => {
  try {
    const data = await iam.send(new CreatePolicyCommand(params));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
