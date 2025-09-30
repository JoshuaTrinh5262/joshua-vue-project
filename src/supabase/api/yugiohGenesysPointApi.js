import { supabase } from "../supabase";
export const getGenesysPointsWithPaging = async (
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
            .from("yugioh_genesys_point")
            .select("*", {
                count: "exact",
            })
            .order(orderBy, { ascending: orderDirection === "asc" })
            .range(start, end);

        if (search) {
            query = query.or(`name.ilike.%${search}%`);
        }

        const { data, count, error } = await query;

        if (error) {
            return { error: error.message };
        }

        return {
            items: data,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getGenesysPoints = async () => {
    try {
        const { data, error } = await supabase
            .from("yugioh_genesys_point")
            .select("*")
            .order("name","asc");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohProductById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_genesys_point")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const createYugiohProduct = async (yugioh_genesys_point) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_genesys_point")
            .insert(yugioh_genesys_point)
            .single();
        if (error != null) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohProduct = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_genesys_point")
            .update(update)
            .eq("id", update.id)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteYugiohProduct = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_genesys_point")
            .delete()
            .eq("id", id);
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countYugiohProductRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_genesys_point")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
