import { AccountModel } from "@/db_utils/collectionModels";
import { Account, MongooseError } from "@/utils/classes";

// TODO login
export async function verifyAccount(username: string, password: string){
    try {
        const exists = await AccountModel.exists({ username: username, password: password});
        return exists;
      } catch (err) {
        throw err;
      }
}

export async function registerAccount(newAccount: Account){
    try{
        const savedAccount = await AccountModel.create(newAccount) as Account;
        console.log(`Registered account: ${savedAccount}`)
        return savedAccount;
    } catch (err: unknown){
      const mongoError = err as MongooseError; 
      if (mongoError.code === 11000) {
            console.error('Registered - Duplicate key error:', mongoError.message);
            return 422;
          } else {
            throw err;
          }
        
    }
}

export async function updateAccount(username: string, updatedAccount: Account): Promise<boolean>{
  try{
      const updateRes = await AccountModel.updateOne(
        {username: username},
        {name: updatedAccount.name, bio:updatedAccount.bio, about:updatedAccount.about}
      );
      console.log(`Updated account account: ${updatedAccount}`)
      return (updateRes.modifiedCount == 1);
  } catch (err: unknown){
      throw err;
  }
}