import { supabase } from "../supabase";

export const getAlbumsWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = "",
    TalentId = "",
    AlbumType = ""
) => {
    try {
        const start = (page - 1) * pageSize;
        const queryLimit = `LIMIT ${pageSize} OFFSET ${start}`;

        let query = `
            SELECT 
                album.id,
                album.name,
                album.album_type,
                album.released_date,
                ARRAY_AGG(DISTINCT jsonb_build_object('id', talent.id, 'name', talent.name)) AS album_talent
            FROM album
            LEFT JOIN album_talent ON album.id = album_talent.album_id
            LEFT JOIN talent ON talent.id = album_talent.talent_id
        `;

        // Filter conditions
        let conditions = [];

        if (search) {
            conditions.push(`
                album.name ILIKE '%${search}%'
            `);
        }

        if (AlbumType) {
            conditions.push(`album.album_type = '${AlbumType}'`);
        }

        if (TalentId) {
            if (TalentId) {
                conditions.push(`
                    album.id IN (
                        SELECT album_id
                        FROM album_talent
                        WHERE talent_id = '${TalentId}'
                    )
                `);
            }
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        query += `
            GROUP BY album.id
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute query
        const { data, error } = await supabase.rpc("execute_dynamic_query", {
            query,
        });

        if (error) {
            return { error: error.message };
        }

        // Count query with discography_talent join included
        let countQuery = `
            SELECT COUNT(DISTINCT album.id) AS total_count
            FROM album
            LEFT JOIN album_talent ON album.id = album_talent.album_id
            LEFT JOIN talent ON talent.id = album_talent.talent_id
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

export const getAlbums = async () => {
    try {
        const { data, error } = await supabase.from("album").select("*");
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getAlbumById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("album")
            .select("*, tracklist(*)")
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

export const createAlbum = async (album, selectedTalents) => {
    try {
        const { data: albumData, error: albumError } = await supabase
            .from("album")
            .insert(album)
            .select("*")
            .single();
        if (albumError) {
            return { error: albumError.message };
        }

        const albumTalentRecords = selectedTalents.map((talent) => ({
            album_id: albumData.id,
            talent_id: talent.id,
        }));
        const { data: talentData, error: talentError } = await supabase
            .from("album_talent")
            .insert(albumTalentRecords);

        if (talentError) {
            return { error: talentError.message };
        }

        return {
            album: albumData,
            talents: talentData,
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const updateAlbum = async (updateData, selectedTalents) => {
    try {
        const { data: albumData, error: albumError } = await supabase
            .from("album")
            .update(updateData)
            .eq("id", updateData.id)
            .single();

        if (albumError) {
            return { error: albumError.message };
        }

        // Step 2: Handle album_talent updates
        const albumId = updateData.id;

        // Convert selected talents to an array of talent_id
        const talentIds = selectedTalents.map((talent) => talent.id);

        // Fetch existing album_talent entries for the album
        const { data: existingTalents, error: fetchError } = await supabase
            .from("album_talent")
            .select("talent_id")
            .eq("album_id", albumId);

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
                .from("album_talent")
                .insert(
                    talentsToInsert.map((talentId) => ({
                        album_id: albumId,
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
                .from("album_talent")
                .delete()
                .in("talent_id", talentsToDelete)
                .eq("album_id", albumId);

            if (deleteError) {
                return { error: deleteError.message };
            }
        }

        return { album: albumData, updatedTalents: talentIds };
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteAlbum = async (id) => {
    try {
        const { error: albumTalentError } = await supabase
            .from("album_talent")
            .delete()
            .eq("album_id", id);

        if (albumTalentError) {
            return { error: albumTalentError.message };
        }

        const { error: albumTracklistError } = await supabase
            .from("tracklist")
            .delete()
            .eq("album_id", id);

        if (albumTracklistError) {
            return { error: albumTracklistError.message };
        }

        const { data, error: albumError } = await supabase
            .from("album")
            .delete()
            .eq("id", id);

        if (albumError) {
            return { error: albumError.message };
        }

        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteAlbumWithRelations = async (albumId) => {
    try {
        // Delete from album_talent
        const { error: talentError } = await supabase
            .from("album_talent")
            .delete()
            .eq("album_id", albumId);

        if (talentError) {
            return { error: talentError.message };
        }

        // Delete from discography
        const { error: discographyError } = await supabase
            .from("discography")
            .delete()
            .eq("album_id", albumId);

        if (discographyError) {
            return { error: discographyError.message };
        }

        // Finally, delete from album
        const { error: albumError } = await supabase
            .from("album")
            .delete()
            .eq("id", albumId);

        if (albumError) {
            return { error: albumError.message };
        }

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

export const countAlbumRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("album")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateAlbumTracklist = async (albumId, tracklist) => {
    if (!albumId || !Array.isArray(tracklist)) {
        return { error: "Invalid album Id or tracklist format" };
    }
    try {
        // Step 1: Delete old tracklist for this album
        const { error: deleteError } = await supabase
            .from("tracklist")
            .delete()
            .eq("album_id", albumId);

        if (deleteError) {
            return { error: deleteError.message };
        }

        // Step 2: Insert new tracklist
        const tracklistWithAlbumId = tracklist.map((track) => ({
            order: track.order,
            version: track.version,
            discography_id: track.discography_id,
            album_id: albumId,
        }));

        const { data, error: insertError } = await supabase
            .from("tracklist")
            .insert(tracklistWithAlbumId);

        if (insertError) {
            return { error: insertError.message };
        }

        return true;
    } catch (err) {
        return { error: err.message };
    }
};
