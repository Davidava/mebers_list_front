<template>
  <div>
    <input
      v-if="!reedOnly"
      type="file"
      accept=".jpg, .jpeg, .png"
      style="display:none"
      id="inputAvatar"
      @change="$emit('upload-avatar', $event)"
    >
    <label for="inputAvatar">
      <a>
        <v-avatar
          size="164"
          v-ripple="!reedOnly"
          tile
          class="profile"
        >
          <img
          style="object-fit: cover;"
          :src="source"
          >
          <div style="position: absolute; bottom: 0; right: 0;">
            <v-icon
              v-if="!reedOnly"
              medium
              color="black"
            >
              mdi-pencil
            </v-icon>
          </div>
        </v-avatar>
      </a>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
    },
    reedOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    source() {
      return this.img || 'https://res.cloudinary.com/dqe6ahyux/image/upload/v1607687084/iig3kvdvjgcvhezmkpht.png';
    },
  },
};
</script>
