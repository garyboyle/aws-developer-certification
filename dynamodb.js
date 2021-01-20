const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

(async () => {
  const client = new DynamoDBClient({ region: "eu-west-1" });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();
