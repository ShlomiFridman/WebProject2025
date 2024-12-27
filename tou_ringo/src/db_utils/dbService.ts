import mongoose, { Connection } from 'mongoose';

class DB_Service {
  private static instance: DB_Service | null = null;
  private connection: Connection | null = null;

  private uri: string = process.env.MONGODB_URI || "mongodb+srv://shlomiFridman:tou_ringo@cluster0.70fsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  private dbName: string = process.env.MONGODB_DB_NAME || "tou_ringo";

  private constructor() {
    // Prevent external instantiation
  }

  public static getInstance(): DB_Service {
    if (!DB_Service.instance) {
      DB_Service.instance = new DB_Service();
    }
    return DB_Service.instance;
  }

  public async connect(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    try {
      // Establishing a connection with Mongoose
      await mongoose.connect(this.uri, { dbName: this.dbName });
      this.connection = mongoose.connection;
      this.connection.once('open', () => {
        console.log('Mongoose connection established');
      });
      return this.connection;
    } catch (error) {
      console.error('Error connecting to MongoDB using Mongoose:', error);
      throw error;
    }
  }

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Mongoose connection is not established yet');
    }
    return this.connection;
  }

  public close(): void {
    if (this.connection) {
      mongoose.disconnect();
      console.log('Mongoose connection closed');
    }
  }
}

export default DB_Service;
