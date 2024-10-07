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
            return null;
        }
    },

    async getImageUrl(bucket, path) {
        const { publicURL, error } = await supabase.storage
            .from(bucket)
            .getPublicUrl(path);


        if (error) {
            throw error;
        }

        return publicURL;
    },

    async getSignedImageUrl(bucket, path, expiresIn = 3600) { 
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(path, expiresIn);
      
        if (error) {
          throw error;
        }
      
        return data.signedUrl;
      }
};
