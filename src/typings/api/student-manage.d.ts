declare namespace Api {
  namespace StudentManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    type Student = Common.CommonRecord<{
      age: number;
      className: string;
      email: string;
      genderCode: string;
      name: string;
      phone: string;
      studentNumber: string;
    }>
    type StudentList = Common.PaginatingQueryRecord<Student>;

    type StudentSearchParams = CommonType.RecordNullable<
      Pick<Api.StudentManage.Student, 'name' | 'genderCode' | 'studentNumber' | 'phone' | 'email'> &
        CommonSearchParams
    >;
  }
}
