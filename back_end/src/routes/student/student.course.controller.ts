import { Request, Response } from 'express';
import StudentCourses from '../../models/studentCourses';

const getCoursesByStudentId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    if (studentBoughtCourses) {
      res.status(200).json({
        success: true,
        data: studentBoughtCourses.courses,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No courses found for this student.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

export { getCoursesByStudentId };