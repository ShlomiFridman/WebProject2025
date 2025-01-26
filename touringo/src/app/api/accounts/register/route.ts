import { NextResponse } from 'next/server';
import { registerAccount } from '../accounts_module';
import { Account } from '@/utils/classes';
import { decryptData } from '@/utils/utils';

/**
 * Interface representing the structure of the register request body parameters.
 */
interface RegisterBodyParam {
  account: Account;
}

/**
 * Handles the POST request for user registration.
 * 
 * Validates and decrypts the incoming request body, registers the account in the database,
 * and responds with the result or an appropriate error message.
 * 
 * @param request - The incoming HTTP request object.
 * @returns A JSON response with the result or an error message and corresponding status code.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const reqBody = await request.json();

    // Decrypt and parse the account data
    const data = decryptData(reqBody.data) as RegisterBodyParam;
    const account = (!data) ? null : data.account;

    // Validate the presence of account data
    if (!account) {
      return NextResponse.json(
        { message: "Missing account data" },
        { status: 400 } // Bad Request
      );
    }

    // Attempt to register the account
    const loggedAccount = await registerAccount(account);
    if (loggedAccount == 422) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 422 } // Unprocessable Entity
      );
    }

    // Return success response
    return NextResponse.json(
      { result: loggedAccount },
      { status: 200 } // OK
    );
  } catch (err) {
    console.error('Register POST - Other error:', err);
    return NextResponse.json(
      { message: "Error occurred during register process" },
      { status: 500 } // Internal Server Error
    );
  }
}
