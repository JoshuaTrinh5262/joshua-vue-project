import { supabase } from "../supabase";

export const getDatasets = async (page, pageSize, orderBy, orderDirection, search = '') => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        let query = supabase
            .from('dataset')
            .select('*', { count: 'exact' })
            .order(orderBy, { ascending: orderDirection === 'asc' })
            .range(start, end);

        if (search) {
            query = query.or(
                `source_text.ilike.%${search}%,target_text.ilike.%${search}%,category.ilike.%${search}%`
            );
        }
        const { data, count, error } = await query;

        if (error) {
            throw error;
        }

        return {
            items: data,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        console.error('Error fetching talents:', err);
        return { error: err.message };
    }
};
export const getDatasetById = async (id) => {
    try {
        const { data, error } = await supabase.from('dataset').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching dataset with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createDataset = async (dataset) => {
    try {
        const { data, error } = await supabase.from('dataset').insert(dataset).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Error creating dataset:', err);
        return { error: err.message };
    }
};

export const updateDataset = async (updateData) => {
    try {
        const { data, error } = await supabase.from('dataset').update(updateData).eq('id', updateData.id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating dataset with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteDataset = async (id) => {
    try {
        const { data, error } = await supabase.from('dataset').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting dataset with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countDatasetRecord = async () => {
    try {
        const { count, error } = await supabase.from('dataset').select('*', { count: 'exact', head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error('Error counting datasets:', err);
        return { error: err.message };
    }
};
