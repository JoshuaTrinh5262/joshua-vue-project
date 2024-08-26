import { supabase } from "../supabase";

export const getAlbums = async () => {
    try {
        const { data, error } = await supabase.from('album').select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error fetching albums:', err);
        return { error: err.message };
    }
};

export const getAlbumById = async (id) => {
    try {
        const { data, error } = await supabase.from('album').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching album with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createAlbum = async (album) => {
    try {
        const { data, error } = await supabase.from('album').insert(album).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error creating album:', err);
        return { error: err.message };
    }
};

export const updateAlbum = async (id, updates) => {
    try {
        const { data, error } = await supabase.from('album').update(updates).eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating album with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteAlbum = async (id) => {
    try {
        const { data, error } = await supabase.from('album').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting album with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countAlbumRecord = async () => {
    try {
        const { count, error } = await supabase.from('album').select('*', { count: 'exact', head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error('Error counting albums:', err);
        return { error: err.message };
    }
};