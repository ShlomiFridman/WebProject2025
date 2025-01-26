import { NextResponse } from 'next/server';
import { updateAccount } from '../accounts_module';
import { Account } from '@/utils/classes';
import { decryptData } from '@/utils/utils';

/**
 * Interface representing the structure of the update request body parameters.
 */
interface UpdateBodyParam {
  username: string;
  updatedAccount: Account;
}

/**
 * Handles the PUT request for updating an account.
 * 
 * Validates and decrypts the incoming request body, updates the account in the database,
 * and responds with the updated account details or an appropriate error message.
 * 
 * @param request - The incoming HTTP request object.
 * @returns A JSON response with the result or an error message and corresponding status code.
 */
export async function PUT(request: Request) {
  try {
    // Parse the request body
    const reqBody = await request.json();

    // Decrypt and extract the data
    const data = decryptData(reqBody.data) as UpdateBodyParam;
    const username = (!data) ? null : data.username;
    const account = (!data) ? null : data.updatedAccount;

    // Validate the presence of username
    if (!username) {
      return NextResponse.json(
        { message: "Missing username" },
        { status: 400 } // Bad Request
      );
    }

    // Validate the presence of account data
    if (!account) {
      return NextResponse.json(
        { message: "Missing updated account data" },
        { status: 400 } // Bad Request
      );
    }

    // Attempt to update the account
    const updateRes = await updateAccount(username, account) as boolean;
    if (!updateRes) {
      return NextResponse.json(
        { message: "Unknown account username" },
        { status: 422 } // Unprocessable Entity
      );
    }

    // Mask sensitive data in the response
    account.password = "##########";
    account.username = username;

    // Return success response
    return NextResponse.json(
      { result: account },
      { status: 200 } // OK
    );
  } catch (err) {
    console.error('Update PUT - Other error:', err);
    return NextResponse.json(
      { message: "Error occurred during update process" },
      { status: 500 } // Internal Server Error
    );
  }
}
