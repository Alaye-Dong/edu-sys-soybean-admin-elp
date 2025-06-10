import { request } from '../request';

export function fetchGetCourseList(params?: Api.CourseManage.CourseSearchParams) {
  return request<Api.CourseManage.CourseList>({
    url: '/course/search',
    method: 'get',
    params
  });
}

export function fetchCreateCourse(data: Api.CourseManage.CourseOperateParams) {
  return request({
    url: '/course',
    method: 'post',
    data
  });
}

export function fetchDeleteCourse(id:Api.CourseManage.Course['id']) {
  return request({
    url: `/course/${id}`,
    method: 'delete'
  });
}

export function fetchUpdateCourse(data: Api.CourseManage.CourseOperateParams) {
  return request({
    url: '/course',
    method: 'put',
    data
  });
}
