"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/_components/ui/command";
import { Icons } from "@/app/_components/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { useCombobox } from "@/hooks/combobox";
import { data } from "@/lib/data";
import { CommandList } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import { FixedSizeList } from "react-window";

export function ShadcnComboboxVirtualized() {
  const { searchResults, searchFilterData, value, setValue, open, setOpen } =
    useCombobox(data);

  return (
    <div className="flex gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[350px] justify-between"
          >
            {data.find((item) => item.id === value)?.name ?? "Select data..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <div className="w-14">
          {value && (
            <Button
              variant="ghost"
              onClick={() => {
                setValue(undefined);
              }}
            >
              <Icons.cross />
            </Button>
          )}
        </div>
        <PopoverContent
          className="py-0 px-2 sm:px-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]"
          align="start"
        >
          <Command shouldFilter={false} onChange={searchFilterData}>
            <CommandInput placeholder="Search data..." />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                <FixedSizeList
                  width={"100%"}
                  height={200}
                  itemCount={searchResults.length}
                  itemSize={40}
                >
                  {({ index, style }) => (
                    <CommandItem
                      className="justify-center hover:cursor-pointer"
                      key={searchResults[index]?.id}
                      value={searchResults[index]?.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                      style={{
                        ...style,
                      }}
                    >
                      {searchResults[index]?.name}
                    </CommandItem>
                  )}
                </FixedSizeList>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
