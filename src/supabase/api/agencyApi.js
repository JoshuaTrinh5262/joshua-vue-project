import { supabase } from "../supabase";

// export const getAgenciesWithPaging = async (
//     page,
//     pageSize,
//     orderBy,
//     orderDirection,
//     search = ""
// ) => {
//     try {
//         const start = (page - 1) * pageSize;
//         const end = start + pageSize - 1;

//         let query = supabase
//             .from("agency")
//             .select("*, talent(count)", { count: "exact" })
//             .order(orderBy, { ascending: orderDirection === "asc" })
//             .range(start, end);

//         if (search) {
//             query = query.or(`agency_name.ilike.%${search}%`);
//         }

//         const { data, count, error } = await query;

//         if (error) {
//             throw error;
//         }
//         const agencies = data.map((agency) => ({
//             ...agency,
//             talent_count: agency.talent.length ? agency.talent[0].count : 0,
//         }));
//         return {
//             items: agencies,
//             totalItems: count,
//             totalPages: Math.ceil(count / pageSize),
//         };
//     } catch (err) {
//         return { error: err.message };
//     }
// };

export const getAgenciesWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = ""
) => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        // Construct SQL query dynamically
        let query = `
            SELECT 
                agency.id AS id,
                agency.agency_name AS agency_name,
                agency.agency_status AS agency_status,
                agency.agency_description AS agency_description,
                COUNT(talent.id) AS talent_count
            FROM 
                agency
            LEFT JOIN 
                talent ON talent.agency_id = agency.id
        `;

        // Add search condition if applicable
        if (search) {
            query += ` WHERE agency_name ILIKE '%${search}%'`;
        }

        // Add ordering clause
        query += `
            GROUP BY agency.id, agency.agency_name, talent.agency_id
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
        `;

        // Add limit and offset for pagination
        query += `
            LIMIT ${pageSize}
            OFFSET ${start}
        `;

        // Execute the query via the RPC function
        const { data, error } = await supabase.rpc('execute_dynamic_query', {
            query,
        });

        // Fetch the total count for pagination
        const countQuery = `
            SELECT COUNT(*) FROM agency
        `;
        const { data: countData, error: countError } = await supabase.rpc('execute_dynamic_query', {
            query: countQuery,
        });

        if (error || countError) {
            throw error || countError;
        }

        const totalItems = countData[0].count;
        return {
            items: data,
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};


export const getAgencies = async () => {
    try {
        const { data, error } = await supabase.from("agency").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error fetching agencies:", err);
        return { error: err.message };
    }
};

export const getAgencyById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("agency")
            .select("*,talent(*)")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        const talentCount = data.talent ? data.talent.length : 0;

        return { ...data, talentCount };
    } catch (err) {
        console.error(`Error fetching agency with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const createAgency = async (agency) => {
    try {
        const { data, error } = await supabase
            .from("agency")
            .insert(agency)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error creating agency:", err);
        return { error: err.message };
    }
};

export const updateAgency = async (update) => {
    try {
        const { data, error } = await supabase
            .from("agency")
            .update(update)
            .eq("id", update.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error updating agency with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const deleteAgency = async (id) => {
    try {
        const { data, error } = await supabase
            .from("agency")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error(`Error deleting agency with ID ${id}:`, err);
        return { error: err.message };
    }
};

export const countAgencyRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("agency")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        console.error("Error counting agencies:", err);
        return { error: err.message };
    }
};
