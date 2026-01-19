// src/pages/TeacherProfile.tsx
import { useEffect, useState } from 'react'
import { request } from '../../../config/request'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  BarChart, 
  Clock, 
  DollarSign, 
  Link as LinkIcon, 
  CreditCard, 
  AlignLeft,
  Loader2,
  Edit3,
  X,
  Save,
  ShieldCheck
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
  portfolioLink?: string
  description?: string
  cardNumber?: string
}

export const TeacherProfile = () => {
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    specification: '',
    level: '',
    experience: 0,
    hourPrice: 0,
    portfolioLink: '',
    description: '',
    cardNumber: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await request.get('/teacher/me')
      const data = res.data?.data || res.data
      setProfile(data)
      setFormData({
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        specification: data.specification || '',
        level: data.level || '',
        experience: data.experience || 0,
        hourPrice: data.hourPrice || 0,
        portfolioLink: data.portfolioLink || '',
        description: data.description || '',
        cardNumber: data.cardNumber || '',
      })
    } catch { // 'err' o'chirildi, ts(6133) xatosi hal qilindi
      toast.error('Failed to load secure profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await request.patch('/teacher/update', formData)
      toast.success('Profile sequence updated successfully!')
      setEditing(false)
      fetchProfile()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-black space-y-4'>
        <Loader2 className='w-10 h-10 animate-spin text-blue-500' />
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Syncing Profile Base...</p>
      </div>
    )
  }

  const ProfileField = ({ label, icon: Icon, children, isLocked = false }: any) => (
    <div className="relative group">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-3.5 h-3.5 ${isLocked ? 'text-zinc-700' : 'text-blue-500'}`} />
        <label className={`text-[9px] font-black uppercase tracking-[0.2em] ${isLocked ? 'text-zinc-700' : 'text-zinc-500'}`}>
          {label} {isLocked && "(Secure)"}
        </label>
      </div>
      {children}
    </div>
  )

  return (
    <div className='min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden font-sans selection:bg-blue-500/30'>
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className='max-w-4xl mx-auto relative z-10'>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/[0.05] pb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border border-white/[0.08] bg-zinc-900/50 p-1">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border border-white/[0.05]">
                  {profile?.imageUrl ? (
                    <img src={profile.imageUrl} alt="" className="w-full h-full object-cover grayscale" />
                  ) : (
                    <User className="w-10 h-10 text-zinc-800" />
                  )}
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-[3px] border-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
            </div>
            <div>
              <h1 className='text-3xl font-black italic tracking-tighter uppercase'>
                {profile?.fullName || 'Teacher'} <span className="text-blue-500">_SEC</span>
              </h1>
              <div className="flex items-center gap-3 mt-1">
                 <div className="flex items-center gap-1.5 text-emerald-500/80 text-[9px] font-black uppercase tracking-widest bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                    <ShieldCheck className="w-3 h-3" /> System Verified
                 </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {!editing ? (
              <Button 
                onClick={() => setEditing(true)}
                className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black font-black uppercase text-[10px] tracking-[0.2em] py-6 px-10 rounded-2xl transition-all"
              >
                <Edit3 className="w-4 h-4 mr-2" /> Modify Data
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-[0.2em] py-6 px-10 rounded-2xl"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save
                </Button>
                <Button 
                  variant='ghost' 
                  onClick={() => setEditing(false)}
                  className="flex-1 md:flex-none text-zinc-500 hover:text-white font-black uppercase text-[10px] tracking-[0.2em] py-6 rounded-2xl"
                >
                  <X className="w-4 h-4 mr-2" /> Abort
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className='bg-zinc-900/20 border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
            
            {/* Fieldsets */}
            <div className="space-y-8">
              <ProfileField label="Identity Name" icon={User}>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-white py-6 rounded-xl focus:border-blue-500/50 transition-all placeholder:text-zinc-800'
                />
              </ProfileField>

              <ProfileField label="Access Email" icon={Mail} isLocked>
                <Input value={profile?.email || ''} disabled className='bg-zinc-900/30 border-white/[0.03] text-zinc-600 py-6 rounded-xl italic cursor-not-allowed' />
              </ProfileField>

              <ProfileField label="Phone Path" icon={Phone}>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-white py-6 rounded-xl'
                />
              </ProfileField>

              <ProfileField label="Subject / Spec" icon={Briefcase}>
                <Input
                  value={formData.specification}
                  onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-white py-6 rounded-xl font-bold italic'
                />
              </ProfileField>
            </div>

            <div className="space-y-8">
              <ProfileField label="Skill Level" icon={BarChart}>
                <Input
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-white py-6 rounded-xl'
                />
              </ProfileField>

              <div className='grid grid-cols-2 gap-6'>
                <ProfileField label="Exp. Years" icon={Clock}>
                  <Input
                    type='number'
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                    disabled={!editing}
                    className='bg-black border-white/[0.08] text-white py-6 rounded-xl'
                  />
                </ProfileField>

                <ProfileField label="Rate / Hour" icon={DollarSign}>
                  <Input
                    type='number'
                    value={formData.hourPrice}
                    onChange={(e) => setFormData({ ...formData, hourPrice: Number(e.target.value) })}
                    disabled={!editing}
                    className='bg-black border-white/[0.08] text-blue-500 py-6 rounded-xl font-black'
                  />
                </ProfileField>
              </div>

              <ProfileField label="Portfolio URL" icon={LinkIcon}>
                <Input
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-zinc-400 py-6 rounded-xl text-xs'
                />
              </ProfileField>

              <ProfileField label="Billing Address" icon={CreditCard}>
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  disabled={!editing}
                  className='bg-black border-white/[0.08] text-white py-6 rounded-xl font-mono tracking-widest'
                />
              </ProfileField>
            </div>

            <div className="md:col-span-2">
              <ProfileField label="Professional Summary" icon={AlignLeft}>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!editing}
                  rows={4}
                  className='w-full mt-1 bg-black border border-white/[0.08] text-zinc-300 p-6 rounded-2xl focus:border-blue-500/50 outline-none transition-all disabled:opacity-50 text-sm leading-relaxed italic'
                />
              </ProfileField>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}