import { supabase } from "../supabase";

export const getDatasetUnprocess = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = ""
) => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        let query = supabase
            .from("dataset_unprocess")
            .select("id, source_text, target_text")
            .order(orderBy, { ascending: orderDirection === "asc" })
            .range(start, end);

        if (search) {
            query = query.or(
                `source_text.ilike.%${search}%,target_text.ilike.%${search}%`
            );
        }

        const { data, error } = await query;

        if (error) {
            return 0;
        }

        return data;
    } catch (err) {
        return 0;
    }
};

export const getCountDatasetUnprocess = async (search) => {
    try {
        let query = `
            SELECT
                COUNT(id)
            FROM 
                dataset_unprocess
        `;

        if (search) {
            query += `
                WHERE 
                    lower(source_text) LIKE '%${search.toLowerCase()}%' 
                    OR lower(target_text) LIKE '%${search.toLowerCase()}%'
        `;
        }
        query += `LIMIT 1`;

        const { data, error } = await supabase.rpc('execute_dynamic_query', {
            query,
        });

        if (error) {
            return { error: error };
        }

        return data[0].count;
    } catch (err) {
        return { error: err.message };
    }
}

export const getDatasetUnprocessById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("dataset_unprocess")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const createDataset = async (dataset) => {
    try {
        const { data, error } = await supabase
            .from("dataset_unprocess")
            .insert(dataset)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateDatasetUnprocess = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("dataset_unprocess")
            .update(updateData)
            .eq("id", updateData.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteDatasetUnprocess = async (id) => {
    try {
        const { data, error } = await supabase
            .from("dataset_unprocess")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countDatasetUnprocessRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("dataset_unprocess")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
