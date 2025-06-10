declare namespace Api {
  namespace CourseManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    type Course = Common.CommonRecord<{
      courseNumber: string;
      name: string;
      teacherName: string;
      credit: number;
      description: string;
    }>

    type CourseList = Common.PaginatingQueryRecord<Course>;

    type CourseSearchParams = CommonType.RecordNullable<
      Pick<Api.CourseManage.Course, 'courseNumber' | 'name' | 'teacherName' | 'credit' | 'description'> &
      CommonSearchParams
    >;

    type CourseOperateParams = Pick<Api.CourseManage.Course, 'courseNumber' | 'name' | 'teacherName' | 'credit' | 'description'>;
  }
}
