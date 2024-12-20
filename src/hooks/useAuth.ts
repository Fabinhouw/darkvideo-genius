import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, supabase, type Profile } from '@/lib/supabase'
import { toast } from 'sonner'

export const useAuth = () => {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { user: currentUser, error: authError } = await auth.getUser()
      if (authError) throw authError

      // Buscar o perfil completo do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (profileError) throw profileError

      setUser({ ...currentUser, ...profile } as Profile)
    } catch (error) {
      console.error('Error checking user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await auth.signIn(email, password)
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Senha incorreta. Por favor, verifique suas credenciais.')
        }
        throw error
      }
      
      await checkUser() // Atualizar o usuário após login
      
      toast.success("Login realizado com sucesso! Você será redirecionado para o editor.")
      
      navigate('/editor')
    } catch (error: any) {
      toast.error("Erro ao fazer login: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await auth.signUp(email, password)
      if (error) throw error
      
      toast.success("Conta criada com sucesso! Você será redirecionado para fazer login.")
      
      navigate('/login')
    } catch (error: any) {
      toast.error("Erro ao criar conta: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      setUser(null)
      navigate('/')
    } catch (error: any) {
      toast.error("Erro ao sair: " + error.message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signInWithGoogle()
      if (error) throw error
      
      toast.success("Redirecionando para autenticação do Google...")
    } catch (error: any) {
      toast.error("Erro ao fazer login com Google: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle
  }
}
