import { supabase } from "../supabase";
export const getYugiohDecksWithPaging = async (
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
            .from("yugioh_deck")
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

export const getYugiohDecks = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_deck").select("*");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohDeckById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_deck")
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

export const createYugiohDeck = async (yugioh_deck) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_deck")
            .insert(yugioh_deck)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohDeck = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_deck")
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

export const deleteYugiohDeck = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_deck")
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


export const countYugiohDeckRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_deck")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
