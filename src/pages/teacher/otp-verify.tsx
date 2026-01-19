import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { request } from '../../config/request'
import { 
  ShieldCheck, 
  Phone, 
  Lock, 
  Mail, 
  KeyRound, 
  Loader2, 
  ArrowLeft, 
  RefreshCcw,
  Zap
} from 'lucide-react'

export const TeacherOTPVerify = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState<'send' | 'verify'>('send')
  const [isLoading, setIsLoading] = useState(false)

  const emailFromURL = searchParams.get('email') || ''
  
  const [email] = useState(emailFromURL)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (!emailFromURL) {
      toast.error('Email sequence not found.')
      navigate('/teacher/login')
    }
  }, [emailFromURL, navigate])

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error('Valid phone number required')
      return
    }

    if (!password || password.length < 6) {
      toast.error('Security key must be 6+ chars')
      return
    }

    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/send-otp', {
        email,
        phoneNumber,
        password,
      })
      toast.success(response.data.message || 'Verification sequence initiated')
      setStep('verify')
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Protocol failure'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Invalid 6-digit sequence')
      return
    }

    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/verify-otp', {
        email,
        otp,
      })
      toast.success('Access keys generated successfully!')
      setTimeout(() => navigate('/teacher/login'), 2000)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid sequence')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans'>
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className='w-full max-w-[500px] relative z-10'>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 mb-6 shadow-2xl relative">
             <div className="absolute inset-0 bg-blue-500/10 blur-lg rounded-2xl animate-pulse" />
             <ShieldCheck className="w-7 h-7 text-blue-500 relative z-10" />
          </div>
          <h1 className='text-3xl font-black italic tracking-tighter uppercase'>
            Identity <span className="text-blue-500">_Verification</span>
          </h1>
          <p className='text-[10px] font-black text-zinc-500 mt-2 uppercase tracking-[0.3em]'>
            {step === 'send' ? 'Initialize secure registration' : 'Input decryption code'}
          </p>
        </div>

        <Card className='bg-zinc-900/40 border border-white/[0.08] rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl'>
          <CardContent className='p-8 md:p-10'>
            <div className='space-y-6'>
              
              {/* Email Field (Always Visible) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 text-zinc-600">
                  <Mail className="w-3 h-3" />
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-700">System Identity</label>
                </div>
                <Input
                  value={email}
                  disabled
                  className='bg-black/50 border-white/5 text-zinc-400 py-6 rounded-xl cursor-not-allowed italic'
                />
              </div>

              {step === 'send' ? (
                <>
                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Phone className="w-3 h-3 text-blue-500" />
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Contact Path</label>
                    </div>
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+998 00 000 00 00"
                      disabled={isLoading}
                      className='bg-black border-white/10 text-white py-6 rounded-xl focus:border-blue-500/50'
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Lock className="w-3 h-3 text-blue-500" />
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Security Key</label>
                    </div>
                    <Input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Min 6 characters'
                      disabled={isLoading}
                      className='bg-black border-white/10 text-white py-6 rounded-xl focus:border-blue-500/50'
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <Button
                      onClick={handleSendOTP}
                      className='w-full bg-white text-black hover:bg-zinc-200 py-7 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all'
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="w-3 h-3 mr-2 fill-current" />}
                      {isLoading ? 'Processing...' : 'Generate OTP'}
                    </Button>

                    <button
                      onClick={() => navigate('/teacher/login')}
                      className='w-full text-zinc-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2'
                    >
                      <ArrowLeft className="w-3 h-3" /> Abort Mission
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Verification Step */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <KeyRound className="w-3 h-3 text-blue-500" />
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Decryption Code</label>
                    </div>
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder='0 0 0 0 0 0'
                      maxLength={6}
                      disabled={isLoading}
                      className='bg-black border-white/10 text-white py-8 rounded-xl focus:border-blue-500/50 text-center text-xl tracking-[0.5em] font-mono'
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <Button
                      onClick={handleVerifyOTP}
                      className='w-full bg-blue-600 hover:bg-blue-500 text-white py-7 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.2)]'
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin mr-2" /> : <ShieldCheck className="w-3 h-3 mr-2" />}
                      Finalize Verification
                    </Button>

                    <button
                      onClick={() => setStep('send')}
                      className='w-full text-zinc-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2'
                    >
                      <RefreshCcw className="w-3 h-3" /> Request New Sequence
                    </button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className='mt-8 flex items-center justify-center gap-3 opacity-30 group cursor-default'>
          <div className="h-px w-8 bg-zinc-800" />
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500 group-hover:text-blue-500 transition-colors">
            Pending admin authorization required after link
          </p>
          <div className="h-px w-8 bg-zinc-800" />
        </div>

      </div>
    </div>
  )
}