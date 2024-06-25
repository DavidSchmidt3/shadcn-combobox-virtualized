import { ShadcnComboboxVirtualized } from "@/app/_components/shadcn-combobox-virtualized";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 dark">
      <div>
        <ShadcnComboboxVirtualized />
      </div>
    </main>
  );
}
