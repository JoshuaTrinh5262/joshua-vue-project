import { supabase } from "../supabase";

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

        let query = supabase
            .from("agency")
            .select("*, talent(count)", { count: "exact" })
            .order(orderBy, { ascending: orderDirection === "asc" })
            .range(start, end);

        if (search) {
            query = query.or(`agency_name.ilike.%${search}%`);
        }

        const { data, count, error } = await query;

        if (error) {
            throw error;
        }
        const agencies = data.map((agency) => ({
            ...agency,
            talent_count: agency.talent.length ? agency.talent[0].count : 0,
        }));
        return {
            items: agencies,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
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
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
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
