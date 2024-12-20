import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Verificar preferência do sistema
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return savedTheme || systemTheme;
  });

  useEffect(() => {
    // Atualizar o tema no localStorage e no documento
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
