import { supabase } from "../supabase";

export const getTalentsWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = "",
    AgencyId,
    TalentStatus
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
                talent.retirement_date AS retirement_date,
                talent.date_of_birth AS date_of_birth,
                talent.gender AS gender,
                talent.height AS height,
                talent.emoji AS emoji,
                agency.id AS agency_id,
                agency.agency_name AS agency,
                COUNT(album_talent.album_id) AS album_count,
                COUNT(discography_talent.discography_id) AS discography_count
            FROM 
                talent
            LEFT JOIN 
                album_talent ON talent.id = album_talent.talent_id
            LEFT JOIN 
                discography_talent ON talent.id = discography_talent.talent_id
            LEFT JOIN 
                agency ON talent.agency_id = agency.id
        `;
        let conditions = [];

        if (AgencyId) {
            conditions.push(`talent.agency_id = '${AgencyId}'`);
        }

        if (TalentStatus) {
            conditions.push(`talent.talent_status = '${TalentStatus}'`);
        }

        if (search) {
            conditions.push(`(talent.name ILIKE '%${search}%' OR talent.original_name ILIKE '%${search}%')`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        // Add GROUP BY, ORDER BY, and pagination
        query += `
            GROUP BY talent.id, agency.id, agency.agency_name, album_talent.talent_id, discography_talent.talent_id
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute dynamic query using Supabase RPC function
        const { data, error } = await supabase.rpc("execute_dynamic_query", { query });

        if (error) {
            return { error: error.message };
        }

        // Fetch total item count for pagination
        let countQuery = `
            SELECT COUNT(DISTINCT talent.id) AS total_count
            FROM talent
            LEFT JOIN album_talent ON talent.id = album_talent.talent_id
            LEFT JOIN discography_talent ON talent.id = discography_talent.talent_id
            LEFT JOIN agency ON talent.agency_id = agency.id
        `;

        if (conditions.length > 0) {
            countQuery += " WHERE " + conditions.join(" AND ");
        }

        const { data: countData, error: countError } = await supabase.rpc("execute_dynamic_query", { query: countQuery });

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

export const getTalents = async () => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .select("id, name")
            .order("name", { ascending: true });
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getTalentById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .select("*, agency(*), discography(*), album(*), event(*)")
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

export const createTalent = async (talent) => {
    try {
        const { data, error } = await supabase
            .from("talent")
            .insert(talent)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
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
            return { error: error.message };
        }
        return data;
    } catch (err) {
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
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countTalentRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("talent")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
