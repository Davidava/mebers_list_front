<template>
  <v-card>
    <v-card-title class=text-center>
      Ви дійсно хочете <br> видалити даного члена?
    </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="error"
            text
            @click="$emit('dialog-agree')"
          >
            Так
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="$emit('dialog-disagree')"
          >
            Нi
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
