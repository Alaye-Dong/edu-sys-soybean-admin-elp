import { request } from '../request';
export function fetchGetStudentList(params?: Api.StudentManage.StudentSearchParams) {
  return request<Api.StudentManage.StudentList>({
    url: '/student',
    method: 'get',
    params
  });
}

export function fetchCreateStudent(data: Api.StudentManage.StudentOperateParams) {
  return request({
    url: '/student',
    method: 'post',
    data
  });
}

export function fetchDeleteStudent(id:Api.StudentManage.Student['id']) {
  return request({
    url: `/student/${id}`,
    method: 'delete'
  });
}
