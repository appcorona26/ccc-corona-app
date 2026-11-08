import React, { useState } from 'react';
import { 
  Shield, Users, Calendar, DollarSign, Award, FileText, 
  Settings, LogOut, CheckCircle, Clock, AlertCircle, XCircle, 
  ChevronRight, Phone, Mail, MapPin, Check, Plus, Search, 
  Download, Eye, UserCheck, TrendingUp, Menu, X, ArrowLeft
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState('parent'); // 'parent' | 'coach' | 'admin'
  const [activeTab, setActiveTab] = useState('mi-jugador');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estados de datos interactivos para demostración
  const [attendance, setAttendance] = useState({
    'stu_01': 'Asistió',
    'stu_02': 'Falta',
    'stu_03': 'Retardo',
    'stu_04': 'Asistió',
    'stu_05': 'Justificada',
    'stu_06': 'Asistió'
  });

  const [categoriesList, setCategoriesList] = useState([
    { id: 'cat_01', name: 'Guerreros Sub-7', coach: 'Prof. Luis Cruz', players: 6, schedule: 'Mar y Jue 16:00 hrs' },
    { id: 'cat_02', name: 'Vikingos (Porteros)', coach: 'Prof. Carlos Ruiz', players: 4, schedule: 'Mié y Vie 17:00 hrs' },
    { id: 'cat_03', name: 'Amazonas Corona', coach: 'Prof. Luis Cruz', players: 5, schedule: 'Lun y Mié 16:00 hrs' }
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatCoach, setNewCatCoach] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedStudentCard, setSelectedStudentCard] = useState(null);

  // Datos mock completos
  const studentData = {
    nombre: "Mateo Cruz Vázquez",
    categoria: "Guerreros Sub-7",
    entrenador: "Prof. Luis Cruz",
    fechaIngreso: "15 de Agosto, 2025",
    estado: "Activo (Al corriente)",
    nacimiento: "12 de Abril, 2019",
    foto: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=300"
  };

  const classmates = [
    { id: 'stu_01', name: 'Mateo Cruz Vázquez', cat: 'Guerreros Sub-7', pos: 'Delantero' },
    { id: 'stu_02', name: 'Santiago Morales', cat: 'Guerreros Sub-7', pos: 'Defensa' },
    { id: 'stu_03', name: 'Leonardo Reyes', cat: 'Guerreros Sub-7', pos: 'Mediocampista' },
    { id: 'stu_04', name: 'Emiliano Torres', cat: 'Guerreros Sub-7', pos: 'Portero' },
    { id: 'stu_05', name: 'Alejandro Gómex', cat: 'Guerreros Sub-7', pos: 'Defensa' },
    { id: 'stu_06', name: 'Daniela Santillán', cat: 'Guerreros Sub-7', pos: 'Delantero' }
  ];

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    setCategoriesList([...categoriesList, {
      id: 'cat_' + Date.now(),
      name: newCatName,
      coach: newCatCoach || 'Por asignar',
      players: 0,
      schedule: 'Por definir'
    }]);
    setNewCatName('');
    setNewCatCoach('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* BARRA SUPERIOR INSTITUCIONAL Y SELECTOR DE ROLES (DEMO) */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20 text-black">
                CC
              </div>
              <div>
                <h1 className="font-bold tracking-wider text-lg text-white leading-none">C.C.C CORONA</h1>
                <span className="text-xs text-orange-500 font-semibold tracking-widest">#WEARECORONA</span>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-400 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* SELECTOR DE PERFILES RÁPIDO */}
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 w-full md:w-auto overflow-x-auto">
            <span className="text-xs text-zinc-400 px-2 font-medium hidden lg:inline">Perfil activo:</span>
            <button 
              onClick={() => { setCurrentRole('parent'); setActiveTab('mi-jugador'); }}
              className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentRole === 'parent' ? 'bg-orange-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              👨‍👩‍👧 Padres ("Mi Corona")
            </button>
            <button 
              onClick={() => { setCurrentRole('coach'); setActiveTab('gestion-deportiva'); }}
              className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentRole === 'coach' ? 'bg-orange-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              ⚽ Entrenadores
            </button>
            <button 
              onClick={() => { setCurrentRole('admin'); setActiveTab('dashboard-admin'); }}
              className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentRole === 'admin' ? 'bg-orange-600 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              🛡️ Administración
            </button>
          </div>

        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
        
        {/* MENÚ LATERAL (SIDEBAR) */}
        <aside className={`md:w-72 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-2 ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="px-3 py-2 text-xs font-bold text-orange-500 uppercase tracking-wider">
            Módulo: {currentRole === 'parent' ? 'Padres de Familia' : currentRole === 'coach' ? 'Gestión Deportiva' : 'Panel Directivo'}
          </div>

          {currentRole === 'parent' && (
            <>
              <SidebarItem active={activeTab === 'mi-jugador'} onClick={() => setActiveTab('mi-jugador')} icon={<Users size={18}/>} label="Mi Jugador y Credencial" />
              <SidebarItem active={activeTab === 'calendario'} onClick={() => setActiveTab('calendario')} icon={<Calendar size={18}/>} label="Calendario Corona" />
              <SidebarItem active={activeTab === 'pagos'} onClick={() => setActiveTab('pagos')} icon={<DollarSign size={18}/>} label="Pagos y Mensualidades" />
              <SidebarItem active={activeTab === 'comunicados'} onClick={() => setActiveTab('comunicados')} icon={<FileText size={18}/>} label="Comunicados y Avisos" />
              <SidebarItem active={activeTab === 'desarrollo'} onClick={() => setActiveTab('desarrollo')} icon={<TrendingUp size={18}/>} label="Desarrollo Deportivo" />
              <SidebarItem active={activeTab === 'formacion'} onClick={() => setActiveTab('formacion')} icon={<Award size={18}/>} label="Formación Integral" />
              <SidebarItem active={activeTab === 'galeria'} onClick={() => setActiveTab('galeria')} icon={<Search size={18}/>} label="Galería Corona" />
            </>
          )}

          {currentRole === 'coach' && (
            <>
              <SidebarItem active={activeTab === 'gestion-deportiva'} onClick={() => setActiveTab('gestion-deportiva')} icon={<Users size={18}/>} label="Mis Categorías y Alumnos" />
              <SidebarItem active={activeTab === 'asistencias'} onClick={() => setActiveTab('asistencias')} icon={<UserCheck size={18}/>} label="Registro de Asistencias" />
              <SidebarItem active={activeTab === 'evaluaciones'} onClick={() => setActiveTab('evaluaciones')} icon={<TrendingUp size={18}/>} label="Evaluaciones Técnicas" />
              <SidebarItem active={activeTab === 'planeaciones'} onClick={() => setActiveTab('planeaciones')} icon={<FileText size={18}/>} label="Planeación de Sesiones" />
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <SidebarItem active={activeTab === 'dashboard-admin'} onClick={() => setActiveTab('dashboard-admin')} icon={<TrendingUp size={18}/>} label="Dashboard Ejecutivo" />
              <SidebarItem active={activeTab === 'control-escolar'} onClick={() => setActiveTab('control-escolar')} icon={<Users size={18}/>} label="Control Escolar (Alumnos)" />
              <SidebarItem active={activeTab === 'categorias-admin'} onClick={() => setActiveTab('categorias-admin')} icon={<Shield size={18}/>} label="Gestión de Categorías" />
              <SidebarItem active={activeTab === 'finanzas'} onClick={() => setActiveTab('finanzas')} icon={<DollarSign size={18}/>} label="Finanzas y Adeudos" />
              <SidebarItem active={activeTab === 'documentacion'} onClick={() => setActiveTab('documentacion')} icon={<FileText size={18}/>} label="Protección Civil y Reglamentos" />
            </>
          )}

          <div className="mt-auto pt-4 border-t border-zinc-800">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-sm">
                {currentRole === 'parent' ? 'PC' : currentRole === 'coach' ? 'LC' : 'AD'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-white">
                  {currentRole === 'parent' ? 'Fam. Cruz Vázquez' : currentRole === 'coach' ? 'Prof. Luis Cruz' : 'Dirección General'}
                </p>
                <p className="text-[10px] text-zinc-400 capitalize">Rol: {currentRole}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENIDO DINÁMICO SEGÚN PESTAÑA */}
        <main className="flex-1 space-y-6">
          
          {/* 1. MÓDULO PADRES: MI JUGADOR */}
          {currentRole === 'parent' && activeTab === 'mi-jugador' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <img 
                    src={studentData.foto} 
                    alt="Alumno" 
                    className="w-28 h-28 rounded-2xl object-cover border-2 border-orange-500 shadow-md shadow-orange-500/20"
                  />
                  <div className="space-y-2 text-center md:text-left">
                    <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">
                      {studentData.categoria}
                    </span>
                    <h2 className="text-2xl font-black text-white">{studentData.nombre}</h2>
                    <p className="text-xs text-zinc-400">Entrenador asignado: <strong className="text-zinc-200">{studentData.entrenador}</strong></p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                      <span className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-lg">📅 Ingreso: {studentData.fechaIngreso}</span>
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/25">✅ {studentData.estado}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => setSelectedStudentCard(true)}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-3 rounded-xl transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
                    >
                      <Eye size={16}/> Ver Credencial Digital
                    </button>
                  </div>
                </div>
              </div>

              {/* TARJETAS DE RESUMEN RÁPIDO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                  <span className="text-xs text-zinc-400 font-medium">Asistencia General</span>
                  <h3 className="text-2xl font-black text-white mt-1">96%</h3>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">🟢 Excelente disciplina</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                  <span className="text-xs text-zinc-400 font-medium">Evaluación Técnica</span>
                  <h3 className="text-2xl font-black text-white mt-1">8.8 / 10</h3>
                  <p className="text-xs text-orange-400 mt-1">Progreso constante en control</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                  <span className="text-xs text-zinc-400 font-medium">Próximo Pago</span>
                  <h3 className="text-2xl font-black text-white mt-1">$600 MXN</h3>
                  <p className="text-xs text-amber-400 mt-1">Vence: 10 de Noviembre</p>
                </div>
              </div>
            </div>
          )}

          {/* CREDENCIAL DIGITAL MODAL */}
          {selectedStudentCard && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-orange-500/30 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative">
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 text-center relative">
                  <h3 className="text-white font-black tracking-wider text-sm">CREDENCIAL OFICIAL C.C.C CORONA</h3>
                  <p className="text-[10px] text-black font-extrabold">#WEARECORONA</p>
                </div>
                <div className="p-6 text-center space-y-4">
                  <img src={studentData.foto} alt="ID" className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-zinc-800 shadow-lg"/>
                  <div>
                    <h4 className="text-xl font-bold text-white">{studentData.nombre}</h4>
                    <p className="text-orange-500 font-semibold text-xs mt-0.5">{studentData.categoria}</p>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs text-left space-y-1">
                    <p className="text-zinc-400">📅 Fecha de Nacimiento: <strong className="text-zinc-200">{studentData.nacimiento}</strong></p>
                    <p className="text-zinc-400">👤 Tutor: <strong className="text-zinc-200">Lic. Luis Emiliano Cruz</strong></p>
                    <p className="text-zinc-400">🛡️ Folio ID: <strong className="text-orange-400">CCC-2026-0042</strong></p>
                  </div>
                  <div className="bg-white p-2 rounded-xl inline-block">
                    <div className="w-24 h-24 bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-400 font-mono text-center">
                      [ CÓDIGO QR SEGURO ]
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStudentCard(false)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl font-bold text-xs transition"
                  >
                    Cerrar Credencial
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CALENDARIO CORONA */}
          {currentRole === 'parent' && activeTab === 'calendario' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📅 Calendario Corona - Noviembre 2026</h3>
              <div className="space-y-3">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 text-orange-500 p-2.5 rounded-xl font-bold text-center">
                      <span className="block text-xs uppercase">Mar</span>
                      <span className="text-lg">10</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Entrenamiento Táctico Regular</h4>
                      <p className="text-xs text-zinc-400">Cancha 2, Parque Cantabria • 16:00 - 18:00 hrs</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Confirmado</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl font-bold text-center">
                      <span className="block text-xs uppercase">Sáb</span>
                      <span className="text-lg">14</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Encuentro Amistoso vs Academia Toluca</h4>
                      <p className="text-xs text-zinc-400">Sede Visitante • 10:00 hrs</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">Convocatoria</span>
                </div>
              </div>
            </div>
          )}

          {/* PAGOS Y MENSUALIDADES */}
          {currentRole === 'parent' && activeTab === 'pagos' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">💳 Estado de Cuenta y Mensualidades</h3>
                <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">1 Pago Pendiente</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                  <div>
                    <h4 className="font-bold text-white text-sm">Mensualidad Noviembre 2026</h4>
                    <p className="text-xs text-zinc-400">Vencimiento: 10 de Noviembre de 2026</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white">$600.00 MXN</span>
                    <span className="block text-xs text-amber-500">Pendiente de pago</span>
                  </div>
                </div>

                {paymentSuccess ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle className="text-emerald-400 mx-auto" size={28}/>
                    <h4 className="font-bold text-emerald-400 text-sm">¡Comprobante enviado con éxito!</h4>
                    <p className="text-xs text-zinc-300">Administración validará tu pago en menos de 24 horas.</p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-medium text-zinc-300 block">Subir comprobante de transferencia o depósito:</label>
                    <div className="flex gap-3">
                      <input type="file" className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-500 cursor-pointer"/>
                      <button 
                        onClick={() => setPaymentSuccess(true)}
                        className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-orange-600/20"
                      >
                        Enviar Comprobante
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COMUNICADOS */}
          {currentRole === 'parent' && activeTab === 'comunicados' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📢 Comunicados Institucionales</h3>
              <div className="space-y-3">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded-md">General</span>
                    <span className="text-xs text-zinc-500">06 Nov 2026</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Jornada de Mantenimiento Cancha 2</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Estimados padres de familia, les recordamos que este fin de semana realizaremos labores de mejora en el césped gracias al apoyo de Fundación Nemi.</p>
                </div>
              </div>
            </div>
          )}

          {/* DESARROLLO DEPORTIVO */}
          {currentRole === 'parent' && activeTab === 'desarrollo' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📈 Desarrollo Deportivo y Habilidades Motrices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Habilidades Motrices Básicas</h4>
                  <p className="text-xs text-zinc-400">Coordinación óculo-manual y psicomotricidad.</p>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[90%]"></div>
                  </div>
                  <span className="text-xs text-orange-400 font-bold block text-right">90 / 100</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Técnica Individual con Balón</h4>
                  <p className="text-xs text-zinc-400">Conducción, pase y recepción orientada.</p>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[85%]"></div>
                  </div>
                  <span className="text-xs text-orange-400 font-bold block text-right">85 / 100</span>
                </div>
              </div>
            </div>
          )}

          {/* FORMACIÓN INTEGRAL */}
          {currentRole === 'parent' && activeTab === 'formacion' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">🧠 Módulo de Formación Integral</h3>
              <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
                <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">Filosofía Institucional</span>
                <blockquote className="text-sm italic text-zinc-300 border-l-2 border-orange-500 pl-4 py-1">
                  "Formamos personas antes que futbolistas."
                </blockquote>
                <p className="text-xs text-zinc-400 leading-relaxed">Durante este mes, el valor institucional trabajado en entrenamientos y talleres es la <strong>Disciplina y el Respeto Mutuo</strong> entre compañeros y cuerpo técnico.</p>
              </div>
            </div>
          )}

          {/* GALERÍA CORONA */}
          {currentRole === 'parent' && activeTab === 'galeria' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📸 Galería C.C.C Corona</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="h-32 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-semibold">
                  Entrenamiento Sub-7
                </div>
                <div className="h-32 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-semibold">
                  Torneo Copa EdoMex
                </div>
                <div className="h-32 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-semibold">
                  Aniversario C.C.C
                </div>
              </div>
            </div>
          )}


          {/* 2. MÓDULO ENTRENADORES: GESTIÓN DEPORTIVA */}
          {currentRole === 'coach' && activeTab === 'gestion-deportiva' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">⚽ Mis Categorías Asignadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-5 rounded-2xl border border-orange-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full">Activa</span>
                    <span className="text-xs text-zinc-400">6 Alumnos</span>
                  </div>
                  <h4 className="text-lg font-black text-white">Guerreros Sub-7</h4>
                  <p className="text-xs text-zinc-400">Horarios: Martes y Jueves • 16:00 hrs</p>
                  <button 
                    onClick={() => setActiveTab('asistencias')}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-xl text-xs font-bold transition"
                  >
                    Pasar Lista de Asistencia
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* REGISTRO DE ASISTENCIAS */}
          {currentRole === 'coach' && activeTab === 'asistencias' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">📋 Control de Asistencia - Guerreros Sub-7</h3>
                <span className="text-xs text-zinc-400">Fecha: Hoy</span>
              </div>

              <div className="space-y-3">
                {classmates.map(student => (
                  <div key={student.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">{student.name}</h4>
                      <p className="text-xs text-zinc-400">Posición: {student.pos}</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {['Asistió', 'Falta', 'Retardo', 'Justificada'].map(status => (
                        <button
                          key={status}
                          onClick={() => handleAttendanceChange(student.id, status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${attendance[student.id] === status ? 'bg-orange-600 text-white shadow' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVALUACIONES DEPORTIVAS */}
          {currentRole === 'coach' && activeTab === 'evaluaciones' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📈 Evaluaciones Técnicas y Físicas</h3>
              <p className="text-xs text-zinc-400">Selecciona un alumno para registrar sus calificaciones trimestrales en habilidades motrices y fundamentos de fútbol.</p>
              <div className="space-y-2">
                {classmates.map(student => (
                  <div key={student.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">{student.name}</h4>
                      <span className="text-xs text-orange-400">{student.cat}</span>
                    </div>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition">
                      Evaluar Alumno
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PLANEACIONES */}
          {currentRole === 'coach' && activeTab === 'planeaciones' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📝 Planeación de Sesiones de Entrenamiento</h3>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-xs font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">Sesión #14</span>
                <h4 className="font-bold text-white text-sm">Control orientado y conducción en espacios reducidos</h4>
                <p className="text-xs text-zinc-400">Objetivo: Fomentar la toma de decisiones rápida bajo presión y el dominio básico del balón.</p>
              </div>
            </div>
          )}


          {/* 3. MÓDULO ADMINISTRACIÓN: DASHBOARD EJECUTIVO */}
          {currentRole === 'admin' && activeTab === 'dashboard-admin' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                  <span className="text-xs text-zinc-400">Alumnos Activos</span>
                  <h3 className="text-2xl font-black text-white mt-1">15</h3>
                  <p className="text-xs text-emerald-400 mt-1">↑ 2 este mes</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                  <span className="text-xs text-zinc-400">Ingresos Mes</span>
                  <h3 className="text-2xl font-black text-white mt-1">$9,000</h3>
                  <p className="text-xs text-emerald-400 mt-1">90% Cobrado</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                  <span className="text-xs text-zinc-400">Entrenadores</span>
                  <h3 className="text-2xl font-black text-white mt-1">2</h3>
                  <p className="text-xs text-orange-400 mt-1">Plantilla completa</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                  <span className="text-xs text-zinc-400">Adeudos</span>
                  <h3 className="text-2xl font-black text-white mt-1">1</h3>
                  <p className="text-xs text-amber-400 mt-1">En seguimiento</p>
                </div>
              </div>
            </div>
          )}

          {/* CONTROL ESCOLAR */}
          {currentRole === 'admin' && activeTab === 'control-escolar' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📁 Control Escolar - Expedientes Digitales</h3>
              <div className="space-y-2">
                {classmates.map(student => (
                  <div key={student.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">{student.name}</h4>
                      <p className="text-xs text-zinc-400">{student.cat} • Pos: {student.pos}</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Inscrito</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GESTIÓN DE CATEGORÍAS (DINÁMICA) */}
          {currentRole === 'admin' && activeTab === 'categorias-admin' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-black text-white">🛡️ Gestión y Creación de Categorías</h3>
              
              {/* Formulario para crear categoría sin tocar código */}
              <form onSubmit={handleAddCategory} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
                <h4 className="font-bold text-xs text-orange-400 uppercase tracking-wider">Crear Nueva Categoría</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="Nombre de la categoría (ej. Guerreros Sub-9)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Entrenador responsable"
                    value={newCatCoach}
                    onChange={(e) => setNewCatCoach(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition">
                  Registrar Categoría en el Sistema
                </button>
              </form>

              <div className="space-y-3">
                {categoriesList.map(cat => (
                  <div key={cat.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                      <p className="text-xs text-zinc-400">Entrenador: {cat.coach} • {cat.schedule}</p>
                    </div>
                    <span className="text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full border border-orange-500/20">{cat.players} Alumnos</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINANZAS */}
          {currentRole === 'admin' && activeTab === 'finanzas' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">💰 Control Financiero y Comprobantes</h3>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-sm">Mensualidad Noviembre - Mateo Cruz</h4>
                  <p className="text-xs text-zinc-400">Comprobante enviado por tutor • Pendiente de validación</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition">
                  Aprobar Pago
                </button>
              </div>
            </div>
          )}

          {/* DOCUMENTACIÓN */}
          {currentRole === 'admin' && activeTab === 'documentacion' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white">📂 Documentación Institucional y Protección Civil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Protocolo de Protección Civil Campus Cantabria</h4>
                  <p className="text-xs text-zinc-400">Plan de emergencia y rutas de evacuación en Cancha 2.</p>
                  <span className="text-xs text-orange-400 font-semibold cursor-pointer">📥 Descargar PDF Oficial</span>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Reglamento Interno C.C.C Corona 2026</h4>
                  <p className="text-xs text-zinc-400">Normas de conducta para alumnos, padres y entrenadores.</p>
                  <span className="text-xs text-orange-400 font-semibold cursor-pointer">📥 Descargar PDF Oficial</span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* PIE DE PÁGINA */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-4 mt-auto text-center text-xs text-zinc-500">
        C.C.C Corona App • Toluca, Estado de México • #WEARECORONA
      </footer>

    </div>
  );
}

function SidebarItem({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition ${active ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
