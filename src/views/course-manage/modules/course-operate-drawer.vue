<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useForm, useFormRules } from '@/hooks/common/form';
import { fetchCreateCourse,fetchUpdateCourse } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'CourseOperateDrawer',
});

interface Props {
  operateType: UI.TableOperateType;
  rowData?: Api.CourseManage.Course | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<UI.TableOperateType, string> = {
    add: '新增课程',
    edit: '编辑课程'
  };

  return titles[props.operateType];
})

type Model = Api.CourseManage.CourseOperateParams;

const model = ref(createDefaultModel())

function createDefaultModel(): Model {
  return {
    courseNumber: '',
    name: '',
    teacherName: '',
    credit: 0,
    description: ''
  }
}

type RuleKey = Extract<keyof Model, 'name' | 'courseNumber'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  courseNumber: defaultRequiredRule
};

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    await fetchCreateCourse(model.value);
    window.$message?.success($t('common.addSuccess'));
  }
  if (props.operateType === 'edit') {
    await fetchUpdateCourse(model.value);
    window.$message?.success($t('common.updateSuccess'));
  }

  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <ElDrawer v-model="visible" :title="title" :size="360">
    <ElForm ref="formRef" :model="model" :rules="rules" label-position="top">
      <ElFormItem :label="'课程名'" prop="name">
        <ElInput v-model="model.name" :placeholder="'请输入课程名'" />
      </ElFormItem>
      <ElFormItem :label="'课程编号'" prop="courseNumber">
        <ElInput v-model="model.courseNumber" :placeholder="'请输入课程编号'" />
      </ElFormItem>
      <ElFormItem :label="'教师名'" prop="className">
        <ElInput v-model="model.teacherName" :placeholder="'请输入教师名'" />
      </ElFormItem>
      <ElFormItem :label="'学分'" prop="credit">
        <ElInput v-model="model.credit" :placeholder="'请输入学分'" />
      </ElFormItem>
      <ElFormItem :label="'课程描述'" prop=".description">
        <ElInput v-model="model.description" :placeholder="'请输入课程描述'" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElSpace :size="16">
        <ElButton @click="closeDrawer">{{ $t('common.cancel') }}</ElButton>
        <ElButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</ElButton>
      </ElSpace>
    </template>
  </ElDrawer>
</template>

<style scoped></style>
