import { Phone, User, Calendar, Tag, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactMessage } from "../../../../types/contact";

interface ContactModalProps {
  message: ContactMessage | null;
  open: boolean;
  onClose: () => void;
  onToggleStatus: (id: string, status: "read" | "unread") => void;
}

export function ContactModal({
  message,
  open,
  onClose,
  onToggleStatus,
}: ContactModalProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg w-[calc(100%-2rem)] sm:w-full max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden rounded-xl lg:mt-6">
        <div className="px-6 pt-6 pb-4 shrink-0 border-b">
          <DialogHeader>
            <DialogTitle className="font-display text-xl leading-tight">
              {message.subject}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={message.status === "unread" ? "default" : "secondary"}
            >
              {message.status === "unread" ? "Unread" : "Read"}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Tag className="h-3 w-3" /> {message.role}
            </Badge>
          </div>

          <div className="grid gap-3 rounded-lg bg-muted/40 p-4 border shadow-sm">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">
                {message.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                 href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                className="text-primary hover:underline break-all"
              >
                {message.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                href={`tel:${message.phone}`}
                className="text-primary hover:underline break-all"
              >
                {message.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>
                {new Date(message.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4 shadow-sm">
            <h4 className="mb-2 text-sm font-semibold text-foreground border-b pb-2">
              Message
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap break-words">
              {message.message}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 shrink-0 border-t bg-muted/10 flex flex-col sm:flex-row justify-end gap-2">
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() =>
              onToggleStatus(
                message.id,
                message.status === "read" ? "unread" : "read",
              )
            }
          >
            Mark as {message.status === "read" ? "Unread" : "Read"}
          </Button>
          <Button className="w-full sm:w-auto" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
