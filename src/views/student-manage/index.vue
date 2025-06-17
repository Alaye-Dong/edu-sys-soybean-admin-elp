<script setup lang="tsx">
import { ElButton, ElPopconfirm, ElTag } from 'element-plus';
import { fetchGetStudentList, fetchDeleteStudent, fetchSetUserStudentId } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { $t } from '@/locales';
import { enableStatusRecord, studentGenderRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import UserOperateDrawer from './modules/student-operate-drawer.vue';
import StudentSearch from './modules/student-search.vue';

defineOptions({ name: 'StudentManage' });

const authStore = useAuthStore();

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
  apiFn: fetchGetStudentList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    name: undefined,
    genderCode: undefined,
    studentNumber: undefined,
    phone: undefined,
    email: undefined
  },
  columns: () => [
    // TODO 待后端适配批量删除学生
    // { type: 'selection', width: 48 },
    { prop: 'index', label: $t('common.index'), width: 64 },
    { prop: 'name', label: '姓名', minWidth: 50 },
    { prop: 'studentNumber', label: '学号', minWidth: 100 },
    {
      prop: 'genderCode',
      label: $t('page.manage.user.userGender'),
      width: 100,
      formatter: row => {
        if (row.genderCode === undefined) {
          return '';
        }

        const tagMap: Record<Api.StudentManage.StudentGender, UI.ThemeColor> = {
          1: 'primary',
          2: 'danger'
        };

        const label = $t(studentGenderRecord[row.genderCode]);

        return <ElTag type={tagMap[row.genderCode]}>{label}</ElTag>;
      }
    },
    { prop: 'className', label: '班级', minWidth: 50 },
    { prop: 'phone', label: $t('page.manage.user.userPhone'), width: 120 },
    { prop: 'email', label: $t('page.manage.user.userEmail'), minWidth: 100 },
    {
      prop: 'operate',
      label: $t('common.operate'),
      align: 'center',
      formatter: row => (
        <div class="flex-center">
          <ElButton type="primary" plain size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </ElButton>
          <ElButton
            type="success"
            plain
            size="small"
            disabled={row.id === authStore.userInfo.studentId}
            onClick={() => handleStudentCourseRelation(row.id)}
          >
            {row.id === authStore.userInfo.studentId ? '已关联' : '选课关联'}
          </ElButton>

          <ElPopconfirm title={$t('common.confirmDelete')} onConfirm={() => handleDelete(row.id)}>
            {{
              reference: () => (
                <ElButton type="danger" plain size="small">
                  {$t('common.delete')}
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

async function handleDelete(id: number) {
  // eslint-disable-next-line no-console
  console.log(id);
  // request
  await fetchDeleteStudent(id);

  onDeleted();
}

function edit(id: number) {
  console.log(id);
  handleEdit(id);
}

async function handleStudentCourseRelation(studentId: number) {
  console.log(studentId);
  await fetchSetUserStudentId(studentId);
  await authStore.initUserInfo()
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <StudentSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <ElCard class="sm:flex-1-hidden card-wrapper" body-class="ht50">
      <template #header>
        <div class="flex items-center justify-between">
          <p>学生列表</p>
          <TableHeaderOperation v-model:columns="columnChecks" :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading" @add="handleAdd" @delete="handleBatchDelete" @refresh="getData" />
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
      <UserOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData"
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
