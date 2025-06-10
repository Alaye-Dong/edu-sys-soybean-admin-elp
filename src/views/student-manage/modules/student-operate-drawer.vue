<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useForm, useFormRules } from '@/hooks/common/form';
import { fetchCreateStudent } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions, studentGenderOptions } from '@/constants/business';

defineOptions({ name: 'StdentOperateDrawer' });

interface Props {
  /** the type of operation */
  operateType: UI.TableOperateType;
  /** the edit row data */
  rowData?: Api.StudentManage.Student | null;
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
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.StudentManage.Student,
  'studentNumber' | 'name' | 'genderCode' | 'phone' | 'email' | 'className'
>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    studentNumber: '',
    name: '',
    genderCode: undefined,
    className: '',
    phone: '',
    email: '',
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
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
  // request
  if (props.operateType === 'add') {
    await fetchCreateStudent(model.value);
  }
  if (props.operateType === 'edit') {
    // TODO 改
    console.log('edit');
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
      <ElFormItem :label="$t('page.manage.user.userName')" prop="name">
        <ElInput v-model="model.name" :placeholder="$t('page.manage.user.form.userName')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userGender')" prop="genderCode">
        <ElRadioGroup v-model="model.genderCode">
          <ElRadio v-for="item in studentGenderOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem :label="'学号'" prop="studentNumber">
        <ElInput v-model="model.studentNumber" :placeholder="'请输入学号'" />
      </ElFormItem>
      <ElFormItem :label="'班级'" prop="className">
        <ElInput v-model="model.className" :placeholder="'请输入班级'" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userPhone')" prop="phone">
        <ElInput v-model="model.phone" :placeholder="$t('page.manage.user.form.userPhone')" />
      </ElFormItem>
      <ElFormItem :label="$t('page.manage.user.userEmail')" prop="email">
        <ElInput v-model="model.email" :placeholder="$t('page.manage.user.form.userEmail')" />
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
