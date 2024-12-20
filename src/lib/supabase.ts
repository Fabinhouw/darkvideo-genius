import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas do Supabase
export type UserPlan = 'FREE' | 'PLUS' | 'PRO' | 'DEV';

export type Profile = {
  id: string
  email: string
  name: string
  avatar_url?: string
  plan: UserPlan
  created_at: string
}

export type PlanFeature = {
  id: string
  plan: UserPlan
  max_videos_per_month: number
  max_video_duration: number
  max_storage_gb: number
  has_watermark: boolean
  has_ai_features: boolean
  has_priority_support: boolean
  created_at: string
}

export type Video = {
  id: string
  title: string
  description?: string
  url: string
  thumbnail_url?: string
  user_id: string
  created_at: string
  updated_at: string
  status: 'processing' | 'completed' | 'failed'
}

// Funções de autenticação
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },
  signInWithGoogle: async () => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    console.log('URL de redirecionamento:', redirectUrl);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    return { data, error }
  },
}

// Funções para gerenciar perfis
export const profiles = {
  get: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  update: async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    return { data, error }
  }
}

// Funções para gerenciar planos
export const plans = {
  getPlanFeatures: async (plan: UserPlan) => {
    const { data, error } = await supabase
      .from('plan_features')
      .select('*')
      .eq('plan', plan)
      .single()
    return { data, error }
  },

  getAllFeatures: async () => {
    const { data, error } = await supabase
      .from('plan_features')
      .select('*')
      .order('max_videos_per_month', { ascending: true })
    return { data, error }
  },

  updateUserPlan: async (userId: string, plan: UserPlan) => {
    const { error } = await supabase
      .rpc('update_user_plan', {
        user_id: userId,
        new_plan: plan
      })
    return { error }
  },

  getCurrentPlan: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', userId)
      .single()
    return { data, error }
  }
}

// Funções para gerenciar vídeos
export const videos = {
  create: async (videoData: Partial<Video>) => {
    const { data, error } = await supabase
      .from('videos')
      .insert([videoData])
      .select()
    return { data, error }
  },

  list: async (userId: string) => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  get: async (videoId: string) => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', videoId)
      .single()
    return { data, error }
  },

  update: async (videoId: string, updates: Partial<Video>) => {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', videoId)
    return { data, error }
  },

  delete: async (videoId: string) => {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', videoId)
    return { error }
  }
}

// Função para upload de arquivos
export const storage = {
  uploadVideo: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(path, file)
    return { data, error }
  },

  uploadThumbnail: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(path, file)
    return { data, error }
  },

  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  }
}
