import { blockData } from "@/lib/types/action.types";
import { Subject, Tutor } from "@/lib/types/global.types";

export interface SessionDataReturned {
  id: number;
  name: string;
  to: string;
  url: string;
  from: string;
  status: string;
  session_block: blockData;
  duration: number;
  recording?: string;
  tutor_id: string | number;
  join_url: string;
  created_at: string;
  subject_id: number;
}
