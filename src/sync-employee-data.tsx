import { showToast, Toast } from "@raycast/api";
import { syncFromGoogleSheets } from "./google-sheets";

export default async function SyncEmployeeData() {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Syncing employee data...",
    });

    await syncFromGoogleSheets();
  } catch (error) {
    console.error("Sync command error:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    await showToast({
      style: Toast.Style.Failure,
      title: "Sync failed",
      message: errorMessage,
    });
  }
}