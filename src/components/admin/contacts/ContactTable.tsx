import { Eye, Trash2, Mail, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContactMessage } from "../../../../types/contact";

interface ContactTableProps {
  messages: ContactMessage[];
  onView: (msg: ContactMessage) => void;
  onToggleStatus: (id: string, status: "read" | "unread") => void;
  onDelete: (id: string) => void;
}

export function ContactTable({
  messages,
  onView,
  onToggleStatus,
  onDelete,
}: ContactTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Role</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-12 text-center text-muted-foreground"
              >
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            messages.map((msg) => (
              <TableRow
                key={msg.id}
                className={
                  msg.status === "unread" ? "bg-primary/5 font-medium" : ""
                }
              >
                <TableCell>
                  {msg.status === "unread" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {msg.name}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {msg.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {msg.role}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[150px] sm:max-w-[200px] truncate">
                  {msg.subject}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                  {new Date(msg.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onView(msg)}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onToggleStatus(
                          msg.id,
                          msg.status === "read" ? "unread" : "read",
                        )
                      }
                    >
                      {msg.status === "read" ? (
                        <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      ) : (
                        <MailOpen className="h-4 w-4 text-blue-500" />
                      )}
                    </Button> */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/10"
                      onClick={() => onDelete(msg.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
