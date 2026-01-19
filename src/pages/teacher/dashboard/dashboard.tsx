import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { request } from '../../../config/request'
import { toast } from 'sonner'
import type { Role } from '../../auth/types'
import { 
  User, 
  Star, 
  BookOpen, 
  Wallet, 
  ExternalLink, 
  CreditCard, 
  Loader2, 
  Sparkles 
} from 'lucide-react'

interface TeacherProfile {
  id: string
  email: string
  fullName: string
  phoneNumber?: string
  imageUrl?: string
  specification?: string
  level?: string
  experience?: number
  hourPrice?: number
  rating?: number
  portfolioLink?: string
  description?: string
  cardNumber?: string
}

export const TeacherDashboard = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tokenFromURL = searchParams.get('token')
    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL)
      localStorage.setItem('role', 'teacher')
      navigate('/teacher/dashboard', { replace: true })
    }
  }, [searchParams, navigate])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role') as Role
    if (!token || role !== 'teacher') {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Session expired', { className: 'bg-black text-white border-white/10' })
        navigate('/teacher/login')
        return
      }

      try {
        setLoading(true)
        const res = await request.get('/teacher/me')
        setProfile(res.data?.data || res.data)
      } catch (err: any) {
        if (err?.response?.status === 401) {
          localStorage.clear()
          navigate('/teacher/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <Loader2 className='h-10 w-10 animate-spin text-blue-500 mx-auto' />
          <p className='text-zinc-500 font-black uppercase tracking-widest text-[10px]'>Authenticating...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black text-white font-sans p-4 md:p-8 relative overflow-hidden'>
      {/* Background Glow */}
      <div className='absolute top-0 right-0 h-[500px] w-[500px] bg-blue-600/5 blur-[120px] rounded-full' />
      <div className='absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-600/5 blur-[120px] rounded-full' />

      <div className='max-w-6xl mx-auto relative z-10 space-y-8'>
        
        {/* Header / Profile Section */}
        <div className='bg-zinc-900/30 border border-white/[0.05] rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl'>
          <div className='flex flex-col md:flex-row items-center gap-8 text-center md:text-left'>
            <div className='relative'>
              <div className='w-32 h-32 rounded-full border-4 border-black ring-2 ring-blue-500/20 overflow-hidden bg-zinc-800'>
                {profile?.imageUrl ? (
                  <img src={profile.imageUrl} alt={profile.fullName} className='w-full h-full object-cover grayscale opacity-80' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-3xl font-black text-zinc-600'>
                    {profile?.fullName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className='absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full border-4 border-black'>
                <Sparkles className='w-4 h-4 text-white' />
              </div>
            </div>
            
            <div className='space-y-2'>
              <p className='text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]'>Professional Profile</p>
              <h2 className='text-4xl font-black tracking-tighter italic'>
                {profile?.fullName || 'Teacher'}
              </h2>
              <p className='text-zinc-500 font-medium'>{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { label: 'Rating', val: profile?.rating?.toFixed(1) || '—', icon: Star, color: 'text-amber-400' },
            { label: 'Experience', val: `${profile?.experience || 0} Years`, icon: BookOpen, color: 'text-blue-400' },
            { label: 'Hourly Rate', val: `${profile?.hourPrice?.toLocaleString() || 0} sum`, icon: Wallet, color: 'text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className='bg-zinc-900/30 border border-white/[0.05] rounded-[2rem] p-8 group hover:border-white/10 transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <p className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>{stat.label}</p>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className='text-2xl font-black tracking-tight'>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Info & About */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-zinc-900/30 border border-white/[0.05] rounded-[2.5rem] p-8 space-y-6'>
            <h3 className='text-xs font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2'>
              <User className='w-4 h-4' /> Details
            </h3>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <p className='text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1'>Specialization</p>
                <p className='font-bold text-sm'>{profile?.specification || 'Not specified'}</p>
              </div>
              <div>
                <p className='text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1'>Portfolio</p>
                {profile?.portfolioLink ? (
                  <a href={profile.portfolioLink} target='_blank' className='text-blue-500 text-sm font-bold flex items-center gap-1'>
                    Open Link <ExternalLink className='w-3 h-3' />
                  </a>
                ) : (
                  <p className='text-zinc-700 text-sm'>No link provided</p>
                )}
              </div>
              <div>
                <p className='text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1'>Card Account</p>
                <p className='font-mono text-zinc-400 flex items-center gap-2'>
                  <CreditCard className='w-3 h-3' /> {profile?.cardNumber || '•••• ••••'}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-zinc-900/30 border border-white/[0.05] rounded-[2.5rem] p-8 space-y-6'>
            <h3 className='text-xs font-black uppercase tracking-[0.3em] text-zinc-400'>About Teacher</h3>
            <p className='text-zinc-400 text-sm leading-relaxed italic'>
              {profile?.description || 'Teacher hasn\'t provided a bio yet.'}
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className='relative rounded-[2.5rem] overflow-hidden p-10 text-center border border-white/5 bg-gradient-to-br from-zinc-900/50 to-black'>
          <div className='relative z-10 space-y-4'>
            <h3 className='text-xl font-black tracking-tighter italic'>Advanced Analytics Coming Soon</h3>
            <p className='text-zinc-500 text-xs font-medium max-w-md mx-auto'>
              Schedule tracking, automated payments, and direct student messaging are being integrated.
            </p>
            <div className='flex justify-center gap-2 pt-4'>
              <div className='h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse' />
              <div className='h-1.5 w-1.5 rounded-full bg-blue-500/50' />
              <div className='h-1.5 w-1.5 rounded-full bg-blue-500/20' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}