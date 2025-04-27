import { supabase } from "../supabase";

export const getMessages = async () => {
    try {
        let query = supabase.from("message").select("*", { count: "exact" });

        const { data, count, error } = await query;

        if (error) {
            return { error: error.message };
        }

        return {
            items: data,
        };
    } catch (err) {
        return { error: err.message };
    }
};
export const getMessagesById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("message")
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

export const createMessage = async (newMessage) => {
    try {
        const { data, error } = await supabase
            .from("message")
            .insert(newMessage)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateMessage = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("message")
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

export const deleteMessage = async (id) => {
    try {
        const { data, error } = await supabase
            .from("message")
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

export const countMessageRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("message")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
