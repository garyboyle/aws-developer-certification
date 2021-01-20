const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const {
  Polly,
  StartSpeechSynthesisTaskCommand,
} = require("@aws-sdk/client-polly");

// Set the AWS Region
const REGION = "eu-west-1"; //e.g. "us-east-1"

// Create the parameters
var s3Params = {
  OutputFormat: "mp3",
  OutputS3BucketName: "shayoo-bucket",
  Text: "Hello David, How are you?",
  TextType: "text",
  VoiceId: "Joanna",
  SampleRate: "22050",
};
// Create the Polly service client, assigning your credentials
const polly = new Polly({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: "eu-west-1:00766847-4659-436d-a2be-1228d311c8f7", // IDENTITY_POOL_ID
  }),
});

const run = async () => {
  try {
    const data = await polly.send(
      new StartSpeechSynthesisTaskCommand(s3Params)
    );
    console.log(data);
    console.log("Audio file added to " + s3Params.OutputS3BucketName);
  } catch (err) {
    console.log("Error putting object", err);
  }
};
run();
