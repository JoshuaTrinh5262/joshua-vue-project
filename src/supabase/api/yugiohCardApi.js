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

// export const getYugiohCards = async () => {
//     try {
//         const { data, error } = await supabase.from("yugioh_card").select("*");
//         if (error) {
//             return { error: error.message };
//         }
//         return data;
//     } catch (err) {
//         return { error: err.message };
//     }
// };

export const searchCard = async (search, includeDescription) => {
    try {
        let query = supabase
            .from("yugioh_card")
            .select("*")
            .neq("passcode", null)
            .ilike("name", `%${search}%`);
        if (includeDescription) {
            query = supabase
                .from("yugioh_card")
                .select("*")
                .neq("passcode", null)
                .or(
                    `name.ilike.%${search}%,description.ilike.%${search}%,pendulum_effect.ilike.%${search}%`
                );
        }

        const { data, error } = await query;

        if (error) {
            return { error: error.message };
        }
        const mappedData = data.map((card) => ({
            ...card,
            image: `https://images.ygoprodeck.com/images/cards/${parseInt(
                card.passcode,
                10
            )}.jpg`,
        }));
        return mappedData;
    } catch (err) {
        return { error: err.message };
    }
};

export const getNullPasscodeCards = async () => {
    try {
        const { data, error } = await supabase
            .from("yugioh_card")
            .select("*")
            .is("passcode", null);
        if (error) {
            return { error: error.message };
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
            return { error: error.message };
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
            return { error: error.message };
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
            return { error: error.message };
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
            return { error: error.message };
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
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
