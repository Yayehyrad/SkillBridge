const express = require("express");
const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
} = require("../../controllers/instructor-controller/course-controller");
const courseRouter = express.Router();

courseRouter.post("/add", addNewCourse);
courseRouter.get("/get", getAllCourses);
courseRouter.get("/get/details/:id", getCourseDetailsByID);
courseRouter.put("/update/:id", updateCourseByID);

export default courseRouter;