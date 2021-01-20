// Import required AWS SDK clients and commands for Node.js
const {
  IAMClient,
  GetUserCommand,
  CreateUserCommand,
} = require("@aws-sdk/client-iam");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const params = { UserName: "garyboyle" }; //USER_NAME

// Create IAM service object
const iam = new IAMClient({ region: REGION });

const run = async () => {
  try {
    const data = await iam.send(new GetUserCommand(params));
    console.log(
      "User " + process.argv[3] + " already exists",
      data.User.UserId
    );
  } catch (err) {
    try {
      const results = await iam.send(new CreateUserCommand(params));
      console.log("Success", results);
    } catch (err) {
      console.log("Error", err);
    }
  }
};
run();
