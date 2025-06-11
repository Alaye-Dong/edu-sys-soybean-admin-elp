<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useForm, useFormRules } from '@/hooks/common/form';

defineOptions({
  name: 'CourseSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useForm();

const model = defineModel<Api.CourseManage.CourseSearchParams>('model', { required: true })

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <ElCard class="card-wrapper">
    <ElCollapse>
      <ElCollapseItem :title="$t('common.search')" name="user-search">
        <ElForm ref="formRef" :model="model" label-position="right" :label-width="80">
          <ElRow :gutter="24">
            <ElCol :lg="6" :md="8" :sm="12">
              <ElFormItem :label="'课程名'" prop="name">
                <ElInput v-model="model.name" :placeholder="'请输入课程名'" />
              </ElFormItem>
            </ElCol>
            <ElCol :lg="6" :md="8" :sm="12">
              <ElFormItem :label="'课程编号'" prop="courseNumber">
                <ElInput v-model="model.courseNumber" :placeholder="'请输入课程编号'" />
              </ElFormItem>
            </ElCol>
            <ElCol :lg="6" :md="8" :sm="12">
              <ElFormItem :label="'教师名'" prop="teacherName">
                <ElInput v-model="model.teacherName" :placeholder="'请输入教师名'" />
              </ElFormItem>
            </ElCol>
            <ElCol :lg="12" :md="24" :sm="24">
              <ElSpace class="w-full justify-end" alignment="end">
                <ElButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </ElButton>
                <ElButton type="primary" plain @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </ElButton>
              </ElSpace>
            </ElCol>
          </ElRow>
        </ElForm>
      </ElCollapseItem>
    </ElCollapse>
  </ElCard>
</template>

<style scoped></style>
