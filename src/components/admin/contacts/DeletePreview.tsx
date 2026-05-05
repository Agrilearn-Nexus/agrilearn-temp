import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeletePreviewProps {
  open: boolean;
  email: string | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeletePreview({
  open,
  email,
  isDeleting,
  onCancel,
  onConfirm,
}: DeletePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="size-5 text-red-600" />
            </div>
            <DialogTitle>Delete Submission?</DialogTitle>
          </div>
          <DialogDescription>
            This will remove{" "}
            <span className="font-medium text-gray-900">{email}</span> from the
            active list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"default"}
            onClick={onCancel}
            disabled={isDeleting}
            className="disabled:opacity-50 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={onConfirm}
            disabled={isDeleting}
            className="disabled:opacity-50 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {isDeleting && <Loader2 className="size-4 animate-spin mr-2" />}
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
