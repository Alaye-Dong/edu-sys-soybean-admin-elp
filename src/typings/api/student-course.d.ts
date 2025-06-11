declare namespace Api {
  namespace StudentCourse {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    type StudentCourse = {
      studentId: number | undefined;
      courseId: number;
      enrollStatus: number;
    }

    type StudentCourseList = Common.PaginatingQueryRecord<StudentCourse & Api.CourseManage.Course>

    type StudentCourseSearchParams = CommonType.RecordNullable<
      Pick<Api.CourseManage.Course, 'courseNumber' | 'name' | 'teacherName' | 'credit' | 'description'> &
      CommonSearchParams &
      Pick<Api.StudentCourse.StudentCourse, 'enrollStatus'>
    >;

    type StudentCourseOperateParams = Pick<Api.StudentCourse.StudentCourse, 'enrollStatus' | 'courseId'>;
  }

}
