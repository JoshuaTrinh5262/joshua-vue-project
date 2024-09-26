import { supabase } from "../supabase";

export const getDiscographiesWithPaging = async (page, pageSize, orderBy, orderDirection, search = '') => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        let query = supabase
            .from('discography')
            .select('*, album(name)')
            .order(orderBy, { ascending: orderDirection === 'asc' })
            .range(start, end);

        if (search) {
            query = query.or(`name.ilike.%${search}%`);
        }

        const { data, count, error } = await query;

        if (error) {
            throw error;
        }
        const discographies = data.map(discography => ({
            ...discography,
            album: discography.album?.name
        }));

        return {
            items: discographies,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};
export const getDiscographies = async () => {
    try {
        const { data, error } = await supabase.from('discography').select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error fetching discographies:', err);
        return { error: err.message };
    }
};

export const getDiscographyById = async (id) => {
    try {
        const { data, error } = await supabase.from('discography').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching discography with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createDiscography = async (discography) => {
    try {
        const { data, error } = await supabase.from('discography').insert(discography).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error creating discography:', err);
        return { error: err.message };
    }
};

export const updateDiscography = async (id, updates) => {
    try {
        const { data, error } = await supabase.from('discography').update(updates).eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating discography with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteDiscography = async (id) => {
    try {
        const { data, error } = await supabase.from('discography').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting discography with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countDiscographyRecord = async () => {
    try {
        const { count, error } = await supabase.from('discography').select('*', { count: 'exact', head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error('Error counting discographies:', err);
        return { error: err.message };
    }
};
