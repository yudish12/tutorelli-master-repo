import { Student } from "@/lib/types/global.types";
import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableClassName?: string;
  tableCellClassName?: string;
  tableBodyClassName?: string;
  tableHeaderClassName?: string;
  TableRowClassName?: string;
  tableContinerClassName?: string;
}

export interface SessionTableType {
  yeargroup: React.ReactNode;
  subject: React.ReactNode;
  Tutor: React.ReactNode;
  block_size: number;
  from: React.ReactNode;
  sessionbooking: React.ReactNode;
}

export interface AdminSessionTableType {
  id: string;
  tutors: string;
  subject: string;
  duration: number;
  capacity: number;
  price: number;
  from: string;
  action: React.ReactNode;
}

export interface FlashcardDataTableType {
  fc_id: string;
  session_id: string;
  session_name: string;
  subject: string;
  class: string;
  action: React.ReactNode;
}

export interface QuizDataTableType {
  quiz_id: string;
  quiz_name: string;
  subject: string;
  class: string;
  session_name: string;
  session_id: string;
  action: React.ReactNode;
}

export interface NotesDataTableType {
  notes_id: string;
  session_id: string;
  session_name: string;
  subject: string;
  class: string;
  action: React.ReactNode;
}

export interface StudentsInSessionTableType {
  student_id: any;
  join_status: any;
  students: {
    full_name: any;
    email: any;
    class_id: any;
    parent_id: any;
  };
  action: React.ReactNode;
}
