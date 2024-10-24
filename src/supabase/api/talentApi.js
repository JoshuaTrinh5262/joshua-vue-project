import { supabase } from "../supabase";

export const getTalentsWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = ""
) => {
    try {
        const start = (page - 1) * pageSize;
        const queryLimit = `LIMIT ${pageSize} OFFSET ${start}`;

        // Construct dynamic SQL query
        let query = `
            SELECT 
                talent.id AS id,
                talent.name AS name,
                talent.original_name AS original_name,
                talent.debut_date AS debut_date,
                talent.talent_status AS talent_status,
                agency.id AS agency_id,
                agency.agency_name AS agency,
                COUNT(DISTINCT at.album_id) AS album_count,
                COUNT(DISTINCT dt.discography_id) AS discography_count
            FROM 
                talent
            LEFT JOIN 
                album_talent at ON talent.id = at.talent_id
            LEFT JOIN 
                discography_talent dt ON talent.id = dt.talent_id
            LEFT JOIN 
                agency ON talent.agency_id = agency.id
        `;

        // Apply search filter if needed
        if (search) {
            query += ` WHERE talent.name ILIKE '%${search}%' OR talent.original_name ILIKE '%${search}%'`;
        }

        // Add GROUP BY, ORDER BY, and pagination
        query += `
            GROUP BY talent.id, agency.id, agency.agency_name
            ORDER BY talent.${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute dynamic query using Supabase RPC function
        const { data, error } = await supabase.rpc("execute_dynamic_query", { query });

        if (error) {
            throw error;
        }

        // Fetch total item count for pagination
        const countQuery = `
            SELECT COUNT(*) AS total_count
            FROM talent
        `;
        const { data: countData, error: countError } = await supabase.rpc("execute_dynamic_query", { query: countQuery });

        if (countError) {
            throw countError;
        }

        const totalItems = countData[0]?.total_count || 0;

        return {
            items: data,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    } catch (err) {
        console.error("Error fetching talents:", err);
        return { error: err.message };
    }
};

export const getTalents = async () => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .select("id, name")
            .order("name", { ascending: true });
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error fetching talents:", err);
        return { error: err.message };
    }
};

export const getTalentById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .select("*, agency(*)")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error fetching talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createTalent = async (talent) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .insert(talent)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error creating talent:", err);
        return { error: err.message };
    }
};

export const updateTalent = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .update(updateData)
            .eq("id", updateData.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteTalent = async (id) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting talent with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countTalentRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("talent")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error("Error counting talents:", err);
        return { error: err.message };
    }
};
