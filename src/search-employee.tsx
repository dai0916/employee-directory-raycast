import { useState, useEffect } from "react";
import {
  Action,
  ActionPanel,
  List,
  showToast,
  Toast,
  getPreferenceValues,
  Clipboard,
  Icon,
} from "@raycast/api";
import Fuse from "fuse.js";
import { Employee, Preferences } from "./types";
import { loadEmployeeData, shouldSync } from "./utils";
import { syncFromGoogleSheets } from "./google-sheets";

export default function SearchEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncStatus, setLastSyncStatus] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const preferences = getPreferenceValues<Preferences>();

  const fuse = new Fuse(employees, {
    keys: [
      { name: "employeeId", weight: 0.4 },
      { name: "nameJa", weight: 0.3 },
      { name: "nameEn", weight: 0.3 },
      { name: "nickname", weight: 0.2 },
      { name: "email", weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const results = fuse.search(searchText);
      setFilteredEmployees(results.map((result) => result.item));
    }
  }, [searchText, employees]);

  useEffect(() => {
    if (filteredEmployees.length > 0 && !selectedEmployee) {
      setSelectedEmployee(filteredEmployees[0]);
    }
  }, [filteredEmployees]);

  async function loadData() {
    try {
      setIsLoading(true);

      // Check if auto-sync is needed
      const autoSyncInterval = parseInt(preferences.autoSyncInterval);
      if (
        shouldSync(preferences.dataSourcePath, autoSyncInterval) &&
        preferences.googleSheetsId &&
        preferences.serviceAccountKeyPath
      ) {
        setLastSyncStatus("Syncing...");
        try {
          await syncFromGoogleSheets();
          setLastSyncStatus("Synced successfully");
        } catch (error) {
          console.error("Auto-sync failed:", error);
          setLastSyncStatus("Sync failed, using local data");
          showToast({
            style: Toast.Style.Failure,
            title: "Auto-sync failed",
            message: "Using local data. Check your Google Sheets configuration.",
          });
        }
      } else {
        const data = loadEmployeeData(preferences.dataSourcePath);
        if (data.lastUpdated) {
          const lastUpdate = new Date(data.lastUpdated);
          setLastSyncStatus(`Last updated: ${lastUpdate.toLocaleString()}`);
        } else {
          setLastSyncStatus("Using local data");
        }
      }

      const data = loadEmployeeData(preferences.dataSourcePath);
      let filteredData = data.employees;

      if (!preferences.showInactiveEmployees) {
        filteredData = filteredData.filter((emp) => emp.status === "active");
      }

      setEmployees(filteredData);
      setFilteredEmployees(filteredData);
    } catch (error) {
      console.error("Error loading data:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      showToast({
        style: Toast.Style.Failure,
        title: "Error loading employee data",
        message: errorMessage,
      });
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function copyToClipboard(text: string, label: string) {
    await Clipboard.copy(text);
    showToast({
      style: Toast.Style.Success,
      title: `${label} copied`,
      message: text,
    });
  }

  const generateDetailMarkdown = (employee: Employee) => {
    return `**${employee.nameJa}（${employee.nameEn} / ${employee.nickname}）**

- 社員番号: \`${employee.employeeId}\`
- メールアドレス: \`${employee.email}\`
- 雇用形態: \`${employee.employmentType}\`
- 入社日: \`${employee.joinDate}\`
- 在籍ステータス: ${employee.status === "active" ? "在籍中 🟢" : "退職済み 🔴"}`;
  };

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search by employee ID, name, nickname, or email..."
      throttle
      isShowingDetail={!!selectedEmployee}
      onSelectionChange={(id) => {
        if (id) {
          const employee = filteredEmployees.find((emp) => emp.employeeId === id);
          if (employee) {
            setSelectedEmployee(employee);
          }
        }
      }}
    >
      {lastSyncStatus && (
        <List.Section title="Sync Status">
          <List.Item title={lastSyncStatus} icon={Icon.Cloud} />
        </List.Section>
      )}

      <List.Section title={`Employees (${filteredEmployees.length})`}>
        {filteredEmployees.map((employee) => (
          <List.Item
            key={employee.employeeId}
            id={employee.employeeId}
            title={`${employee.nameJa}（${employee.nameEn} / ${employee.nickname}）- ${employee.email}`}
            accessories={[
              { text: employee.employmentType },
              { text: employee.status === "active" ? "🟢" : "🔴" },
            ]}
            detail={
              selectedEmployee?.employeeId === employee.employeeId ? (
                <List.Item.Detail markdown={generateDetailMarkdown(employee)} />
              ) : undefined
            }
            actions={
              selectedEmployee?.employeeId === employee.employeeId ? (
                <ActionPanel>
                  <Action
                    title="Copy Email"
                    onAction={() => copyToClipboard(employee.email, "Email")}
                    icon={Icon.Clipboard}
                  />
                  <Action
                    title="Copy Employee Id"
                    onAction={() => copyToClipboard(employee.employeeId, "Employee ID")}
                    icon={Icon.Clipboard}
                  />
                  <Action
                    title="Copy Japanese Name"
                    onAction={() => copyToClipboard(employee.nameJa, "Japanese Name")}
                    icon={Icon.Clipboard}
                  />
                  <Action
                    title="Copy English Name"
                    onAction={() => copyToClipboard(employee.nameEn, "English Name")}
                    icon={Icon.Clipboard}
                  />
                  <Action
                    title="Refresh Data"
                    onAction={loadData}
                    icon={Icon.ArrowClockwise}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                  />
                </ActionPanel>
              ) : (
                <ActionPanel>
                  <Action
                    title="Copy Email"
                    onAction={() => copyToClipboard(employee.email, "Email")}
                    icon={Icon.Clipboard}
                  />
                </ActionPanel>
              )
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
