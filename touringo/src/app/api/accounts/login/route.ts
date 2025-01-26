import { NextResponse } from "next/server";
import { verifyAccount } from "../accounts_module";
import { Account } from "@/utils/classes";
import { decryptData } from "@/utils/utils";

/**
 * Interface representing the structure of the login request body parameters.
 */
interface LoginBodyParams {
  username: string;
  password: string;
}

/**
 * Handles the PUT request for login verification.
 * 
 * Validates the request body, decrypts the data, and verifies the username and password.
 * Responds with the account details if successful or an appropriate error message if not.
 * 
 * @param request - The incoming HTTP request object.
 * @returns A JSON response with the appropriate status code and message/result.
 */
export async function PUT(request: Request) {
  try {
    const reqBody = await request.json();

    try {
      // Decrypt and parse the request body
      const data = decryptData(reqBody.data) as LoginBodyParams;
      const username = (!data) ? null : data.username;
      const pass = (!data) ? null : data.password;

      // Validate presence of username and password
      if (!username || !pass) {
        return NextResponse.json(
          { message: "Username or password are missing" },
          { status: 400 } // Bad Request
        );
      }

      // Verify account credentials
      const loginRes = await verifyAccount(username, pass) as unknown;
      if (loginRes == null) {
        return NextResponse.json(
          { message: "Username or password incorrect" },
          { status: 401 } // Unauthorized
        );
      }

      // Mask the password before returning the response
      const loggedAccount = loginRes as Account;
      loggedAccount.password = "##########";
      return NextResponse.json(
        { result: loggedAccount },
        { status: 200 }
      );
    } catch (err) {
      console.error('Login PUT - Other error:', err);
      return NextResponse.json(
        { message: "Error occurred during login process" },
        { status: 500 } // Internal Server Error
      );
    }
  } catch (err) {
    console.error('Login PUT - No request body:', err);
    return NextResponse.json(
      { message: "Request missing body" },
      { status: 400 } // Bad Request
    );
  }
}
