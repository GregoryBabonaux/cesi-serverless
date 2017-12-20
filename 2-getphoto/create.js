import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "photos",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      photoId: uuid.v1(),
      description: data.description,
      photo: data.photo,
      createdAt: new Date().getTime()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }));
  }
}