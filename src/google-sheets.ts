import { google } from "googleapis";
import { readFileSync, existsSync } from "fs";
import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { Employee, EmployeeData, Preferences } from "./types";
import { expandPath, saveEmployeeData } from "./utils";

export async function syncFromGoogleSheets(): Promise<void> {
  const preferences = getPreferenceValues<Preferences>();

  // Check if Google Sheets configuration is available
  if (!preferences.googleSheetsId || !preferences.serviceAccountKeyPath) {
    throw new Error("Google Sheets configuration is not set up. Please configure Google Sheets ID and Service Account Key Path in preferences.");
  }

  try {
    // Load service account credentials
    const serviceAccountPath = expandPath(preferences.serviceAccountKeyPath);
    
    if (!existsSync(serviceAccountPath)) {
      throw new Error(`Service account key file not found: ${serviceAccountPath}`);
    }
    
    let credentials;
    try {
      const credentialsData = readFileSync(serviceAccountPath, "utf-8");
      credentials = JSON.parse(credentialsData);
    } catch (error) {
      throw new Error(`Failed to read or parse service account key file: ${error}`);
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: preferences.googleSheetsId,
      range: "A:H", // Assuming columns A-H contain the employee data
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      throw new Error("No data found in the spreadsheet");
    }

    // Skip header row and convert to Employee objects
    const employees: Employee[] = rows
      .slice(1)
      .map((row, index) => {
        if (row.length < 8) {
          console.warn(`Row ${index + 2} has insufficient data, skipping`);
          return null;
        }

        return {
          employeeId: row[0] || "",
          nameJa: row[1] || "",
          nameEn: row[2] || "",
          nickname: row[3] || "",
          email: row[4] || "",
          employmentType: row[5] || "",
          joinDate: row[6] || "",
          status: (row[7]?.toLowerCase() === "active"
            ? "active"
            : "inactive") as "active" | "inactive",
        };
      })
      .filter((employee): employee is Employee => employee !== null);

    // Save to local JSON file
    const employeeData: EmployeeData = {
      employees,
      lastUpdated: new Date().toISOString(),
    };

    saveEmployeeData(preferences.dataSourcePath, employeeData);

    showToast({
      style: Toast.Style.Success,
      title: "Sync completed",
      message: `Updated ${employees.length} employee records`,
    });
  } catch (error) {
    console.error("Google Sheets sync error:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    showToast({
      style: Toast.Style.Failure,
      title: "Sync failed",
      message: errorMessage,
    });

    throw error;
  }
}
