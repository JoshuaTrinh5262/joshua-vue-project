export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agency: {
        Row: {
          agency_description: string | null
          agency_name: string | null
          agency_status: string | null
          created_at: string
          id: string
          updated_at: string | null
        }
        Insert: {
          agency_description?: string | null
          agency_name?: string | null
          agency_status?: string | null
          created_at?: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          agency_description?: string | null
          agency_name?: string | null
          agency_status?: string | null
          created_at?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      album: {
        Row: {
          album_type: Database["public"]["Enums"]["album_type"] | null
          created_at: string
          ensemble_as: string | null
          id: string
          name: string | null
          released_date: string | null
        }
        Insert: {
          album_type?: Database["public"]["Enums"]["album_type"] | null
          created_at?: string
          ensemble_as?: string | null
          id?: string
          name?: string | null
          released_date?: string | null
        }
        Update: {
          album_type?: Database["public"]["Enums"]["album_type"] | null
          created_at?: string
          ensemble_as?: string | null
          id?: string
          name?: string | null
          released_date?: string | null
        }
        Relationships: []
      }
      album_talent: {
        Row: {
          album_id: string
          created_at: string
          talent_id: string
        }
        Insert: {
          album_id: string
          created_at?: string
          talent_id: string
        }
        Update: {
          album_id?: string
          created_at?: string
          talent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_talent_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_talent_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talent"
            referencedColumns: ["id"]
          },
        ]
      }
      character: {
        Row: {
          created_at: string
          dob: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          dob?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          dob?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      chatgroup: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      dataset: {
        Row: {
          category: string | null
          created_at: string
          id: number
          language: string | null
          source: string | null
          source_text: string
          target_text: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          language?: string | null
          source?: string | null
          source_text: string
          target_text: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          language?: string | null
          source?: string | null
          source_text?: string
          target_text?: string
        }
        Relationships: []
      }
      dataset_unprocess: {
        Row: {
          category: string | null
          created_at: string
          id: number
          language: string | null
          source: string | null
          source_text: string
          target_text: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          language?: string | null
          source?: string | null
          source_text: string
          target_text: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          language?: string | null
          source?: string | null
          source_text?: string
          target_text?: string
        }
        Relationships: []
      }
      discography: {
        Row: {
          arrangement: string | null
          composer: string | null
          created_at: string
          ensemble_as: string | null
          id: number
          lyricist: string | null
          name: string | null
          original_name: string | null
          released_date: string | null
        }
        Insert: {
          arrangement?: string | null
          composer?: string | null
          created_at?: string
          ensemble_as?: string | null
          id?: number
          lyricist?: string | null
          name?: string | null
          original_name?: string | null
          released_date?: string | null
        }
        Update: {
          arrangement?: string | null
          composer?: string | null
          created_at?: string
          ensemble_as?: string | null
          id?: number
          lyricist?: string | null
          name?: string | null
          original_name?: string | null
          released_date?: string | null
        }
        Relationships: []
      }
      discography_talent: {
        Row: {
          created_at: string
          discography_id: number
          talent_id: string
        }
        Insert: {
          created_at?: string
          discography_id: number
          talent_id: string
        }
        Update: {
          created_at?: string
          discography_id?: number
          talent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discography_talent_discography_id_fkey"
            columns: ["discography_id"]
            isOneToOne: false
            referencedRelation: "discography"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discography_talent_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talent"
            referencedColumns: ["id"]
          },
        ]
      }
      event: {
        Row: {
          created_at: string
          event_date: string | null
          event_desciption: string | null
          event_hashtag: string | null
          event_setlist: Json | null
          event_status: string | null
          event_summary: string | null
          event_title: string | null
          event_type: string | null
          event_url: string | null
          id: number
        }
        Insert: {
          created_at?: string
          event_date?: string | null
          event_desciption?: string | null
          event_hashtag?: string | null
          event_setlist?: Json | null
          event_status?: string | null
          event_summary?: string | null
          event_title?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          event_date?: string | null
          event_desciption?: string | null
          event_hashtag?: string | null
          event_setlist?: Json | null
          event_status?: string | null
          event_summary?: string | null
          event_title?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: number
        }
        Relationships: []
      }
      event_talent: {
        Row: {
          created_at: string
          event_id: number
          talent_id: string
        }
        Insert: {
          created_at?: string
          event_id?: number
          talent_id: string
        }
        Update: {
          created_at?: string
          event_id?: number
          talent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_talent_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_talent_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talent"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          chatgroup_id: number | null
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          chatgroup_id?: number | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          chatgroup_id?: number | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "message_chatgroup_id_fkey"
            columns: ["chatgroup_id"]
            isOneToOne: false
            referencedRelation: "chatgroup"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          batch: number
          id: number
          migration: string
        }
        Insert: {
          batch: number
          id?: number
          migration: string
        }
        Update: {
          batch?: number
          id?: number
          migration?: string
        }
        Relationships: []
      }
      talent: {
        Row: {
          agency_id: string | null
          created_at: string
          date_of_birth: string | null
          debut_date: string | null
          emoji: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          height: number | null
          id: string
          name: string | null
          original_name: string | null
          retirement_date: string | null
          talent_status: Database["public"]["Enums"]["talent_status"] | null
          updated_at: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          debut_date?: string | null
          emoji?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          height?: number | null
          id?: string
          name?: string | null
          original_name?: string | null
          retirement_date?: string | null
          talent_status?: Database["public"]["Enums"]["talent_status"] | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          debut_date?: string | null
          emoji?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          height?: number | null
          id?: string
          name?: string | null
          original_name?: string | null
          retirement_date?: string | null
          talent_status?: Database["public"]["Enums"]["talent_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Talent_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
        ]
      }
      task: {
        Row: {
          assigned_to: string | null
          code: string | null
          created_at: string
          description: string | null
          id: number
          priority: Database["public"]["Enums"]["task_priority"] | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string | null
          type: Database["public"]["Enums"]["task_type"] | null
        }
        Insert: {
          assigned_to?: string | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["task_type"] | null
        }
        Update: {
          assigned_to?: string | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["task_type"] | null
        }
        Relationships: []
      }
      tracklist: {
        Row: {
          album_id: string
          created_at: string
          discography_id: number
          order: number | null
          version: string | null
        }
        Insert: {
          album_id?: string
          created_at?: string
          discography_id?: number
          order?: number | null
          version?: string | null
        }
        Update: {
          album_id?: string
          created_at?: string
          discography_id?: number
          order?: number | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracklist_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracklist_discography_id_fkey"
            columns: ["discography_id"]
            isOneToOne: false
            referencedRelation: "discography"
            referencedColumns: ["id"]
          },
        ]
      }
      user_role: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          email_verified_at: string | null
          id: number
          name: string
          password: string
          remember_token: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          email_verified_at?: string | null
          id?: number
          name: string
          password: string
          remember_token?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          email_verified_at?: string | null
          id?: number
          name?: string
          password?: string
          remember_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      yugioh_banlist: {
        Row: {
          created_at: string
          effective_date: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          effective_date: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          effective_date?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      yugioh_banlist_card: {
        Row: {
          banlist_id: number
          card_id: number
          created_at: string
          status: Database["public"]["Enums"]["banlist_card_status"]
        }
        Insert: {
          banlist_id?: number
          card_id: number
          created_at?: string
          status: Database["public"]["Enums"]["banlist_card_status"]
        }
        Update: {
          banlist_id?: number
          card_id?: number
          created_at?: string
          status?: Database["public"]["Enums"]["banlist_card_status"]
        }
        Relationships: [
          {
            foreignKeyName: "yugioh_banlist_card_banlist_id_fkey"
            columns: ["banlist_id"]
            isOneToOne: false
            referencedRelation: "yugioh_banlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yugioh_banlist_card_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "yugioh_card"
            referencedColumns: ["id"]
          },
        ]
      }
      yugioh_card: {
        Row: {
          atk: number | null
          attribute: string | null
          category: string | null
          created_at: string
          def: number | null
          description: string | null
          icon: string | null
          id: number
          is_effect: boolean | null
          is_flip: boolean | null
          is_fusion: boolean | null
          is_gemini: boolean | null
          is_link: boolean | null
          is_normal: boolean | null
          is_pendulum: boolean | null
          is_ritual: boolean | null
          is_spirit: boolean | null
          is_synchro: boolean | null
          is_toon: boolean | null
          is_tuner: boolean | null
          is_union: boolean | null
          is_xyz: boolean | null
          level: number | null
          link: number | null
          link_arrows: string | null
          name: string | null
          passcode: string
          pendulum_effect: string | null
          pendulum_scale: number | null
          type: string | null
        }
        Insert: {
          atk?: number | null
          attribute?: string | null
          category?: string | null
          created_at?: string
          def?: number | null
          description?: string | null
          icon?: string | null
          id?: number
          is_effect?: boolean | null
          is_flip?: boolean | null
          is_fusion?: boolean | null
          is_gemini?: boolean | null
          is_link?: boolean | null
          is_normal?: boolean | null
          is_pendulum?: boolean | null
          is_ritual?: boolean | null
          is_spirit?: boolean | null
          is_synchro?: boolean | null
          is_toon?: boolean | null
          is_tuner?: boolean | null
          is_union?: boolean | null
          is_xyz?: boolean | null
          level?: number | null
          link?: number | null
          link_arrows?: string | null
          name?: string | null
          passcode: string
          pendulum_effect?: string | null
          pendulum_scale?: number | null
          type?: string | null
        }
        Update: {
          atk?: number | null
          attribute?: string | null
          category?: string | null
          created_at?: string
          def?: number | null
          description?: string | null
          icon?: string | null
          id?: number
          is_effect?: boolean | null
          is_flip?: boolean | null
          is_fusion?: boolean | null
          is_gemini?: boolean | null
          is_link?: boolean | null
          is_normal?: boolean | null
          is_pendulum?: boolean | null
          is_ritual?: boolean | null
          is_spirit?: boolean | null
          is_synchro?: boolean | null
          is_toon?: boolean | null
          is_tuner?: boolean | null
          is_union?: boolean | null
          is_xyz?: boolean | null
          level?: number | null
          link?: number | null
          link_arrows?: string | null
          name?: string | null
          passcode?: string
          pendulum_effect?: string | null
          pendulum_scale?: number | null
          type?: string | null
        }
        Relationships: []
      }
      yugioh_deck: {
        Row: {
          created_at: string
          id: number
          name: string | null
          tier: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          tier?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          tier?: string | null
        }
        Relationships: []
      }
      yugioh_deck_card: {
        Row: {
          card_id: number | null
          category: Database["public"]["Enums"]["card_category"] | null
          created_at: string
          deck_id: number | null
          id: number
          quantity: number | null
        }
        Insert: {
          card_id?: number | null
          category?: Database["public"]["Enums"]["card_category"] | null
          created_at?: string
          deck_id?: number | null
          id?: number
          quantity?: number | null
        }
        Update: {
          card_id?: number | null
          category?: Database["public"]["Enums"]["card_category"] | null
          created_at?: string
          deck_id?: number | null
          id?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yugioh_deck_card_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "yugioh_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yugioh_deck_card_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "yugioh_deck"
            referencedColumns: ["id"]
          },
        ]
      }
      yugioh_duelist: {
        Row: {
          created_at: string
          id: number
          konami_id: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          konami_id?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          konami_id?: number | null
          name?: string | null
        }
        Relationships: []
      }
      yugioh_product: {
        Row: {
          category: Database["public"]["Enums"]["product_category"] | null
          created_at: string
          format: Database["public"]["Enums"]["format"] | null
          id: number
          name: string | null
          prefix: string | null
          release_date: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["product_category"] | null
          created_at?: string
          format?: Database["public"]["Enums"]["format"] | null
          id?: number
          name?: string | null
          prefix?: string | null
          release_date?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"] | null
          created_at?: string
          format?: Database["public"]["Enums"]["format"] | null
          id?: number
          name?: string | null
          prefix?: string | null
          release_date?: string | null
        }
        Relationships: []
      }
      yugioh_product_card: {
        Row: {
          card_id: number
          created_at: string
          id: string
          product_id: number
          rarity: Json | null
        }
        Insert: {
          card_id: number
          created_at?: string
          id: string
          product_id: number
          rarity?: Json | null
        }
        Update: {
          card_id?: number
          created_at?: string
          id?: string
          product_id?: number
          rarity?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "yugioh_product_card_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "yugioh_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yugioh_product_card_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "yugioh_product"
            referencedColumns: ["id"]
          },
        ]
      }
      yugioh_tournament: {
        Row: {
          banlist_id: number
          created_at: string
          format: string | null
          id: number
          max_duelist: number | null
          name: string | null
          participant: number | null
        }
        Insert: {
          banlist_id: number
          created_at?: string
          format?: string | null
          id?: number
          max_duelist?: number | null
          name?: string | null
          participant?: number | null
        }
        Update: {
          banlist_id?: number
          created_at?: string
          format?: string | null
          id?: number
          max_duelist?: number | null
          name?: string | null
          participant?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yugioh_tournament_banlist_id_fkey"
            columns: ["banlist_id"]
            isOneToOne: false
            referencedRelation: "yugioh_banlist"
            referencedColumns: ["id"]
          },
        ]
      }
      yugioh_tournament_duelist: {
        Row: {
          created_at: string
          duelist_id: number | null
          id: number
          performence: Database["public"]["Enums"]["performence"] | null
          tournament_id: number | null
        }
        Insert: {
          created_at?: string
          duelist_id?: number | null
          id?: number
          performence?: Database["public"]["Enums"]["performence"] | null
          tournament_id?: number | null
        }
        Update: {
          created_at?: string
          duelist_id?: number | null
          id?: number
          performence?: Database["public"]["Enums"]["performence"] | null
          tournament_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yugioh_tournament_duelist_duelist_id_fkey"
            columns: ["duelist_id"]
            isOneToOne: false
            referencedRelation: "yugioh_duelist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yugioh_tournament_duelist_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "yugioh_tournament"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      execute_dynamic_query: {
        Args: { query: string }
        Returns: Json
      }
    }
    Enums: {
      album_type: "album" | "extended_play" | "single"
      banlist_card_status: "limited" | "semi-limited" | "banned"
      card_category: "main" | "side" | "extra"
      format: "ocg" | "tcg" | "ae"
      gender: "male" | "female"
      performence: "1st" | "2nd" | "top4" | "top8" | "top16"
      product_category:
        | "structure_deck"
        | "starter_deck"
        | "prize_card"
        | "tactical_try_deck"
        | "dual_set"
        | "booster_pack"
      role: "admin" | "superuser" | "user"
      talent_status: "active" | "graduation" | "terminated" | "hiatus"
      task_priority: "low" | "medium" | "high" | "critical"
      task_status:
        | "refinement"
        | "to_do"
        | "in_progress"
        | "review"
        | "testing"
        | "completed"
      task_type: "bug" | "story"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      album_type: ["album", "extended_play", "single"],
      banlist_card_status: ["limited", "semi-limited", "banned"],
      card_category: ["main", "side", "extra"],
      format: ["ocg", "tcg", "ae"],
      gender: ["male", "female"],
      performence: ["1st", "2nd", "top4", "top8", "top16"],
      product_category: [
        "structure_deck",
        "starter_deck",
        "prize_card",
        "tactical_try_deck",
        "dual_set",
        "booster_pack",
      ],
      role: ["admin", "superuser", "user"],
      talent_status: ["active", "graduation", "terminated", "hiatus"],
      task_priority: ["low", "medium", "high", "critical"],
      task_status: [
        "refinement",
        "to_do",
        "in_progress",
        "review",
        "testing",
        "completed",
      ],
      task_type: ["bug", "story"],
    },
  },
} as const
