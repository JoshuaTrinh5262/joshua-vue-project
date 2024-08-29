import { supabase } from "../supabase";

export const getTalents = async (page, pageSize, orderBy, orderDirection) => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        const { data, count, error } = await supabase
            .from('talent')
            .select('*, agency(agency_name)', { count: 'exact' })
            .order(orderBy, { ascending: orderDirection === 'asc' })
            .range(start, end);

        if (error) {
            throw error;
        }

        const transformedData = data.map(item => ({
            ...item,
            agency: item.agency?.agency_name,
        }));

        return {
            items: transformedData,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
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
