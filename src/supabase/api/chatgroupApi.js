import { supabase } from "../supabase";

export const getChatgroupsWithMessage = async () => {
    try {
        let query = supabase
            .from("chatgroup")
            .select("*,message(*)", { count: "exact" });

        const { data, count, error } = await query;

        if (error) {
            throw error;
        }

        return {
            items: data,
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getChatgroupsWithMessageById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("chatgroup")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const createChatgroup = async (chatgroup) => {
    try {
        const { data, error } = await supabase
            .from("chatgroup")
            .insert(chatgroup)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateChatgroup = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("chatgroup")
            .update(updateData)
            .eq("id", updateData.id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const deleteChatgroup = async (id) => {
    try {
        const { data, error } = await supabase
            .from("chatgroup")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const countChatgroupRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("chatgroup")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
