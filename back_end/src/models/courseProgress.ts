import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the LectureProgress object
interface ILectureProgress {
  lectureId: string;
  viewed: boolean;
  dateViewed: Date;
}

// Define an interface for the CourseProgress document
interface ICourseProgress extends Document {
  userId: string;
  courseId: string;
  completed: boolean;
  completionDate: Date | null;
  lecturesProgress: ILectureProgress[];
}

// Create the LectureProgress schema
const LectureProgressSchema: Schema = new Schema({
  lectureId: { type: String, required: true },
  viewed: { type: Boolean, required: true },
  dateViewed: { type: Date, required: true },
});

// Create the CourseProgress schema
const CourseProgressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  completed: { type: Boolean, required: true },
  completionDate: { type: Date, required: true },
  lecturesProgress: [LectureProgressSchema],
});

// Export the CourseProgress model
const CourseProgress = mongoose.model<ICourseProgress>("Progress", CourseProgressSchema);
export default CourseProgress;