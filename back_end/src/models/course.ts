import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Lecture object
interface ILecture {
  title: string;
  videoUrl: string;
  public_id: string;
  freePreview: boolean;
}

// Define an interface for the Student object
interface IStudent {
  studentId: string;
  studentName: string;
  studentEmail: string;
  paidAmount: string;
}

// Define an interface for the Course document
interface ICourse extends Document {
  instructorId: string;
  instructorName: string;
  date: Date;
  title: string;
  category: string;
  level: string;
  primaryLanguage: string;
  subtitle: string;
  description: string;
  image: string;
  welcomeMessage: string;
  pricing: number;
  objectives: string;
  students: IStudent[];
  curriculum: ILecture[];
  isPublished: boolean; // Corrected the spelling from "isPublised" to "isPublished"
}

// Create the Lecture schema
const LectureSchema: Schema = new Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  public_id: { type: String, required: true },
  freePreview: { type: Boolean, required: true },
});

// Create the Course schema
const CourseSchema: Schema = new Schema({
  instructorId: { type: String, required: true },
  instructorName: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  primaryLanguage: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  welcomeMessage: { type: String, required: true },
  pricing: { type: Number, required: true },
  objectives: { type: String, required: true },
  students: [
    {
      studentId: { type: String, required: true },
      studentName: { type: String, required: true },
      studentEmail: { type: String, required: true },
      paidAmount: { type: String, required: true },
    },
  ],
  curriculum: [LectureSchema],
  isPublished: { type: Boolean, required: true }, // Corrected the spelling from "isPublised" to "isPublished"
});

// Export the Course model
const Course = mongoose.model<ICourse>("Course", CourseSchema);
export default Course;