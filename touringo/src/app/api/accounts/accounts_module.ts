import { AccountModel } from "@/db_utils/collectionModels";
import { Account, MongooseError } from "@/utils/classes";

/**
 * Verifies an account by checking if the provided username and password match a record in the database.
 * @param username - The username of the account to verify.
 * @param password - The password of the account to verify.
 * @returns The matching account document if found, otherwise `null`.
 * @throws Any database-related errors encountered during the operation.
 */
export async function verifyAccount(username: string, password: string) {
  try {
    const exists = await AccountModel.findOne({ username: username, password: password });
    return exists;
  } catch (err) {
    throw err;
  }
}

/**
 * Registers a new account by saving it to the database.
 * @param newAccount - The account object to register.
 * @returns The saved account document if successful, or `422` if a duplicate key error occurs.
 * @throws Any database-related errors encountered during the operation.
 */
export async function registerAccount(newAccount: Account) {
  try {
    const savedAccount = await AccountModel.create(newAccount) as Account;
    console.log(`Registered account: ${savedAccount}`);
    return savedAccount;
  } catch (err: unknown) {
    const mongoError = err as MongooseError;
    if (mongoError.code === 11000) {
      console.error('Registered - Duplicate key error:', mongoError.message);
      return 422;
    } else {
      throw err;
    }
  }
}

/**
 * Updates an existing account's details in the database.
 * @param username - The username of the account to update.
 * @param updatedAccount - The updated account object containing new details.
 * @returns `true` if the update was successful, otherwise `false`.
 * @throws Any database-related errors encountered during the operation.
 */
export async function updateAccount(username: string, updatedAccount: Account): Promise<boolean> {
  try {
    const updateRes = await AccountModel.updateOne(
      { username: username },
      { name: updatedAccount.name, bio: updatedAccount.bio, about: updatedAccount.about }
    );
    console.log(`Updated account: ${updatedAccount}`);
    return (updateRes.modifiedCount == 1);
  } catch (err: unknown) {
    throw err;
  }
}
