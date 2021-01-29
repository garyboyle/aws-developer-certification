// Import required AWS SDK clients and commands for Node.js
const {
  EC2Client,
  CreateTagsCommand,
  RunInstancesCommand,
} = require("@aws-sdk/client-ec2");

// Set the AWS region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Set the parameters
const instanceParams = {
  ImageId: "ami-0fc970315c2d38f01", //AMI_ID
  InstanceType: "t2.micro",
  KeyName: "shayoo-keys", //KEY_PAIR_NAME
  MinCount: 1,
  MaxCount: 1,
};

// Create EC2 service object
const ec2client = new EC2Client({ region: REGION });

const run = async () => {
  try {
    const data = await ec2client.send(new RunInstancesCommand(instanceParams));
    console.log(data.Instances[0].InstanceId);
    const instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: "Name",
          Value: "SDK Sample",
        },
      ],
    };
    try {
      const data = await ec2client.send(new CreateTagsCommand(tagParams));
      console.log("Instance tagged");
    } catch (err) {
      console.log("Error", err);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
run();
