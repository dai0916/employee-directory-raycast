export interface Employee {
  employeeId: string;
  nameJa: string;
  nameEn: string;
  nickname: string;
  email: string;
  employmentType: string;
  joinDate: string;
  status: "active" | "inactive";
}

export interface EmployeeData {
  employees: Employee[];
  lastUpdated?: string;
}

export interface Preferences {
  dataSourcePath: string;
  googleSheetsId: string;
  serviceAccountKeyPath: string;
  autoSyncInterval: string;
  showInactiveEmployees: boolean;
}
