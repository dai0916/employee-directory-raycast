import { readFileSync, writeFileSync, existsSync } from "fs";
import { homedir } from "os";
import { resolve } from "path";
import { Employee, EmployeeData } from "./types";

export function expandPath(filePath: string): string {
  if (filePath.startsWith("~/")) {
    return resolve(homedir(), filePath.slice(2));
  }
  return resolve(filePath);
}

export function loadEmployeeData(filePath: string): EmployeeData {
  const expandedPath = expandPath(filePath);

  if (!existsSync(expandedPath)) {
    console.warn(`Employee data file not found: ${expandedPath}`);
    return { employees: [] };
  }

  try {
    const data = readFileSync(expandedPath, "utf-8");
    const parsedData = JSON.parse(data) as EmployeeData;
    
    // Validate data structure
    if (!parsedData.employees || !Array.isArray(parsedData.employees)) {
      console.error("Invalid employee data structure: missing or invalid employees array");
      return { employees: [] };
    }
    
    // Validate each employee object
    const validEmployees = parsedData.employees.filter((emp, index) => {
      const requiredFields = ['employeeId', 'nameJa', 'nameEn', 'nickname', 'email'];
      const missingFields = requiredFields.filter(field => !emp[field as keyof Employee]);
      
      if (missingFields.length > 0) {
        console.warn(`Employee at index ${index} missing required fields: ${missingFields.join(', ')}`);
        return false;
      }
      
      return true;
    });
    
    return { 
      employees: validEmployees, 
      lastUpdated: parsedData.lastUpdated 
    };
  } catch (error) {
    console.error("Error loading employee data:", error);
    return { employees: [] };
  }
}

export function saveEmployeeData(filePath: string, data: EmployeeData): void {
  const expandedPath = expandPath(filePath);

  try {
    data.lastUpdated = new Date().toISOString();
    writeFileSync(expandedPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving employee data:", error);
    throw error;
  }
}

export function shouldSync(filePath: string, intervalMinutes: number): boolean {
  if (intervalMinutes === 0) return false; // Manual only

  const data = loadEmployeeData(filePath);
  if (!data.lastUpdated) return true;

  const lastUpdate = new Date(data.lastUpdated);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);

  return diffMinutes >= intervalMinutes;
}

export function formatEmployeeForDisplay(employee: Employee): string {
  return `${employee.nameJa}（${employee.nameEn} / ${employee.nickname}）- ${employee.email}`;
}

export function formatEmployeeAllInfo(employee: Employee): string {
  return `Employee ID: ${employee.employeeId}
Name (JP): ${employee.nameJa}
Name (EN): ${employee.nameEn}
Nickname: ${employee.nickname}
Email: ${employee.email}
Employment Type: ${employee.employmentType}
Join Date: ${employee.joinDate}
Status: ${employee.status}`;
}
