<template>
    <div>
        <page-title
            :heading=heading
            :subheading=subheading
            :icon=icon
            :clickCreateBtn="toggleCreateData"
            :showImport=true
            :showExport=true
            ></page-title>
            <div class="main-card mb-3 card">
                <div class="card-body">
                    <h5 class="card-title">Add New Data</h5>
                    <div class="position-relative form-group">
                        <label for="source_text" class="">Source Text</label>
                        <input name="source_text"
                            v-model="source_text"
                            id="source_text"
                            placeholder="with a placeholder"
                            type="text"
                            class="form-control">
                    </div>
                    <div class="position-relative form-group">
                        <label for="target_text" class="">Target Text</label>
                        <input name="target_text"
                            v-model="target_text"
                            id="target_text"
                            placeholder="with a placeholder"
                            type="text"
                            class="form-control">
                    </div>
                    <button class="btn-primary btn-sm"  @click="handleCreate">Submit</button>
                </div>
            </div>
        <table-component 
            :footer=true
            :small=true
            :fields="fields"
            :items="items"
            @deleteRow="handleDeleteRow"
            @updateRow="handleUpdateRow">
        </table-component>
    </div>
</template>
<script>
import TableComponent from '../../DemoPages/Tables/TableComponent.vue';
import PageTitle from "../../Layout/Components/PageTitle.vue";
import axios from 'axios';

export default {
    name: "DatasetPageComponent",

    components: {
        PageTitle,
        TableComponent
    },

    data: () => ({
        source_text: '',
        target_text: '',
        showCreateData: false,
        fields: ['Id', 'Source Text', 'Target Text'],
        items: [],
        heading: 'Chatbot Dataset',
        subheading: 'Chatbot Dataset',
        icon: 'pe-7s-phone icon-gradient bg-premium-dark',
    }),

    created() {
        this.getDatasetData();
    },
    methods: {
        handleCreate() {
            const postData = {
                source_text: this.source_text,
                target_text: this.target_text,
                language: 'en',
            };
            
            if(this.source_text && this.target_text) {
                axios.post('http://127.0.0.1:5000/api/conversations', postData)
                .then(() => {
                    this.getDatasetData();
                    this.source_text = '';
                    this.target_text = '';
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                alert('Please enter data before submitting.');
            }
        },

        getDatasetData() {
            axios.get('http://127.0.0.1:5000/api/conversations')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleDeleteRow(id) {
            axios.delete('http://127.0.0.1:5000/api/conversations/' + id)
            .then(() => {
                this.getDatasetData();
            })
            .catch(error => {
                console.error(error);
            });
        },

        handleUpdateRow() {
            console.log("update")
        },

        toggleCreateData(){
            console.log(this.showCreateData)
            this.showCreateData = !this.showCreateData;
        }
    }
};
</script>
  