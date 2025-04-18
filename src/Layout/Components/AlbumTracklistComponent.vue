<template>
  <div class="mb-2">
    <div v-if="isEditMode">
      <button class="btn btn-success mr-2" @click="updateTracklist">
        Save
      </button>
      <button class="btn btn-warning" @click="cancelEditMode">Cancel</button>
    </div>
    <div v-else>
      <button class="btn btn-primary" @click="toggleEditMode">Edit</button>
    </div>
  </div>
  <div v-for="(track, index) in tracks" :key="index" class="form-row">
    <div :class="isEditMode ? 'col-md-3' : 'col-md-4'">
      <div class="position-relative form-group">
        <label for="track_order">Order</label>
        <input
          type="number"
          id="track_order"
          v-model="track.order"
          class="form-control"
          :disabled="!isEditMode"
        />
      </div>
    </div>
    <div :class="isEditMode ? 'col-md-3' : 'col-md-4'">
      <div class="position-relative form-group">
        <label for="track_version">Version</label>
        <input
          type="text"
          id="track_version"
          v-model="track.version"
          class="form-control"
          :disabled="!isEditMode"
        />
      </div>
    </div>
    <div :class="isEditMode ? 'col-md-3' : 'col-md-4'">
      <div class="position-relative form-group">
        <label for="track_discography">Discography</label>
        <input
          type="text"
          id=""
          v-model="track.discography_id"
          class="form-control"
          :disabled="!isEditMode"
        />
      </div>
    </div>
    <div class="col-md-2" v-if="isEditMode">
      <label>Action</label>
      <div class="position-relative form-group">
        <button class="btn btn-success mr-2" @click="addEmptyTracklist">
          Add
        </button>
        <button class="btn btn-warning" @click="deleteTracklist(index)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

export default {
  name: "AlbumTracklistComponent",

  emits: ["updateTracklist", "toggleEditMode"],

  props: {
    tracksData: {
      type: Array,
      required: false,
      default: () => null,
    },
    isEditMode: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    const tracks = reactive([]);
    const syncTracksWithProps = () => {
      if (props.tracksData) {
        const cloned = JSON.parse(JSON.stringify(props.tracksData));
        tracks.splice(0, tracks.length, ...cloned);
      }
    };
    watch(
      () => props.tracksData,
      () => {
        syncTracksWithProps();
      },
      { immediate: true }
    );

    const addEmptyTracklist = () => {
      const track_length = tracks.length + 1;
      tracks.push({
        order: track_length,
        version: "",
        discography_id: "",
      });
    };

    const deleteTracklist = (index) => {
      tracks.splice(index, 1);
    };

    const updateTracklist = () => {
      emit("updateTracklist", tracks);
    };

    const toggleEditMode = () => {
      if (tracks.length == 0) {
        addEmptyTracklist();
      }
      emit("toggleEditMode");
    };

    const cancelEditMode = () => {
      syncTracksWithProps();
      emit("toggleEditMode");
    };

    return {
      tracks,
      addEmptyTracklist,
      updateTracklist,
      deleteTracklist,
      toggleEditMode,
      cancelEditMode,
    };
  },
};
</script>
