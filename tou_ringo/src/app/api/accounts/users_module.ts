import { AccountModel } from "@/db_utils/collectionModels";
import { Account } from "@/utils/classes";

// TODO login
export async function verifyAccount(username: string, password: string){
    try {
        const exists = await AccountModel.exists({ username: username, password: password});
        return exists;
      } catch (err) {
        console.error(`verifyAccount - error for account: { username=${username} , pass=${password}}`);
        console.error('verifyAccount - Error checking if account exist:', err);
        throw err;
      }
}

// TODO register
export async function registerAccount(newAccount: Account){
    try{
        const savedAccount = await AccountModel.create(newAccount);
        console.log(`Registered account: ${savedAccount}`)
        return savedAccount;
    } catch (err: any){
        if (err.code === 11000) {
            console.error('Registered - Duplicate key error:', err.message);
            return 422;
          } else {
            console.error('Registered - Other error:', err);
            throw err;
          }
        
    }
}