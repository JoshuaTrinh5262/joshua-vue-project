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
            query = query.or(`card_name.ilike.%${search}%`);
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
        console.error("Error fetching yugioh card data:", err);
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
        console.error(`Error fetching yugioh_card with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createYugiohCard = async (yugioh_card, selectedTalents) => {
    try {
        const { data: albumData, error: albumError } = await supabase
            .from("yugioh_card")
            .insert(yugioh_card)
            .select("*")
            .single();
        if (albumError) {
            throw albumError;
        }

        const albumTalentRecords = selectedTalents.map((talent) => ({
            album_id: albumData.id,
            talent_id: talent.id,
        }));
        const { data: talentData, error: talentError } = await supabase
            .from("album_talent")
            .insert(albumTalentRecords);

        if (talentError) {
            throw talentError;
        }

        return {
            yugioh_card: albumData,
            talents: talentData,
        };
    } catch (err) {
        console.error("Error creating yugioh_card:", err);
        return { error: err.message };
    }
};

export const updateYugiohCard = async (updateData, selectedTalents) => {
    try {
        const { data: albumData, error: albumError } = await supabase
            .from("yugioh_card")
            .update(updateData)
            .eq("id", updateData.id)
            .single();

        if (albumError) {
            throw albumError;
        }

        // Step 2: Handle album_talent updates
        const albumId = updateData.id;

        // Convert selected talents to an array of talent_id
        const talentIds = selectedTalents.map((talent) => talent.id);

        // Fetch existing album_talent entries for the yugioh_card
        const { data: existingTalents, error: fetchError } = await supabase
            .from("album_talent")
            .select("talent_id")
            .eq("album_id", albumId);

        if (fetchError) {
            throw fetchError;
        }

        // Get the existing talent IDs
        const existingTalentIds = existingTalents.map((t) => t.talent_id);

        // Find talents to insert (those in selected but not in existing)
        const talentsToInsert = talentIds.filter(
            (id) => !existingTalentIds.includes(id)
        );

        // Find talents to delete (those in existing but not in selected)
        const talentsToDelete = existingTalentIds.filter(
            (id) => !talentIds.includes(id)
        );

        // Step 3: Insert new talents
        if (talentsToInsert.length > 0) {
            const { error: insertError } = await supabase
                .from("album_talent")
                .insert(
                    talentsToInsert.map((talentId) => ({
                        album_id: albumId,
                        talent_id: talentId,
                    }))
                );

            if (insertError) {
                throw insertError;
            }
        }

        // Step 4: Delete removed talents
        if (talentsToDelete.length > 0) {
            const { error: deleteError } = await supabase
                .from("album_talent")
                .delete()
                .in("talent_id", talentsToDelete)
                .eq("album_id", albumId);

            if (deleteError) {
                throw deleteError;
            }
        }

        return { yugioh_card: albumData, updatedTalents: talentIds };
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
        console.error(`Error deleting yugioh card with ID ${id}:`, err);
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
        console.error("Error counting albums:", err);
        return { error: err.message };
    }
};
