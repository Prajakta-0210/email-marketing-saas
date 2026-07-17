"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Upload, Pencil, Trash2, MoreHorizontal, Users, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddContactModal } from "@/components/shared/add-contact-modal";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Subscribed: "bg-green-100 text-green-700",
  Unsubscribed: "bg-gray-100 text-gray-600",
  Bounced: "bg-red-100 text-red-700",
};

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function ContactsPage() {
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/contacts")
      .then(setContacts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q)
    );
  }, [contacts, query]);

  async function handleDelete(id: string) {
    try {
      await api.delete(`/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Contacts</h1>
          <p className="mt-1 text-sm text-gray-500">{contacts.length} total contacts in your workspace</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <AddContactModal onCreated={(c) => setContacts((prev) => [c, ...prev])} />
        </div>
      </div>

      <Card>
        <CardHeader className="gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>All Contacts</CardTitle>
            <CardDescription>Search and manage your contact list</CardDescription>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, city…" className="h-9 pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading contacts…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">No contacts found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{initials(contact.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{contact.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{contact.email}</TableCell>
                    <TableCell className="text-gray-600">{contact.phone || "—"}</TableCell>
                    <TableCell className="text-gray-600">{contact.city || "—"}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-transparent", statusStyles[contact.status])}>{contact.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Contact actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Pencil /> Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:text-red-500"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash2 /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}