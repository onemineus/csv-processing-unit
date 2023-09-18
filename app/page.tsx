import ProcessingCentre from "@/components/pcs";
import Appi from "@/components/process";
import Small from "@/components/small";
import CsvTable from "../ultimate/ui1";
export const medicalDataFields = [
  "Disease",
  "TestsPerformed",
  "TimeSpan",
  "PreviousDiseases",
  "BloodGroup",
  "RhFactor",
  "HemoglobinCount",
  "OxygenLevel",
  "BloodPressure",
  "Allergies",
  "SugarLevel",
  "NumberOfTests",
  "Gender",
  "PastMedicalConditions",
  "Weight",
  "Height",
  "Bilirubin",
  "SodiumPotassiumLevel",
  "WBCCount",
  "PlateletCount",
  "RBCCount",
  "Cholesterol",
  "LeukocytesCount",
  "SurgicalHistory",
  "FamilyMedicalHistory",
  "Medicines",
  "RespiratoryRate",
  "Temperature",
  "HeartRate",
];
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-50">
      <h1 className="text-2xl font-bold mb-4">CSV Table Viewer</h1>
      <CsvTable />
    </main>
  );
}
