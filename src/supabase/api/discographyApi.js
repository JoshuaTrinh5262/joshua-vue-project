import { supabase } from "../supabase";

export const getDiscographiesWithPaging = async (
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
            .from("discography")
            .select("*, album(id,name), discography_talent(talent(id, name))", {
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

        const discographies = data.map((discography) => ({
            ...discography,
            album: discography.album?.name,
            talents:
                discography.discography_talent?.map((et) => et.talent?.name) ||
                [],
        }));

        return {
            items: discographies,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getDiscographies = async () => {
    try {
        const { data, error } = await supabase.from("discography").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error fetching discographies:", err);
        return { error: err.message };
    }
};

export const getDiscographyById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("discography")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching discography with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createDiscography = async (discography, selectedTalents) => {
    try {
        const { data: discographyData, error: discographyError } =
            await supabase
                .from("discography")
                .insert(discography)
                .select("*")
                .single();

        if (discographyError) {
            throw discographyError;
        }

        const discographyTalentRecords = selectedTalents.map((talent) => ({
            discography_id: discographyData.id,
            talent_id: talent.id,
        }));

        const { data: talentData, error: talentError } = await supabase
            .from("discography_talent")
            .insert(discographyTalentRecords);

        if (talentError) {
            throw talentError;
        }

        return {
            discography: discographyData,
            talents: talentData,
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const updateDiscography = async (updateData, selectedTalents) => {
    try {
        const { data: discographyData, error: discographyError } =
            await supabase
                .from("discography")
                .update(updateData)
                .eq("id", updateData.id)
                .single();

        if (discographyError) {
            throw discographyError;
        }

        // Step 2: Handle discography_talent updates
        const discographyId = updateData.id;

        // Convert selected talents to an array of talent_id
        const talentIds = selectedTalents.map((talent) => talent.id);

        // Fetch existing discography_talent entries for the discography
        const { data: existingTalents, error: fetchError } = await supabase
            .from("discography_talent")
            .select("talent_id")
            .eq("discography_id", discographyId);

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
                .from("discography_talent")
                .insert(
                    talentsToInsert.map((talentId) => ({
                        discography_id: discographyId,
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
                .from("discography_talent")
                .delete()
                .in("talent_id", talentsToDelete)
                .eq("discography_id", discographyId);

            if (deleteError) {
                throw deleteError;
            }
        }

        return { discography: discographyData, updatedTalents: talentIds };
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteDiscography = async (id) => {
    try {
        const { error: discographyTalentError } = await supabase
            .from("discography_talent")
            .delete()
            .eq("discography_id", id);
        if (discographyTalentError) {
            throw new Error(
                `Failed to delete discography_talent: ${discographyTalentError.message}`
            );
        }

        const { data, error: discographyError } = await supabase
            .from("discography")
            .delete()
            .eq("id", id);
        if (discographyError) {
            throw new Error(`Failed to delete discography: ${discographyError.message}`);
        }

        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countDiscographyRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("discography")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error("Error counting discographies:", err);
        return { error: err.message };
    }
};
