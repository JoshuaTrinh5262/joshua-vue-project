import { supabase } from "../supabase";

export const getEventsWithPaging = async (
    page,
    pageSize,
    orderBy,
    orderDirection,
    search = "",
    TalentId = ""
) => {
    try {
        const start = (page - 1) * pageSize;
        const queryLimit = `LIMIT ${pageSize} OFFSET ${start}`;

        let query = `
            SELECT 
                event.id,
                event.event_title,
                event.event_summary,
                event.event_hashtag,
                event.event_date,
                event.event_status,
                ARRAY_AGG(DISTINCT jsonb_build_object('id', talent.id, 'name', talent.name)) AS event_talent
            FROM event
            LEFT JOIN event_talent ON event.id = event_talent.event_id
            LEFT JOIN talent ON talent.id = event_talent.talent_id
        `;

        // Filter conditions
        let conditions = [];

        if (search) {
            conditions.push(`
                event.event_title ILIKE '%${search}%' OR 
                event.event_summary ILIKE '%${search}%' OR 
                event.event_hashtag ILIKE '%${search}%'
            `);
        }

        if (TalentId) {
            conditions.push(`event_talent.talent_id = '${TalentId}'`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        query += `
            GROUP BY event.id
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute query
        const { data, error } = await supabase.rpc("execute_dynamic_query", { query });
        if (error) return { error: error.message };

        // Count query with discography_talent join included
        let countQuery = `
            SELECT COUNT(DISTINCT event.id) AS total_count
            FROM event
            LEFT JOIN event_talent ON event.id = event_talent.event_id
            LEFT JOIN talent ON talent.id = event_talent.talent_id
        `;

        if (conditions.length > 0) {
            countQuery += ` WHERE ` + conditions.join(" AND ");
        }

        const { data: countData, error: countError } = await supabase.rpc("execute_dynamic_query", {
            query: countQuery,
        });

        if (countError) return { error: countError.message };

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
        const { error: eventTalentError } = await supabase
            .from("event_talent")
            .delete()
            .eq("event_id", id);
        if (eventTalentError) {
            throw new Error(`Failed to delete event_talent: ${eventTalentError.message}`);
        }

        const { data, error: eventError } = await supabase
            .from("event")
            .delete()
            .eq("id", id);
        if (eventError) {
            throw new Error(`Failed to delete event: ${eventError.message}`);
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
