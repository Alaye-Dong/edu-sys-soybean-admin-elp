import { request } from '../request';

export function fetchGetStudentCourseList(params?: Api.StudentCourse.StudentCourseSearchParams) {
  return request<Api.StudentCourse.StudentCourseList>({
    url: '/student-course/search',
    method: 'get',
    params
  })
}

export function fetchEnrollStudentCourse(data: Api.StudentCourse.StudentCourseOperateParams) {
  return request({
    url: '/student-course',
    method: 'post',
    data
  })
}

export function fetchUnenrollStudentCourse(courseId: Api.StudentCourse.StudentCourse['courseId']) {
  return request({
    url: `/student-course/${courseId}`,
    method: 'delete',
  })
}
