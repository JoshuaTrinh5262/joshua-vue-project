import { supabase } from "../supabase";

export const getTalents = async () => {
    try {
        const { data, error } = await supabase.from('talent').select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error fetching talents:', err);
        return { error: err.message };
    }
};

export const getTalentById = async (id) => {
    try {
        const { data, error } = await supabase.from('talent').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createTalent = async (talent) => {
    try {
        const { data, error } = await supabase.from('talent').insert(talent).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error creating talent:', err);
        return { error: err.message };
    }
};

export const updateTalent = async (id, updates) => {
    try {
        const { data, error } = await supabase.from('talent').update(updates).eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteTalent = async (id) => {
    try {
        const { data, error } = await supabase.from('talent').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countTalentRecord = async () => {
    try {
        const { count, error } = await supabase.from('talent').select('*', { count: 'exact', head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error('Error counting talents:', err);
        return { error: err.message };
    }
};
