import { supabase } from "../supabase";
export const getYugiohProductsWithPaging = async (
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
            .from("yugioh_product")
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
            throw error;
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

export const getYugiohProducts = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_product").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohProductById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_product")
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

export const createYugiohProduct = async (yugioh_product) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_product")
            .insert(yugioh_product)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohProduct = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_product")
            .update(update)
            .eq("id", update.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteYugiohProduct = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_product")
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


export const countYugiohProductRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_product")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
