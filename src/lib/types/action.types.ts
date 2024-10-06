import { SessionStatus } from "./../../config/contants";
import { Class, Flashcard, optionsType, Quiz, Tutor } from "./global.types";
export type SessionData = {
  student_id: string;
  session_block: {
    subject: {
      id: any;
      name: any;
      class: {
        name: any;
      };
      class_id: any;
      created_at: string;
      updated_at: string;
    };
    tutors: Tutor;
  };
  sessions: {
    id: any;
    from: any;
    join_url?: string;
    recording: any;
  };
}[];

export type SingleSessionData = {
  student_id: string;
  session_block: {
    subject: {
      id: any;
      name: any;
      class: {
        name: any;
      };
      class_id: any;
      created_at: string;
      updated_at: string;
    };
    tutors: Tutor;
  };
  sessions: {
    id: any;
    from: any;

    recording: any;
  };
  join_url?: string;
};

export type blockData = {
  subject: {
    id: number;
    name: string;
    class: {
      name: string;
    };
    class_id: any;
    created_at: string;
    updated_at: string;
  };
  tutors: Tutor;
};

export type TutorSessionData = {
  status: any;
  subject: {
    id: any;
    name: any;
    class: {
      name: string;
    };
  };
  id: any;
  from: any;
  recording?: string;
};

export type SessionBookingData = {
  tutor_id: string;
  tutors: { full_name: string };
  subject_id: string;
  subject: {
    name: string;
    class_id: string;
    class: {
      name: string;
    };
  };
  id: string;
  price: number;
  capacity: number;
  start_date: string;
  end_date: string;
  block_size: number;
  status: typeof SessionStatus;
  from: string;
};

export type ZoomMeetingCreate = {
  block_size: number;
  name?: string;
  block_id: string | optionsType;
  subject: optionsType;
  from: Date;
  price: number;
  capacity: number;
  tutor_id: optionsType;
  zoom_id?: string;
  recur?: {
    repeat_interval: string;
    repeat_times: number;
  };
};

export type adminActionsResponse = {
  message: string;
  success: boolean;
  data?: any;
};

export type Parent = {
  id: string;
  created_at: string;
  full_name: string;
  user_id: string;
  email: string;
};

export type SubjectWithClass = {
  id: string;
  name: string;
  class: Class;
  created_at: string;
  updated_at: string;
};

export type SessionWithTutorAndSubject = {
  id: string;
  name: string;
  price: number;
  tutor_id: string;
  capacity: number;
  subject_id: string;
  from: string;
  duration: number;
  status: React.ReactNode;
  created_at: string;
  updated_at: string;
  quiz: Quiz[];
  flashcards: Flashcard[];
  tutors: Tutor;
  subject: SubjectWithClass;
};

export type updateSessionPayload = {
  name?: string;
  id: string;
  price: number;
  capacity: number;
  tutor_id: string;
  subject_id: string;
  class_id?: string;
  from: string;
};

export type UpcomingSessionDataType = {
  status: any;
  session_block: {
    tutor_id: any;
    subject: {
      id: any;
      name: any;
      class: {
        name: any;
      };
    };
  };
  id: any;
  from: any;
  url: any;
  recording: any;
};

export type ParentBookingType = {
  block_id: string;
  start_date: string;
  completed_sessions: number;
  subject_name: string;
  total_sessions: number;
};
