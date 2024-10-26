import { Request, Response } from 'express';
import Course from '../../models/course';
import StudentCourses from '../../models/studentCourses';
import { SortOrder } from 'mongoose';

 


const getAllStudentViewCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      level ,
      primaryLanguage  ,
      sortBy = 'price-lowtohigh',
    } = req.query;

    console.log(req.query, 'req.query');

    let filters: Record<string, any> = {};
    if (category && typeof category == 'string') {
      filters.category = { $in: category.split(',') };
    }
    if (level && typeof level == 'string') {
      filters.level = { $in: level.split(',') };
    }
    if (primaryLanguage && typeof primaryLanguage == 'string') {
      filters.primaryLanguage = { $in: primaryLanguage.split(',') };
    }

    let sortParam: {[key: string]: SortOrder} = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        sortParam.pricing = 1;
        break;
      case 'price-hightolow':
        sortParam.pricing = -1;
        break;
      case 'title-atoz':
        sortParam.title = 1;
        break;
      case 'title-ztoa':
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

const getStudentViewCourseDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: 'No course details found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

const checkCoursePurchaseInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    const ifStudentAlreadyBoughtCurrentCourse = studentCourses ?
      studentCourses?.courses.findIndex((item: { courseId: string }) => item.courseId === id) > -1 : false;

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

export {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};