import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: 'all' | 'read' | 'unread';
  setStatusFilter: (val: 'all' | 'read' | 'unread') => void;
  setPage: (val: number) => void;
  onExport: () => void;
  disableExport: boolean;
}

export function ContactFilters({ search, setSearch, statusFilter, setStatusFilter, setPage, onExport, disableExport }: ContactFiltersProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, subject, or role..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={v => { setStatusFilter(v as typeof statusFilter); setPage(1); }}>
        <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Messages</SelectItem>
          <SelectItem value="unread">Unread</SelectItem>
          <SelectItem value="read">Read</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="w-full sm:w-auto" onClick={onExport} disabled={disableExport}>
        <Download className="h-4 w-4 mr-2" /> Export CSV
      </Button>
    </motion.div>
  );
}