"use client";

import { useState } from "react";
import { Plus, Trash2, UserPlus } from "lucide-react";

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

interface CustomField {
  id: string;
  key: string;
  value: string;
}

export function AddContactModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  function addField() {
    setCustomFields((f) => [
      ...f,
      { id: crypto.randomUUID(), key: "", value: "" },
    ]);
  }

  function updateField(id: string, key: "key" | "value", val: string) {
    setCustomFields((f) =>
      f.map((field) => (field.id === id ? { ...field, [key]: val } : field))
    );
  }

  function removeField(id: string) {
    setCustomFields((f) => f.filter((field) => field.id !== id));
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCustomFields([]);
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
          <UserPlus className="h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your workspace. You can attach custom fields
            for anything extra you want to track.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                placeholder="Jane Cooper"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+1 415 555 0132"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Custom fields */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Custom Fields</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addField}
                className="h-7 text-primary hover:text-primary-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Field
              </Button>
            </div>

            {customFields.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 px-3 py-3 text-center text-xs text-gray-400">
                No custom fields yet — click &quot;Add Field&quot; to attach one.
              </p>
            ) : (
              <div className="space-y-2">
                {customFields.map((field) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      placeholder="Field name"
                      value={field.key}
                      onChange={(e) =>
                        updateField(field.id, "key", e.target.value)
                      }
                      className="w-2/5"
                    />
                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.id, "value", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="shrink-0 rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove field"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
