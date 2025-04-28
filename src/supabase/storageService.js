import { supabase } from "./supabase";

export const storageService = {
    async uploadImage(file, fileName, bucketName) {
        try {
            const uniqueFileName = `${fileName}`;

            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(uniqueFileName, file);

            if (error) {
                return { error: error.message };
            }
            return data;
        } catch (error) {
            return null;
        }
    },

    async downloadImage(filePath, bucketName) {
        try {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .download(filePath);

            if (error) {
                return { error: error.message };
            }
            const url = URL.createObjectURL(data);
            return url;
        } catch (error) {
            return null;
        }
    },

    async deleteImage(filePath, bucketName) {
        try {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .remove([filePath]);

            if (error) {
                return { error: error.message };
            }
            return data;
        } catch (error) {
            return null;
        }
    },

    async getPublicImageUrl(bucket, path) {
        try {
            const { publicURL, error } = await supabase.storage
                .from(bucket)
                .getPublicUrl(path);

            if (error) {
                return { error: error.message };
            }

            return publicURL;
        } catch (error) {
            return null;
        }
    },

    async getSignedImageUrl(bucket, path, expiresIn = 3600) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .createSignedUrl(path, expiresIn);

            if (error) {
                return { error: error.message };
            }

            return data.signedUrl;
        } catch (error) {
            return null;
        }
    }

};
