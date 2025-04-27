import { supabase } from "../supabase";

export const getDiscographiesWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = "",
    TalentId
) => {
    try {
        const start = (page - 1) * pageSize;
        const queryLimit = `LIMIT ${pageSize} OFFSET ${start}`;

        // Base query
        let query = `
            SELECT 
                discography.id AS id,
                discography.name AS name,
                discography.original_name AS original_name,
                discography.released_date AS released_date,
                ARRAY_AGG(talent.name) AS talents
            FROM discography
            LEFT JOIN discography_talent ON discography_talent.discography_id = discography.id
            LEFT JOIN talent ON talent.id = discography_talent.talent_id
        `;

        // Where clause
        let conditions = [];

        if (search) {
            conditions.push(`discography.name ILIKE '%${search}%'`);
        }

        if (TalentId) {
            conditions.push(`discography_talent.talent_id = '${TalentId}'`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        // Grouping, ordering, pagination
        query += `
            GROUP BY discography.id
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute data query
        const { data, error } = await supabase.rpc("execute_dynamic_query", {
            query,
        });

        if (error) {
            return { error: error.message };
        }

        // Count query (same filter, no limit/offset)
        let countQuery = `
            SELECT COUNT(*) AS total_count
            FROM discography
            LEFT JOIN discography_talent ON discography_talent.discography_id = discography.id
            LEFT JOIN talent ON talent.id = discography_talent.talent_id
        `;
        if (conditions.length > 0) {
            countQuery += ` WHERE ` + conditions.join(" AND ");
        }

        const { data: countData, error: countError } = await supabase.rpc(
            "execute_dynamic_query",
            {
                query: countQuery,
            }
        );

        if (countError) {
            return { error: countError.message };
        }

        const totalItems = countData[0]?.total_count || 0;

        return {
            items: data,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getDiscographies = async () => {
    try {
        const { data, error } = await supabase.from("discography").select("*");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
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
            return { error: error.message };
        }
        return data;
    } catch (err) {
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
            return { error: discographyError.message };
        }

        const discographyTalentRecords = selectedTalents.map((talent) => ({
            discography_id: discographyData.id,
            talent_id: talent.id,
        }));

        const { data: talentData, error: talentError } = await supabase
            .from("discography_talent")
            .insert(discographyTalentRecords);

        if (talentError) {
            return { error: talentError.message };
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
            return { error: discographyError.message };
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
            return { error: fetchError.message };
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
                return { error: insertError.message };
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
                return { error: deleteError.message };
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
            return { error: discographyTalentError.message };
        }

        const { data, error: discographyError } = await supabase
            .from("discography")
            .delete()
            .eq("id", id);
        if (discographyError) {
            return { error: discographyError.message };
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
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
