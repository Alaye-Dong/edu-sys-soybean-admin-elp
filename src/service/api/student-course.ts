import { request } from '../request';

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

export function fetchGetStudentCourseList(params?: Api.StudentCourse.StudentCourseSearchParams) {
  return request({
    url: '/student-course/search',
    method: 'get',
    params
  })
}
