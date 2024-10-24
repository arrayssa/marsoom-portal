<template>
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop($event)"
      :style="isDragging ? 'border-color: green;' : ''"
    >
      <input
        type="file"
        :name="field"
        :id="field"
        class="hidden-input"
        @change="onChange"
        ref="fileInput"
        accept=".pdf,.jpg,.jpeg,.png,.xlsx"
      />
  
      <div class="preview-container" v-if="fileData">
        <div class="preview-card">
          <div>
            <p class="max-w-28 text-ellipsis overflow-hidden">
              {{ fileData.name }}
              <span v-if="showFileSize">
                <br>
                {{ Math.round(fileData.size / 1000) + "kb" }}
              </span>
            </p>
          </div>
          <div>
            <i
              class="removeBtn pi pi-times"
              @click="removeFile"
              title="Remove file"
            ></i>
          </div>
        </div>
      </div>
      <label v-else :for="field" class="file-label" :class="'cursor-pointer'">
        <div v-if="isDragging">Release to drop files here.</div>
        <div :style="'color: #aaa8a8;'" v-else>Drop And Drop or <u style="color: #000000;">Browse</u></div>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      field: {
        type: String,
        required: true
      },
      fileData: {
        type: Object,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      showFileSize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isDragging: false
      };
    },
    methods: {
      onChange(e) {
        this.$emit("file-changed", this.$refs.fileInput.files[0], this.field);
      },
      dragover(e) {
        e.preventDefault();
        this.isDragging = true;
      },
      dragleave() {
        this.isDragging = false;
      },
      drop(e) {
        e.preventDefault();
        this.$refs.fileInput.files = e.dataTransfer.files;
        this.onChange(e);
        this.isDragging = false;
      },
      removeFile() {
        this.$emit("file-removed", this.field);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Drop Zone */
.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 2px dashed;
    border-color: #9e9e9e;
    position: relative;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    text-align: center;
}

.preview-container {
    display: flex;
}

.preview-card {
    display: flex;
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
.removeBtn {
  font-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  cursor: pointer;
}
  </style>
  