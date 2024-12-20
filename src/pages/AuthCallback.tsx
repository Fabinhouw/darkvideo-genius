import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Tentar obter a sessão atual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Erro ao obter sessão:', sessionError);
          throw sessionError;
        }

        if (!session) {
          // Se não houver sessão, tentar trocar o código de autorização por uma sessão
          const { error: signInError } = await supabase.auth.getUser();
          if (signInError) throw signInError;
        }

        // Se chegou até aqui, a autenticação foi bem-sucedida
        toast.success('Login realizado com sucesso!');
        navigate('/editor');
      } catch (error: any) {
        console.error('Erro no callback de autenticação:', error);
        toast.error('Erro ao finalizar autenticação: ' + error.message);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Finalizando autenticação...</p>
      </div>
    </div>
  );
}
