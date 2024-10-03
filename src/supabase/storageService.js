import { supabase } from "./supabase";

export const storageService = {
    async uploadImage(file, fileName, bucketName) {
        try {
            const uniqueFileName = `${fileName}`;

            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(uniqueFileName, file);

            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    },

    async downloadImage(filePath, bucketName) {
        try {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .download(filePath);

            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            return url;
        } catch (error) {
            console.error('Error downloading image:', error);
            return null;
        }
    },

    async deleteImage(filePath, bucketName) {
        try {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .remove([filePath]);

            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error deleting image:', error);
            return null;
        }
    },

    getImageUrl(bucket, path) {
        const { publicURL, error } = supabase.storage.from(bucket).getPublicUrl(path);

        console.log(publicURL)

        if (error) {
            throw error;
        }

        return publicURL;
    }
};
