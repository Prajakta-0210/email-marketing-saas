"use client";

import { useState } from "react";
import { FolderPlus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FilterRow {
  id: string;
  field: string;
  value: string;
}

export function CreateAudienceModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState<FilterRow[]>([
    { id: crypto.randomUUID(), field: "", value: "" },
  ]);

  function addFilter() {
    setFilters((f) => [...f, { id: crypto.randomUUID(), field: "", value: "" }]);
  }

  function updateFilter(id: string, key: "field" | "value", val: string) {
    setFilters((f) =>
      f.map((row) => (row.id === id ? { ...row, [key]: val } : row))
    );
  }

  function removeFilter(id: string) {
    setFilters((f) => f.filter((row) => row.id !== id));
  }

  function resetForm() {
    setName("");
    setDescription("");
    setFilters([{ id: crypto.randomUUID(), field: "", value: "" }]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock save — no backend wired up.
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="h-4 w-4" />
          Create Audience
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create audience</DialogTitle>
          <DialogDescription>
            Group contacts by filters so you can target them together in campaigns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="audience-name">Audience name</Label>
            <Input
              id="audience-name"
              placeholder="e.g. Active Customers"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="audience-description">Description</Label>
            <Input
              id="audience-description"
              placeholder="What is this audience for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Filters</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addFilter}
                className="h-7 text-primary hover:text-primary-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Filter
              </Button>
            </div>

            <div className="space-y-2">
              {filters.map((row) => (
                <div key={row.id} className="flex items-center gap-2">
                  <Input
                    placeholder="Field (e.g. Status)"
                    value={row.field}
                    onChange={(e) => updateFilter(row.id, "field", e.target.value)}
                    className="w-2/5"
                  />
                  <Input
                    placeholder="Value (e.g. Subscribed)"
                    value={row.value}
                    onChange={(e) => updateFilter(row.id, "value", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeFilter(row.id)}
                    disabled={filters.length === 1}
                    className="shrink-0 rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Remove filter"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create audience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
