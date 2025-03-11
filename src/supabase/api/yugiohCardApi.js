import { supabase } from "../supabase";
export const getYugiohCardsWithPaging = async (
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
            .from("yugioh_card")
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

export const getYugiohCards = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_card").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohCardById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_card")
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

export const createYugiohCard = async (yugioh_card) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_card")
            .insert(yugioh_card)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohCard = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_card")
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

export const deleteYugiohCard = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_card")
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


export const countYugiohCardRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_card")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
