import { supabase } from "../supabase";
export const getYugiohDuelistsWithPaging = async (
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
            .from("yugioh_duelist")
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

export const getYugiohDuelists = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_duelist").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohDuelistById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_duelist")
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

export const createYugiohDuelist = async (yugioh_duelist) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_duelist")
            .insert(yugioh_duelist)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohDuelist = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_duelist")
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

export const deleteYugiohDuelist = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_duelist")
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


export const countYugiohDuelistRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_duelist")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
