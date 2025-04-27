import { supabase } from "../supabase";

export const getDatasets = async (
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
            .from("dataset")
            .select("id, source_text, target_text, source, category")
            .order(orderBy, { ascending: orderDirection === "asc" })
            .range(start, end);

        if (search) {
            query = query.or(
                `source_text.ilike.%${search}%,target_text.ilike.%${search}%`
            );
        }

        const { data, error } = await query;

        if (error) {
            return 0;
        }

        return data;
    } catch (err) {
        return 0;
    }
};

export const getCountDataset = async (search) => {
    try {
        let query = `
            SELECT
                COUNT(id)
            FROM 
                dataset
        `;

        if (search) {
            query += `
                WHERE 
                    lower(source_text) LIKE '%${search.toLowerCase()}%' 
                    OR lower(target_text) LIKE '%${search.toLowerCase()}%'
        `;
        }
        query += `LIMIT 1`;

        const { data, error } = await supabase.rpc("execute_dynamic_query", {
            query,
        });

        if (error) {
            return { error: error };
        }

        return data[0].count;
    } catch (err) {
        return { error: err.message };
    }
};

export const getDatasetById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("dataset")
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

export const createDataset = async (dataset) => {
    try {
        const { data, error } = await supabase
            .from("dataset")
            .insert(dataset)
            .single();
        if (error) {
            return { error: error.message };
        }
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const updateDataset = async (updateData) => {
    try {
        const { data, error } = await supabase
            .from("dataset")
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

export const deleteDataset = async (id) => {
    try {
        const { data, error } = await supabase
            .from("dataset")
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

export const countDatasetRecord = async () => {
    try {
        const { count, error } = await supabase
            .from("dataset")
            .select("*", { count: "exact", head: true });
        if (error) {
            return { error: error.message };
        }
        return count;
    } catch (err) {
        return { error: err.message };
    }
};

const convertToCSV = (data) => {
    const escapeValue = (value) => {
        if (typeof value === "string") {
            const escaped = value.replace(/"/g, '""');
            return `"${escaped}"`;
        }
        return value;
    };

    const headers = Object.keys(data[0]).map(escapeValue).join(",") + "\n";

    const rows = data
        .map((item) => {
            return Object.values(item).map(escapeValue).join(",");
        })
        .join("\n");

    return headers + rows;
};

// Helper function to parse CSV
const parseCSV = (csv) => {
    const [headerLine, ...rows] = csv.split("\n");
    const headers = headerLine.split(",");
    return rows.map((row) => {
        const values = row.split(",");
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });
};

// Function to export data from Supabase to CSV
export const exportDataset = async (
    fileName,
    sourceTextMaxLength,
    targetTextMaxLength
) => {
    try {
        let query = `
            SELECT
                source_text,
                target_text
            FROM 
                dataset
            WHERE 
                (array_length(regexp_split_to_array(source_text, '\\s+'), 1) <= ${sourceTextMaxLength})
                AND
                (array_length(regexp_split_to_array(target_text, '\\s+'), 1) <= ${targetTextMaxLength})
        `;
        const { data, error } = await supabase.rpc("execute_dynamic_query", {
            query,
        });

        if (error) {
            return { error: error.message };
        }

        // Convert data to CSV
        const csvData = convertToCSV(data);

        // Create a blob and initiate download
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            fileName ? `${fileName}.csv` : "export.csv"
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { success: true, message: "Export successful" };
    } catch (error) {
        return {
            success: false,
            message: `Error exporting data: ${error.message}`,
        };
    }
};

// Function to import data into Supabase from a file
export const importDataset = async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
        const fileContent = fileReader.result;

        // Parse JSON/CSV content based on file extension
        let parsedData;
        if (file.name.endsWith(".csv")) {
            parsedData = parseCSV(fileContent);
        } else if (file.name.endsWith(".json")) {
            parsedData = JSON.parse(fileContent);
        }

        if (parsedData) {
            try {
                // Insert parsed data into Supabase
                const { error } = await supabase
                    .from("your_table_name")
                    .insert(parsedData);

                if (error) {
                    return { error: error.message };
                }
            } catch (error) {
                return { error: error.message };
            }
        }
    };

    // Read the file content as text
    fileReader.readAsText(file);
};
