<script setup lang="tsx">
import { ElButton, ElPopconfirm, ElTag } from 'element-plus';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchGetCourseList, fetchEnrollStudentCourse, fetchUnenrollStudentCourse } from '@/service/api';
import { $t } from '@/locales';
import CourseOperateDrawer from './modules/course-operate-drawer.vue';
import CourseSearch from './modules/course-search.vue';

defineOptions({ name: 'CourseManage' });

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetCourseList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    name: undefined,
    courseNumber: undefined,
    teacherName: undefined,
    credit: undefined,
    description: undefined
  },
  columns: () => [
    // { type: 'selection', width: 48 },
    { prop: 'index', label: $t('common.index'), width: 64 },
    { prop: 'name', label: '课程名', minWidth: 100 },
    { prop: 'courseNumber', label: '课程编号', minWidth: 100 },
    { prop: 'teacherName', label: '教师名', minWidth: 100 },
    { prop: 'credit', label: '学分', width: 100 },
    { prop: 'description', label: '课程描述', minWidth: 100 },
    {
      prop: 'operate',
      label: $t('common.operate'),
      align: 'center',
      formatter: row => (
        <div class="flex-center">
          {/* <ElButton type="primary" plain size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </ElButton> */}
          <ElButton type="success" plain size="small" onClick={() => selectCourse(row.id)}>
            选课
          </ElButton>
          <ElPopconfirm title='确认退选吗' onConfirm={() => handleDelete(row.id)}>
            {{
              reference: () => (
                <ElButton type="danger" plain size="small">
                  退选
                </ElButton>
              )
            }}
          </ElPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // eslint-disable-next-line no-console
  console.log(checkedRowKeys.value);
  // request

  onBatchDeleted();
}

async function handleDelete(courseId: number) {
  // eslint-disable-next-line no-console
  console.log(courseId);
  // request
  await fetchUnenrollStudentCourse(courseId);

  onDeleted();
}

function edit(id: number) {
  console.log(id);
  handleEdit(id);
}

async function selectCourse(courseId: number) {
  console.log(courseId);
  // const studentCourse: Api.StudentCourse.StudentCourse = {
  //   courseId: courseId,
  //   studentId: undefined,
  //   id: undefined
  // };
  // await fetchEnrollStudentCourse(studentCourse);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CourseSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <ElCard class="sm:flex-1-hidden card-wrapper" body-class="ht50">
      <template #header>
        <div class="flex items-center justify-between">
          <p>课程列表</p>
          <!-- <TableHeaderOperation v-model:columns="columnChecks" :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading" @add="handleAdd" @delete="handleBatchDelete" @refresh="getData" /> -->
        </div>
      </template>
      <div class="h-[calc(100%-50px)]">
        <ElTable v-loading="loading" height="100%" border class="sm:h-full" :data="data" row-key="id"
          @selection-change="checkedRowKeys = $event">
          <ElTableColumn v-for="col in columns" :key="col.prop" v-bind="col" />
        </ElTable>
      </div>
      <div class="mt-20px flex justify-end">
        <ElPagination v-if="mobilePagination.total" layout="total,prev,pager,next,sizes" v-bind="mobilePagination"
          @current-change="mobilePagination['current-change']" @size-change="mobilePagination['size-change']" />
      </div>
      <CourseOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData"
        @submitted="getDataByPage" />
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  .ht50 {
    height: calc(100% - 50px);
  }
}
</style>
