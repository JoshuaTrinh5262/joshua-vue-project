import { supabase } from "../supabase";
export const getYugiohDecklistsWithPaging = async (
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
            .from("yugioh_decklist")
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
h
        return {
            items: data,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohDecklists = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_decklist").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohDecklistById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_decklist")
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

export const createYugiohDecklist = async (yugioh_decklist) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_decklist")
            .insert(yugioh_decklist)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohDecklist = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_decklist")
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

export const deleteYugiohDecklist = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_decklist")
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


export const countYugiohDecklistRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_decklist")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
