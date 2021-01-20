// Import required AWS SDK clients and commands for Node.js
const {
  SESClient,
  VerifyEmailIdentityCommand,
} = require("@aws-sdk/client-ses");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const params = { EmailAddress: "gary@shayoo.ie" }; //ADDRESS@DOMAIN.EXT; e.g., name@example.com

// Create SES service object
const ses = new SESClient({ region: REGION });

const run = async () => {
  try {
    const data = await ses.send(new VerifyEmailIdentityCommand(params));
    console.log("Email verification initiated");
  } catch (err) {
    console.error(err, err.stack);
  }
};
run();
