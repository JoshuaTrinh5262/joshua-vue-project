import { supabase } from "../supabase";

export const getEvents = async (page, pageSize, orderBy, orderDirection, search = '') => {
    try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        let query = supabase
            .from('event')
            .select('*', { count: 'exact' })
            .order(orderBy, { ascending: orderDirection === 'asc' })
            .range(start, end);

        if (search) {
            query = query.or(
                `event_title.ilike.%${search}%,event_summary.ilike.%${search}%,event_hashtag.ilike.%${search}%`
            );
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

export const getEventById = async (id) => {
    try {
        const { data, error } = await supabase.from('event').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const createEvent = async (event) => {
    try {
        const { data, error } = await supabase.from('event').insert(event).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateEvent = async (id, updates) => {
    try {
        const { data, error } = await supabase.from('event').update(updates).eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteEvent = async (id) => {
    try {
        const { data, error } = await supabase.from('event').delete().eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countEventRecord = async () => {
    try {
        const { count, error } = await supabase.from('event').select('*', { count: 'exact', head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
