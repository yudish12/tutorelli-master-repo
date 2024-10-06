import { join_statuses } from "@/config/contants";
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string | null;
          email: string;
          updated_at: string | null;
          phone: string;
          role: string;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          email: string;
          updated_at?: string | null;
          phone: string;
          role: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          email?: string;
          updated_at?: string | null;
          phone?: string;
          role: string;
        };
      };
    };
  };
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
          class_id: any;
          parent_id: any | null;
          email: string;
        };
        Insert: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
          email: string;
          class_id: string;
          parent_id: string | null;
        };
        Update: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
          email: string;
          class_id: any;
          parent_id: any | null;
        };
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "students_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "parents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "students_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      class: {
        Row: {
          id: string;
          created_at: string | null;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id: string;
          name: string;
        };
      };
      parents: {
        Row: {
          id: string;
          created_at: string | null;
          full_name: string;
          email: string;
          user_id: string;
        };
        Insert: {
          id: string;
          full_name: string;

          user_id: string;
        };
        Update: {
          id: string;
          full_name: string;
        };
        Relationships: [
          {
            foreignKeyName: "parents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tutors: {
        Row: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
          email: string;
        };
        insert: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
        };
        update: {
          id: string;
          created_at: string | null;
          user_id: string;
          full_name: string;
        };
        relationships: [
          {
            foreignKeyName: "tutors_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      sessions: {
        Row: {
          name: string;
          id: string;
          created_at: string;
          url: string;
          subject_id: any;
          tutor_id: any;
          duration: number;
          price: number;
          capacity: number;
          status: string;
          from: string;
          recording: string | null;
        };
      };
      students_registered_session: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          join_status: "joined" | "notjoined";
          subject_id: string;
          session_id: string;
        };
      };
      quiz: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          session_id: number;
          published: boolean;
        };
        Insert: {
          id: string;
          name: string;
          created_at: string;
          session_id: number;
          published: boolean;
        };
        Update: {
          id: string;
          name: string;
          created_at: string;
          session_id: number;
          published: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      questions: {
        Row: {
          id: string;
          questions: string;
          quiz_id: string | number;
          answer: string;
          options: string[];
          explnation: string;
        };
        Insert: {
          id: string;
          questions: string;
          quiz_id: string | number;
          answer: string;
          options: string[];
          explnation: string;
        };
        Update: {
          id: string;
          questions: string;
          quiz_id: string | number;
          answer: string;
          options: string[];
          explnation: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_quiz_id_fkey";
            columns: ["quiz_id"];
            referencedRelation: "quiz";
            referencedColumns: ["id"];
          }
        ];
      };
      flashcards: {
        Row: {
          id: string;
          created_at: string;
          session_id: number;
          front: string;
          back: string;
          published: boolean;
        };
        Insert: {
          id: string;
          created_at: string;
          session_id: number;
          front: string;
          rear: string;
          published: boolean;
        };
        Update: {
          id: string;
          created_at: string;
          session_id: number;
          front: string;
          rear: string;
          published: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "flashcard_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      subject: {
        Row: {
          id: number;
          name: string;
          created_at: string;
          updated_at: string;
          class_id: any;
        };
        Insert: {
          id: number;
          name: string;
          created_at: string;
          updated_at: string;
          class_id: any;
        };
        Update: {
          id: number;
          name: string;
          created_at: string;
          updated_at: string;
          class_id: any;
        };
        Relationships: [
          {
            foreignKeyName: "subjects_class_id_fkey";
            columns: ["class_id"];
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
      notes: {
        Row: {
          id: string;
          created_at: string;
          session_id: number;
          document_url: string;
          title: string;
        };
        Insert: {
          id: string;
          created_at: string;
          session_id: number;
          document_url: string;
          title: string;
        };
        Update: {
          id: string;
          created_at: string;
          session_id: number;
          document_url: string;
          title: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      Views: {
        user_account_workspace: {
          Row: {
            id: string | null;
            name: string | null;
            picture_url: string | null;
            public_data: Json | null;
            subscription_status: null;
          };
          Relationships: [];
        };
        user_accounts: {
          Row: {
            id: string | null;
            name: string | null;
            picture_url: string | null;
            role: string | null;
            slug: string | null;
          };
          Relationships: [
            {
              foreignKeyName: "accounts_memberships_account_role_fkey";
              columns: ["role"];
              isOneToOne: false;
              referencedRelation: "roles";
              referencedColumns: ["name"];
            }
          ];
        };
      };
      Functions: {
        accept_invitation: {
          Args: {
            token: string;
            user_id: string;
          };
          Returns: string;
        };
        get_upcoming_sessions: {
          Args: {
            student_id: string;
          };
          Returns: {
            student_id: string;
            join_url: string;
            session_status: string;
            session_subject_id: string;
            session_subject_name: string;
            session_id: string;
            session_from: string;
            tutor_full_name: string;
          };
        };
        can_action_account_member: {
          Args: {
            target_team_account_id: string;
            target_user_id: string;
          };
          Returns: boolean;
        };
        create_invitation: {
          Args: {
            account_id: string;
            email: string;
            role: string;
          };
          Returns: {
            account_id: string;
            created_at: string;
            email: string;
            expires_at: string;
            id: number;
            invite_token: string;
            invited_by: string;
            role: string;
            updated_at: string;
          };
        };
        create_team_account: {
          Args: {
            account_name: string;
          };
          Returns: {
            created_at: string | null;
            created_by: string | null;
            email: string | null;
            id: string;
            is_personal_account: boolean;
            name: string;
            picture_url: string | null;
            primary_owner_user_id: string;
            public_data: Json;
            slug: string | null;
            updated_at: string | null;
            updated_by: string | null;
          };
        };
        get_account_invitations: {
          Args: {
            account_slug: string;
          };
          Returns: {
            id: number;
            email: string;
            account_id: string;
            invited_by: string;
            role: string;
            created_at: string;
            updated_at: string;
            expires_at: string;
            inviter_name: string;
            inviter_email: string;
          }[];
        };
        get_account_members: {
          Args: {
            account_slug: string;
          };
          Returns: {
            id: string;
            user_id: string;
            account_id: string;
            role: string;
            role_hierarchy_level: number;
            primary_owner_user_id: string;
            name: string;
            email: string;
            picture_url: string;
            created_at: string;
            updated_at: string;
          }[];
        };
        get_config: {
          Args: Record<PropertyKey, never>;
          Returns: Json;
        };
        get_remaining_tokens: {
          Args: Record<PropertyKey, never>;
          Returns: number;
        };
        get_upper_system_role: {
          Args: Record<PropertyKey, never>;
          Returns: string;
        };
        has_active_subscription: {
          Args: {
            target_account_id: string;
          };
          Returns: boolean;
        };
        has_more_elevated_role: {
          Args: {
            target_user_id: string;
            target_account_id: string;
            role_name: string;
          };
          Returns: boolean;
        };
        has_permission: {
          Args: {
            user_id: string;
            account_id: string;
          };
          Returns: boolean;
        };
        has_role_on_account: {
          Args: {
            account_id: string;
            account_role?: string;
          };
          Returns: boolean;
        };
        has_same_role_hierarchy_level: {
          Args: {
            target_user_id: string;
            target_account_id: string;
            role_name: string;
          };
          Returns: boolean;
        };
        is_account_owner: {
          Args: {
            account_id: string;
          };
          Returns: boolean;
        };
        is_account_team_member: {
          Args: {
            target_account_id: string;
          };
          Returns: boolean;
        };
        is_set: {
          Args: {
            field_name: string;
          };
          Returns: boolean;
        };
        is_team_member: {
          Args: {
            account_id: string;
            user_id: string;
          };
          Returns: boolean;
        };
        match_documents: {
          Args: {
            query_embedding: string;
            match_count?: number;
            filter?: Json;
          };
          Returns: {
            id: string;
            content: string;
            metadata: Json;
            similarity: number;
          }[];
        };
        team_account_workspace: {
          Args: {
            account_slug: string;
          };
          Returns: {
            id: string;
            name: string;
            picture_url: string;
            slug: string;
            role: string;
            role_hierarchy_level: number;
            primary_owner_user_id: string;
          }[];
        };
        transfer_team_account_ownership: {
          Args: {
            target_account_id: string;
            new_owner_id: string;
          };
          Returns: undefined;
        };
        upsert_order: {
          Args: {
            target_account_id: string;
            target_customer_id: string;
            target_order_id: string;
            total_amount: number;
            currency: string;
            line_items: Json;
          };
          Returns: {
            account_id: string;
            billing_customer_id: number;
            created_at: string;
            currency: string;
            id: string;
            total_amount: number;
            updated_at: string;
          };
        };
        upsert_subscription: {
          Args: {
            target_account_id: string;
            target_customer_id: string;
            target_subscription_id: string;
            active: boolean;
            cancel_at_period_end: boolean;
            currency: string;
            period_starts_at: string;
            period_ends_at: string;
            line_items: Json;
            trial_starts_at?: string;
            trial_ends_at?: string;
          };
          Returns: {
            account_id: string;
            active: boolean;
            billing_customer_id: number;
            cancel_at_period_end: boolean;
            created_at: string;
            currency: string;
            id: string;
            period_ends_at: string;
            period_starts_at: string;
            trial_ends_at: string | null;
            trial_starts_at: string | null;
            updated_at: string;
          };
        };
      };
      Enums: {
        app_permissions:
          | "roles.manage"
          | "billing.manage"
          | "settings.manage"
          | "members.manage"
          | "invites.manage";
        billing_provider: "stripe" | "lemon-squeezy" | "paddle";
        notification_channel: "in_app" | "email";
        notification_type: "info" | "warning" | "error";
        payment_status: "pending" | "succeeded" | "failed";
        sender: "user" | "assistant";
        subscription_item_type: "flat" | "per_seat" | "metered";
        subscription_status:
          | "active"
          | "trialing"
          | "past_due"
          | "canceled"
          | "unpaid"
          | "incomplete"
          | "incomplete_expired"
          | "paused";
      };
      CompositeTypes: {
        invitation: {
          email: string | null;
          role: string | null;
        };
      };
    };
    storage: {
      Tables: {
        buckets: {
          Row: {
            allowed_mime_types: string[] | null;
            avif_autodetection: boolean | null;
            created_at: string | null;
            file_size_limit: number | null;
            id: string;
            name: string;
            owner: string | null;
            owner_id: string | null;
            public: boolean | null;
            updated_at: string | null;
          };
          Insert: {
            allowed_mime_types?: string[] | null;
            avif_autodetection?: boolean | null;
            created_at?: string | null;
            file_size_limit?: number | null;
            id: string;
            name: string;
            owner?: string | null;
            owner_id?: string | null;
            public?: boolean | null;
            updated_at?: string | null;
          };
          Update: {
            allowed_mime_types?: string[] | null;
            avif_autodetection?: boolean | null;
            created_at?: string | null;
            file_size_limit?: number | null;
            id?: string;
            name?: string;
            owner?: string | null;
            owner_id?: string | null;
            public?: boolean | null;
            updated_at?: string | null;
          };
          Relationships: [];
        };
        migrations: {
          Row: {
            executed_at: string | null;
            hash: string;
            id: number;
            name: string;
          };
          Insert: {
            executed_at?: string | null;
            hash: string;
            id: number;
            name: string;
          };
          Update: {
            executed_at?: string | null;
            hash?: string;
            id?: number;
            name?: string;
          };
          Relationships: [];
        };
        objects: {
          Row: {
            bucket_id: string | null;
            created_at: string | null;
            id: string;
            last_accessed_at: string | null;
            metadata: Json | null;
            name: string | null;
            owner: string | null;
            owner_id: string | null;
            path_tokens: string[] | null;
            updated_at: string | null;
            version: string | null;
          };
          Insert: {
            bucket_id?: string | null;
            created_at?: string | null;
            id?: string;
            last_accessed_at?: string | null;
            metadata?: Json | null;
            name?: string | null;
            owner?: string | null;
            owner_id?: string | null;
            path_tokens?: string[] | null;
            updated_at?: string | null;
            version?: string | null;
          };
          Update: {
            bucket_id?: string | null;
            created_at?: string | null;
            id?: string;
            last_accessed_at?: string | null;
            metadata?: Json | null;
            name?: string | null;
            owner?: string | null;
            owner_id?: string | null;
            path_tokens?: string[] | null;
            updated_at?: string | null;
            version?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: "objects_bucketId_fkey";
              columns: ["bucket_id"];
              isOneToOne: false;
              referencedRelation: "buckets";
              referencedColumns: ["id"];
            }
          ];
        };
        s3_multipart_uploads: {
          Row: {
            bucket_id: string;
            created_at: string;
            id: string;
            in_progress_size: number;
            key: string;
            owner_id: string | null;
            upload_signature: string;
            version: string;
          };
          Insert: {
            bucket_id: string;
            created_at?: string;
            id: string;
            in_progress_size?: number;
            key: string;
            owner_id?: string | null;
            upload_signature: string;
            version: string;
          };
          Update: {
            bucket_id?: string;
            created_at?: string;
            id?: string;
            in_progress_size?: number;
            key?: string;
            owner_id?: string | null;
            upload_signature?: string;
            version?: string;
          };
          Relationships: [
            {
              foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
              columns: ["bucket_id"];
              isOneToOne: false;
              referencedRelation: "buckets";
              referencedColumns: ["id"];
            }
          ];
        };
        s3_multipart_uploads_parts: {
          Row: {
            bucket_id: string;
            created_at: string;
            etag: string;
            id: string;
            key: string;
            owner_id: string | null;
            part_number: number;
            size: number;
            upload_id: string;
            version: string;
          };
          Insert: {
            bucket_id: string;
            created_at?: string;
            etag: string;
            id?: string;
            key: string;
            owner_id?: string | null;
            part_number: number;
            size?: number;
            upload_id: string;
            version: string;
          };
          Update: {
            bucket_id?: string;
            created_at?: string;
            etag?: string;
            id?: string;
            key?: string;
            owner_id?: string | null;
            part_number?: number;
            size?: number;
            upload_id?: string;
            version?: string;
          };
          Relationships: [
            {
              foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
              columns: ["bucket_id"];
              isOneToOne: false;
              referencedRelation: "buckets";
              referencedColumns: ["id"];
            },
            {
              foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
              columns: ["upload_id"];
              isOneToOne: false;
              referencedRelation: "s3_multipart_uploads";
              referencedColumns: ["id"];
            }
          ];
        };
      };
      Views: {
        [_ in never]: never;
      };
      Functions: {
        can_insert_object: {
          Args: {
            bucketid: string;
            name: string;
            owner: string;
            metadata: Json;
          };
          Returns: undefined;
        };
        extension: {
          Args: {
            name: string;
          };
          Returns: string;
        };
        filename: {
          Args: {
            name: string;
          };
          Returns: string;
        };
        foldername: {
          Args: {
            name: string;
          };
          Returns: string[];
        };
        get_size_by_bucket: {
          Args: Record<PropertyKey, never>;
          Returns: {
            size: number;
            bucket_id: string;
          }[];
        };
        list_multipart_uploads_with_delimiter: {
          Args: {
            bucket_id: string;
            prefix_param: string;
            delimiter_param: string;
            max_keys?: number;
            next_key_token?: string;
            next_upload_token?: string;
          };
          Returns: {
            key: string;
            id: string;
            created_at: string;
          }[];
        };
        list_objects_with_delimiter: {
          Args: {
            bucket_id: string;
            prefix_param: string;
            delimiter_param: string;
            max_keys?: number;
            start_after?: string;
            next_token?: string;
          };
          Returns: {
            name: string;
            id: string;
            metadata: Json;
            updated_at: string;
          }[];
        };
        search: {
          Args: {
            prefix: string;
            bucketname: string;
            limits?: number;
            levels?: number;
            offsets?: number;
            search?: string;
            sortcolumn?: string;
            sortorder?: string;
          };
          Returns: {
            name: string;
            id: string;
            updated_at: string;
            created_at: string;
            last_accessed_at: string;
            metadata: Json;
          }[];
        };
      };
      Enums: {
        [_ in never]: never;
      };
      CompositeTypes: {
        [_ in never]: never;
      };
    };
    Functions: {
      get_flashcard_count_student: {
        Args: {
          student_id: string;
        };
        Returns: number;
      };
      get_unique_tutors: {
        Args: {
          student_id: string;
        };
        Returns: {
          id: string;
          full_name: string;
        };
      };
      get_subject_counts_for_student: {
        Args: {
          student_id: string;
        };
        Returns: {
          subject_name: string;
          subject_count: number;
        }[];
      };
      get_quiz_student: {
        Args: {
          student_id: string;
        };
        Returns: {
          id: string;
          name: string;
          data: Json;
        }[];
      };
    };
  };

  // type PublicSchema = Database[Extract<keyof Database, "public">];

  // export type Tables<
  //   PublicTableNameOrOptions extends
  //     | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  //     | { schema: keyof Database },
  //   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  //     ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
  //         Database[PublicTableNameOrOptions["schema"]]["Views"])
  //     : never = never
  // > = PublicTableNameOrOptions extends { schema: keyof Database }
  //   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
  //       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
  //       Row: infer R;
  //     }
  //     ? R
  //     : never
  //   : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
  //       PublicSchema["Views"])
  //   ? (PublicSchema["Tables"] &
  //       PublicSchema["Views"])[PublicTableNameOrOptions] extends {
  //       Row: infer R;
  //     }
  //     ? R
  //     : never
  //   : never;

  // export type TablesInsert<
  //   PublicTableNameOrOptions extends
  //     | keyof PublicSchema["Tables"]
  //     | { schema: keyof Database },
  //   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  //     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  //     : never = never
  // > = PublicTableNameOrOptions extends { schema: keyof Database }
  //   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
  //       Insert: infer I;
  //     }
  //     ? I
  //     : never
  //   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  //   ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
  //       Insert: infer I;
  //     }
  //     ? I
  //     : never
  //   : never;

  // export type TablesUpdate<
  //   PublicTableNameOrOptions extends
  //     | keyof PublicSchema["Tables"]
  //     | { schema: keyof Database },
  //   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  //     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  //     : never = never
  // > = PublicTableNameOrOptions extends { schema: keyof Database }
  //   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
  //       Update: infer U;
  //     }
  //     ? U
  //     : never
  //   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  //   ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
  //       Update: infer U;
  //     }
  //     ? U
  //     : never
  //   : never;

  // export type Enums<
  //   PublicEnumNameOrOptions extends
  //     | keyof PublicSchema["Enums"]
  //     | { schema: keyof Database },
  //   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  //     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  //     : never = never
  // > = PublicEnumNameOrOptions extends { schema: keyof Database }
  //   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  //   : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  //   ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  //   : never;
};
