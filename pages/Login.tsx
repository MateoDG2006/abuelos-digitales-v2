import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Phone, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    cedula: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.cedula) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Simulate login
    const userData = {
      fullName: 'Usuario Demo',
      phone: formData.phone,
      cedula: formData.cedula,
      roleType: 'volunteer',
    };
    localStorage.setItem('user', JSON.stringify(userData));

    toast.success('¡Bienvenido de nuevo!');
    navigate('/app');
  };

  const handleOAuth = (provider: string) => {
    toast.success(`Conectando con ${provider}...`);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ fullName: 'Usuario Demo', roleType: 'volunteer' }));
      navigate('/app');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </button>

        <div className="text-center mb-8">
          <h2 className="text-slate-800 mb-2">Iniciar Sesión</h2>
          <p className="text-slate-600 text-lg">Ingresa con tu teléfono y cédula</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg">Número de Teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <div className="flex">
                <div className="flex items-center justify-center bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl px-4 text-slate-700">
                  +507
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="6123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-4 h-14 rounded-l-none rounded-r-xl text-lg flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cedula" className="text-lg">Cédula</Label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="cedula"
                type="text"
                placeholder="8-123-4567"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                className="pl-12 h-14 rounded-xl text-lg"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-lg"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">O continúa con</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth('Google')}
              className="h-14 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth('Facebook')}
              className="h-14 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-emerald-700 hover:text-emerald-800"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
