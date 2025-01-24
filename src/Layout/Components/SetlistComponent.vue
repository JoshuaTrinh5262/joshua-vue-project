<template>
    <div v-for="(track, index) in tracks" :key="index" class="form-row">
        <div class="col-md-1">
            <input type="number" v-model="track.track_number" placeholder="track_number"
                class="form-control form-control-sm" />
        </div>
        <div class="col-md-2">
            <input type="text" v-model="track.time_stamp" placeholder="time_stamp"
                class="form-control form-control-sm" />
        </div>
        <div class="col-md-4">
            <input type="text" v-model="track.romaji_title" placeholder="romaji_title"
                class="form-control form-control-sm" />
        </div>
        <div class="col-md-4">
            <input type="text" v-model="track.name" placeholder="name" class="form-control form-control-sm" />
        </div>
        <div class="col-md-1">
            <button class="btn btn-sm btn-success" @click="deleteTrack(index)"><i
                    class="pe-7s-close-circle"></i></button>
        </div>
    </div>
    <button class="btn btn-sm btn-success" @click="addEmptyTrack"><i class="pe-7s-plus"></i></button>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
    name: "SetlistComponent",
    emits: ["updateTracks"],
    props: {
        tracksData: {
            type: Array,
            required: false,
            default: () => null,
        },
    },
    setup(props, { emit }) {
        const tracks = reactive([]);

        watch(() => props.tracksData, (newVal) => {
            if (newVal) {
                tracks.splice(0, tracks.length, ...newVal);
            }
        }, { immediate: true });
        // const tracks = reactive([
        //     {
        //         time_stamp: "00:02:34",
        //         track_number: "1",
        //         romaji_title: "Wagamama Hime",
        //         name: "我儘姫",
        //     },
        //     {
        //         time_stamp: "00:05:57",
        //         track_number: "2",
        //         romaji_title: "Myth or Treat",
        //         name: null,
        //     },
        //     {
        //         time_stamp: "00:11:35",
        //         track_number: "3",
        //         romaji_title: "Los! Los! Los!",
        //         name: null,
        //     },
        //     {
        //         time_stamp: "00:17:25",
        //         track_number: "4",
        //         romaji_title: "Kochira, Koufuku Anshin Iinkai desu",
        //         name: "こちら、幸福安心委員会です。",
        //     },
        //     {
        //         time_stamp: "00:22:07",
        //         track_number: "5",
        //         romaji_title: "Sis×Love",
        //         name: "シス×ラブ",
        //     },
        //     {
        //         time_stamp: "00:28:14",
        //         track_number: "6",
        //         romaji_title: "Haikei Doppelganger",
        //         name: "拝啓ドッペルゲンガー",
        //     },
        //     {
        //         time_stamp: "00:32:44",
        //         track_number: "7",
        //         romaji_title: "Ghost Rule",
        //         name: "ゴーストルール",
        //     },
        //     {
        //         time_stamp: "00:39:54",
        //         track_number: "8",
        //         romaji_title: "Hanaji",
        //         name: null,
        //     },
        //     {
        //         time_stamp: "00:46:18",
        //         track_number: "9",
        //         romaji_title: "World Is Mine",
        //         name: "ワールドイズマイン",
        //     },
        //     {
        //         time_stamp: "00:55:55",
        //         track_number: "10",
        //         romaji_title: "Kapuine Addiction",
        //         name: "かぷうぃん中毒",
        //     },
        // ]);

        const addEmptyTrack = () => {
            tracks.push({
                time_stamp: "",
                track_number: "",
                romaji_title: "",
                name: "",
            });
            emit("updateTracks", tracks);
        };

        const deleteTrack = (index) => {
            tracks.splice(index, 1);
            emit("updateTracks", tracks);
        };

        return {
            tracks,
            addEmptyTrack,
            deleteTrack,
        };
    },
};
</script>