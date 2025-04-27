import { supabase } from "../supabase";

export const getTasksWithPaging = async (
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
                task.id AS id,
                task.title AS title,
                task.description AS description,
                task.task_priority AS task_priority,
                task.task_status AS task_status,
                task.assigned_to AS assigned_to,
                task.created_at AS created_at,
            FROM 
                task
        `;

        // Apply search filter if needed
        if (search) {
            query += ` WHERE task.title ILIKE '%${search}%'`;
        }

        // Add GROUP BY, ORDER BY, and pagination
        query += `
            GROUP BY task.id, task.title
            ORDER BY ${orderBy} ${orderDirection === "asc" ? "ASC" : "DESC"}
            ${queryLimit}
        `;

        // Execute dynamic query using Supabase RPC function
        const { data, error } = await supabase.rpc("execute_dynamic_query", {
            query,
        });

        if (error) {
            return { error: error.message };
        }

        // Fetch total item count for pagination
        const countQuery = `
            SELECT COUNT(*) AS total_count
            FROM task
        `;
        const { data: countData, error: countError } = await supabase.rpc(
            "execute_dynamic_query",
            { query: countQuery }
        );

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

export const getTasks = async () => {
    try {
        const { data, error } = await supabase.from("task").select("*");

        if (error) {
            return { error: error.message };
        }
        const columnsData = [
            { status: "to_do", tasks: [] },
            { status: "in_progress", tasks: [] },
            { status: "review", tasks: [] },
            { status: "testing", tasks: [] },
            { status: "completed", tasks: [] },
        ];

        data.forEach((task) => {
            const statusColumn = columnsData.find(
                (column) => column.status === task.status
            );
            if (statusColumn) {
                statusColumn.tasks.push(task);
            }
        });

        return columnsData;
    } catch (err) {
        return { error: err.message };
    }
};

export const getTaskById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("task")
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

export const createTask = async (task) => {
    try {
        const { data, error } = await supabase
            .from("task")
            .insert(task)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateTask = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("task")
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

export const deleteTask = async (id) => {
    try {
        const { data, error } = await supabase
            .from("task")
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

export const countTaskRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("task")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};
