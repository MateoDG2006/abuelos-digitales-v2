import { useState, useRef } from 'react';
import { ArrowLeft, User, Phone, CreditCard, Camera, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { UserRole } from '@/types';

interface SettingsProps {
  role: UserRole;
  onBack: () => void;
}

export function Settings({ role, onBack }: SettingsProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [fullName, setFullName] = useState(user.fullName || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [cedula, setCedula] = useState(user.cedula || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      fullName,
      phone,
      cedula,
      profileImage,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('¡Información actualizada exitosamente!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      <button
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Volver
      </button>

      <div className="mb-6">
        <h2 className="text-slate-800 mb-2">Configuración</h2>
        <p className="text-slate-600">Actualiza tu información</p>
      </div>

      {/* Profile Image */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-white" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700"
          >
            <Camera className="h-4 w-4 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <p className="text-slate-600 text-sm mt-2">Toca para cambiar foto</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center text-slate-700 mb-2">
            <User className="h-5 w-5 text-slate-400 mr-2" />
            Nombre Completo
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Tu nombre completo"
            className="h-12 rounded-xl"
          />
        </div>

        <div>
          <label className="flex items-center text-slate-700 mb-2">
            <Phone className="h-5 w-5 text-slate-400 mr-2" />
            Teléfono
          </label>
          <div className="flex gap-2">
            <div className="w-20 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              +507
            </div>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="6000-0000"
              className="flex-1 h-12 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-slate-700 mb-2">
            <CreditCard className="h-5 w-5 text-slate-400 mr-2" />
            Cédula
          </label>
          <Input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="8-123-4567"
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
      >
        <Save className="h-5 w-5 mr-2" />
        Guardar Cambios
      </Button>
    </div>
  );
}
