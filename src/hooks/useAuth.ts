import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, supabase, type Profile } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'

export const useAuth = () => {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

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
      if (error) throw error
      
      await checkUser() // Atualizar o usuário após login
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para o editor.",
      })
      
      navigate('/editor')
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await auth.signUp(email, password)
      if (error) throw error
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para fazer login.",
      })
      
      navigate('/login')
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive"
      })
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
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }
}
