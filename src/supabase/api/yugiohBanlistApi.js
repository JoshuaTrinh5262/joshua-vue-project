import { supabase } from "../supabase";
export const getYugiohBanlistsWithPaging = async (
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
            .from("yugioh_banlist")
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

export const getYugiohBanlists = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_banlist").select("*");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohBanlistById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_banlist_card")
            .select("*, yugioh_card(name, category, description, icon)")
            .eq("banlist_id", id);
        if (error) {
            return { error: error.message };
        }

        const groupedData = data.reduce((acc, card) => {
            const status = card.status || "Unknown";
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(card);
            return acc;
        }, {});

        return groupedData;
    } catch (err) {
        return { error: err.message };
    }
};

export const createYugiohBanlist = async (yugioh_banlist) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_banlist")
            .insert(yugioh_banlist)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohBanlist = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_banlist")
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

export const deleteYugiohBanlist = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_banlist")
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


export const countYugiohBanlistRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_banlist")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
