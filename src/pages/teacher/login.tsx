import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { request } from '../../config/request'
import { 
  Loader2, 
  LogIn, 
  Mail, 
  Lock, 
  Chrome 
} from 'lucide-react'

import teacherImg from '@/assets/teacher.png'

const BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000'

export const TeacherLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Fieldlarni toʻldiring')
      return
    }

    setLoading(true)
    try {
      const res = await request.post('/signin/teacher', { email, password })
      const token = res.data.data
      localStorage.setItem('token', token)
      localStorage.setItem('role', 'teacher')
      toast.success('Xush kelibsiz, Ustoz!')
      navigate('/teacher/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Kirishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/api/v1/teacher/google`
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[450px] relative z-10">
        
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md animate-pulse" />
            
            <div className="relative w-24 h-24 rounded-full border-2 border-white/10 p-1 bg-zinc-900 shadow-2xl overflow-hidden">
              <img 
                src={teacherImg} 
                alt="Teacher" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-black rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>

          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Teacher <span className="text-white">Login</span>
          </h1>
         
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/40 border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl shadow-2xl">
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Chrome className="w-4 h-4" />
            {loading ? 'Processing...' : 'Sync with Google'}
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Local Auth</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Mail className="w-3 h-3 text-blue-500" />
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ID Email</label>
              </div>
              <input
                type="email"
                placeholder="ustoz@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 h-14 rounded-2xl px-5 text-sm outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Lock className="w-3 h-3 text-blue-500" />
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Password</label>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-black border border-white/10 h-14 rounded-2xl px-5 text-sm outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Initialize Access</>}
            </button>
          </div>
        </div>

       
      </div>
    </div>
  )
}