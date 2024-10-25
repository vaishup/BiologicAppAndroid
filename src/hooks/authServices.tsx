// authService.js
import { signUp, signIn, fetchUserAttributes } from "@aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export async function signUpUser({ username, password, email, phone_number }) {
  try {
    const signUpResponse = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          phone_number, // Make sure phone_number is in E.164 format
        },
        autoSignIn: {
          // If you want to enable auto sign-in after registration, set this to true
          enabled: false,
        },
      },
    });
    console.log("Sign up success", signUpResponse);
    return signUpResponse;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function signInUser(username, password) {
  try {
    const user = await signIn(username, password);
    console.log("Sign in success", user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
export async function getTableID() {
  try {
    const user = await fetchUserAttributes();
    return user["custom:tableId"];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUserName() {
  try {
    const user = await fetchUserAttributes();
    return user.email;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUserInfo() {
  try {
    const user = await fetchUserAttributes();
    const tableID = user["custom:tableId"];
    const userInfo = /* GraphQL */ `
      query MyQuery($id: ID!) {
        getUser(id: $id) {
          id
          firstName
          lastName
          dateOfBirth
          email
          name       
        }
      }
    `;
    // Use the API.graphql method to send the query
    const { data } = await client.graphql({
      query: userInfo,
      variables: { id: tableID }, // Ensure you pass the variables correctly

    });
    // Assuming the API returns the user object directly
    const { getUser } = data;

    return {
      phoneNumber: getUser.phoneNumber,
      lastName: getUser.lastName,
      firstName: getUser.firstName,
      email: getUser.email,
      dateOfBirth: getUser.dateOfBirth,
      name:getUser.name
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function getFullName() {
  try {
    const user = await fetchUserAttributes();
    const tableID = user["custom:tableId"];

    const userInfoQuery = /* GraphQL */ `
      query MyQuery($id: ID!) {
        getUser(id: $id) {
          lastName
          firstName
        }
      }
    `;

    // Use the API.graphql method to send the query
    const { data } = await client.graphql({
      query: userInfoQuery,
      variables: { id: tableID }, // Ensure you pass the variables correctly
    });

    // Assuming the API returns the user object directly
    const { getUser } = data;

    // Concatenate firstName and lastName to get the full name
    const fullName = `${getUser.firstName} ${getUser.lastName}`;

    return fullName; // Return the full name
  } catch (err) {
    console.log("Error fetching full name:", err);
    return null; // Return null in case of an error
  }
}
