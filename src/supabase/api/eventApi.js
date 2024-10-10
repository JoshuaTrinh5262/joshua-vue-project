import { supabase } from "../supabase";

export const getEventsWithPaging = async (
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
            .from("event")
            .select("*, event_talent(talent(id, name))", { count: "exact" })
            .order(orderBy, { ascending: orderDirection === "asc" })
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

        const formattedEvents = data.map((event) => ({
            ...event,
            talents: event.event_talent?.map((et) => et.talent?.name) || [],
        }));

        return {
            items: formattedEvents,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const getEvents = async () => {
    try {
        const { data, error } = await supabase.from("event").select("*");
        if (error) {
            throw error;
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getEventById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("event")
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

export const createEvent = async (event, selectedTalents) => {
    try {
        const { data: eventData, error: eventError } = await supabase
            .from("event")
            .insert(event)
            .select("*")
            .single();

        if (eventError) {
            throw eventError;
        }

        const eventTalentRecords = selectedTalents.map((talent) => ({
            event_id: eventData.id,
            talent_id: talent.id,
        }));

        const { data: talentData, error: talentError } = await supabase
            .from("event_talent")
            .insert(eventTalentRecords);

        if (talentError) {
            throw talentError;
        }

        return {
            event: eventData,
            talents: talentData,
        };
    } catch (err) {
        return { error: err.message };
    }
};

export const updateEvent = async (updateData, selectedTalents) => {
    try {
        const { data: eventData, error: eventError } = await supabase
            .from("event")
            .update(updateData)
            .eq("id", updateData.id)
            .single();

        if (eventError) {
            throw eventError;
        }

        // Step 2: Handle event_talent updates
        const eventId = updateData.id;

        // Convert selected talents to an array of talent_id
        const talentIds = selectedTalents.map(talent => talent.id);

        // Fetch existing event_talent entries for the event
        const { data: existingTalents, error: fetchError } = await supabase
            .from("event_talent")
            .select("talent_id")
            .eq("event_id", eventId);

        if (fetchError) {
            throw fetchError;
        }

        // Get the existing talent IDs
        const existingTalentIds = existingTalents.map(t => t.talent_id);

        // Find talents to insert (those in selected but not in existing)
        const talentsToInsert = talentIds.filter(id => !existingTalentIds.includes(id));

        // Find talents to delete (those in existing but not in selected)
        const talentsToDelete = existingTalentIds.filter(id => !talentIds.includes(id));

        // Step 3: Insert new talents
        if (talentsToInsert.length > 0) {
            const { error: insertError } = await supabase
                .from("event_talent")
                .insert(talentsToInsert.map(talentId => ({ event_id: eventId, talent_id: talentId })));

            if (insertError) {
                throw insertError;
            }
        }

        // Step 4: Delete removed talents
        if (talentsToDelete.length > 0) {
            const { error: deleteError } = await supabase
                .from("event_talent")
                .delete()
                .in("talent_id", talentsToDelete)
                .eq("event_id", eventId);

            if (deleteError) {
                throw deleteError;
            }
        }

        return { event: eventData, updatedTalents: talentIds };
    } catch (err) {
        return { error: err.message };
    }
};


export const deleteEvent = async (id) => {
    try {
        const { data, error } = await supabase
            .from("event")
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

export const countEventRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("event")
            .select("*", { count: "exact", head: true });
        if (error) {
            throw error;
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
