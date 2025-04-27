import { supabase } from "../supabase";
export const getYugiohTournamentsWithPaging = async (
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
            .from("yugioh_tournament")
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

export const getYugiohTournaments = async () => {
    try {
        const { data, error } = await supabase.from("yugioh_tournament").select("*");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getYugiohTournamentById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_tournament")
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

export const createYugiohTournament = async (yugioh_tournament) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_tournament")
            .insert(yugioh_tournament)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateYugiohTournament = async (update) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_tournament")
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

export const deleteYugiohTournament = async (id) => {
    try {
        const { data, error } = await supabase
            .from("yugioh_tournament")
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


export const countYugiohTournamentRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("yugioh_tournament")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
