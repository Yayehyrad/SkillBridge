import { Request, Response } from 'express';
import CourseProgress from '../../models/courseProgress';
import Course from '../../models/course';
import StudentCourses from '../../models/studentCourses';

// Mark current lecture as viewed
const markCurrentLectureAsViewed = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, courseId, lectureId } = req.body;

    let progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      const lectureProgress = progress.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );

      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }
      await progress.save();
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if all lectures are viewed
    const allLecturesViewed =
      progress.lecturesProgress.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);

    if (allLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();
      await progress.save();
    }

    res.status(200).json({
      success: true,
      message: 'Lecture marked as viewed',
      data: progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

// Get current course progress
const getCurrentCourseProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, courseId } = req.params;

    const studentPurchasedCourses = await StudentCourses.findOne({ userId });
    const isCurrentCoursePurchasedByCurrentUser =
      studentPurchasedCourses?.courses?.some((item) => item.courseId === courseId) || false;

    if (!isCurrentCoursePurchasedByCurrentUser) {
      return res.status(200).json({
        success: true,
        data: { isPurchased: false },
        message: 'You need to purchase this course to access it.',
      });
    }

    const currentUserCourseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!currentUserCourseProgress || currentUserCourseProgress.lecturesProgress.length === 0) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'No progress found, you can start watching the course',
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserCourseProgress.lecturesProgress,
        completed: currentUserCourseProgress.completed,
        completionDate: currentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

// Reset course progress
const resetCurrentCourseProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, courseId } = req.body;

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found!',
      });
    }

    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Course progress has been reset',
      data: progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

export {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCurrentCourseProgress,
};