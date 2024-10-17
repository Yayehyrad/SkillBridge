import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Order document
interface IOrder extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  orderDate: Date;
  paymentId: string;
  payerId: string;
  instructorId: string;
  instructorName: string;
  courseImage: string;
  courseTitle: string;
  courseId: string;
  coursePricing: string;
}

// Create the Order schema
const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  orderStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  orderDate: { type: Date, required: true },
  paymentId: { type: String, required: true },
  payerId: { type: String, required: true },
  instructorId: { type: String, required: true },
  instructorName: { type: String, required: true },
  courseImage: { type: String, required: true },
  courseTitle: { type: String, required: true },
  courseId: { type: String, required: true },
  coursePricing: { type: String, required: true },
});

// Export the Order model
const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;