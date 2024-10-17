import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  userName: string;
  userEmail: string;
  password: string;
  role: string;
}

// Create the User schema
const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;