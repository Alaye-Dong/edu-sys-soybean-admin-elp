import { request } from '../request';

export function fetchEnrollStudentCourse(data: Api.StudentCourse.StudentCourse) {
  return request({
    url: '/student-course',
    method: 'post',
    data
  })
}

export function fetchUnenrollStudentCourse(data: Api.StudentCourse.StudentCourse) {
  return request({
    url: '/student-course',
    method: 'delete',
    data
  })
}
