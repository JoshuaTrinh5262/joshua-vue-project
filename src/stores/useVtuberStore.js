import { defineStore } from 'pinia'
import { apiService } from '@/supabase/apiService'

export const useVtuberStore = defineStore('vtuber', {
    state: () => ({
        talentOptions: [],
        albumOptions: [],
        agencyOptions: [],
    }),
    actions: {
        async fetchTalents() {
            if (this.talentOptions.length > 0) {
                return;
            }

            const result = await apiService.getTalents()

            if (Array.isArray(result)) {
                this.talentOptions = result
            }
        },

        async fetchAlbums() {
            if (this.albumOptions.length > 0) {
                return;
            }

            const result = await apiService.getAlbums()

            if (Array.isArray(result)) {
                this.albumOptions = result
            }
        },

        async fetchAgencies() {
            if (this.agencyOptions.length > 0) {
                return;
            }

            const result = await apiService.getAgencies()

            if (Array.isArray(result)) {
                this.agencyOptions = result
            }
        },
    },
})
