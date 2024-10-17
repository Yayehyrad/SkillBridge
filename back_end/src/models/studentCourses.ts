import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Course object
interface ICourse {
  courseId: string;
  title: string;
  instructorId: string;
  instructorName: string;
  dateOfPurchase: Date;
  courseImage: string;
}

// Define an interface for the StudentCourses document
interface IStudentCourses extends Document {
  userId: string;
  courses: ICourse[];
}

// Create the StudentCourses schema
const StudentCoursesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  courses: [
    {
      courseId: { type: String, required: true },
      title: { type: String, required: true },
      instructorId: { type: String, required: true },
      instructorName: { type: String, required: true },
      dateOfPurchase: { type: Date, required: true },
      courseImage: { type: String, required: true },
    },
  ],
});

// Export the StudentCourses model
const StudentCourses = mongoose.model<IStudentCourses>("StudentCourses", StudentCoursesSchema);
export default StudentCourses;