"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ContactFilters } from "@/components/admin/contacts/ContactFilters";
import { ContactTable } from "@/components/admin/contacts/ContactTable";
import { ContactModal } from "@/components/admin/contacts/ContactModal";
import DeletePreview from "@/components/admin/contacts/DeletePreview";
import { ContactMessage, INITIAL_MESSAGES } from "../../../../types/contact";

const PAGE_SIZE = 5;

function exportToCSV(messages: ContactMessage[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Role",
    "Subject",
    "Message",
    "Date",
    "Status",
  ];
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const rows = messages.map((m) =>
    [
      escape(m.name),
      escape(m.email),
      escape(m.phone),
      escape(m.role),
      escape(m.subject),
      escape(m.message),
      escape(new Date(m.date).toLocaleDateString("en-IN")),
      escape(m.status),
    ].join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contact-messages-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">(
    "all",
  );
  const [page, setPage] = useState(1);

  // View Modal State
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Delete Modal State
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    let result = messages;
    if (statusFilter !== "all")
      result = result.filter((m) => m.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q),
      );
    }
    return result;
  }, [messages, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleToggleStatus = (id: string, status: "read" | "unread") => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
    setSelectedMessage((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  };

  const handleView = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setModalOpen(true);
    if (msg.status === "unread") handleToggleStatus(msg.id, "read");
  };

  // Triggers the popup instead of instant deletion
  const promptDelete = (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (msg) setMessageToDelete(msg);
  };

  // Actually deletes the message (called by the DeletePreview popup)
  const confirmDelete = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);

    // Simulate a network delay so your loading spinner shows up smoothly
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== messageToDelete.id));
      setIsDeleting(false);
      setMessageToDelete(null);
      toast.success("Message Deleted", {
        description: "The contact message has been removed.",
      });
    }, 600);
  };

  return (
    <div className="container mx-auto min-h-screen max-w-8xl space-y-6 px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground sm:text-3xl">
          Contact Messages
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {messages.filter((m) => m.status === "unread").length} unread of{" "}
          {messages.length} messages
        </p>
      </div>

      <ContactFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setPage={setPage}
        onExport={() => exportToCSV(filtered)}
        disableExport={filtered.length === 0}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="border rounded-xl bg-card overflow-hidden shadow-sm"
      >
        <ContactTable
          messages={paginated}
          onView={handleView}
          onToggleStatus={handleToggleStatus}
          onDelete={promptDelete} // Passed to table
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Page <span className="font-medium text-foreground">{page}</span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* View Message Modal */}
      <ContactModal
        message={selectedMessage}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onToggleStatus={handleToggleStatus}
      />

      {/* Delete Confirmation Modal */}
      <DeletePreview
        open={!!messageToDelete}
        email={messageToDelete?.email || null}
        isDeleting={isDeleting}
        onCancel={() => setMessageToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
