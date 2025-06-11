declare namespace Api {
  namespace StudentCourse {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    type StudentCourse = {
      id: number |  undefined;
      studentId: number | undefined;
      courseId: number;
      enrollStatus: number;
    }

    type StudentCourseList = Common.PaginatingQueryRecord<StudentCourse>

    type StudentCourseSearchParams = CommonType.RecordNullable<
      Pick<Api.CourseManage.Course, 'courseNumber' | 'name' | 'teacherName' | 'credit' | 'description'> &
      CommonSearchParams
      >;

    type StudentCourseOperateParams = Pick<Api.StudentCourse.StudentCourse, 'enrollStatus' | 'courseId'>;
  }

 }
