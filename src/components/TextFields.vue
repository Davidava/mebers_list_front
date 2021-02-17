<template>
  <div>
    <v-text-field
      v-model="member.name"
      :rules="fieldRules"
      required
      label="Імя"
      :readonly="fieldReadonly"
    />

    <v-text-field
      v-model="member.surName"
      :rules="fieldRules"
      required
      label="Призвіще"
      :readonly="fieldReadonly"
    />

    <v-text-field
      v-model="member.middleName"
      :rules="fieldRules"
      required
      label="По батькові"
      :readonly="fieldReadonly"
    />

    <v-select
      stele="text-color: red"
      v-model="member.membership"
      :rules="fieldRules"
      required
      label="Членство"
      :items="items"
      :readonly="fieldReadonly"
    />

    <v-text-field
      v-model="member.phoneNumber"
      :rules="fieldRules"
      required
      label="Телефон"
      :readonly="fieldReadonly"
    />

    <v-text-field
      v-model="member.dateOfBirth"
      :rules="fieldRules"
      required
      label="Дата народження"
      type="date"
      :readonly="fieldReadonly"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ['Так', 'Ні'],
  }),
  props: {
    fieldRules: {
      type: Array,
      default: () => ([]),
    },
    member: {
      type: Object,
      default: () => ({}),
    },
    fieldReadonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
