import { supabase } from "../supabase";
export const getAlbumsWithPaging = async (
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
            .from("album")
            .select("*, album_talent(talent(*)), discography(count)", {
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

        const formattedAlbums = data.map((album) => ({
            ...album,
            talents: album.album_talent?.map((at) => at.talent?.name) || [],
            discography_count: album.discography.length
                ? album.discography[0].count
                : 0,
        }));

        return {
            items: formattedAlbums,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getAlbums = async () => {
    try {
        const { data, error } = await supabase.from("album").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error fetching albums:", err);
        return { error: err.message };
    }
};

export const getAlbumById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("album")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching album with ID ${id}:`, err);
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
            album: albumData,
            talents: talentData,
        };
    } catch (err) {
        console.error("Error creating album:", err);
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
            throw albumError;
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

        return { album: albumData, updatedTalents: talentIds };
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteAlbum = async (id) => {
    try {
        const { data, error } = await supabase
            .from("album")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting album with ID ${id}:`, err);
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
            throw talentError;
        }

        // Delete from discography
        const { error: discographyError } = await supabase
            .from("discography")
            .delete()
            .eq("album_id", albumId);

        if (discographyError) {
            throw discographyError;
        }

        // Finally, delete from album
        const { error: albumError } = await supabase
            .from("album")
            .delete()
            .eq("id", albumId);

        if (albumError) {
            throw albumError;
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
            throw error;
        }
        return count;
    } catch (err) {
        console.error("Error counting albums:", err);
        return { error: err.message };
    }
};
