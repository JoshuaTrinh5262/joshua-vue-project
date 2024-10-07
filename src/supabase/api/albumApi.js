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
            .select("*, album_talent(talent(*)), discography(count)", { count: "exact" })
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
            discography_count: album.discography.length ? album.discography[0].count : 0,
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
            .select("*, discography(*)")
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

export const updateAlbum = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("album")
            .update(updateData)
            .eq("id", updateData.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating album with ID ${id}:`, err);
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
