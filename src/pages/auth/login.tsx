import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { PasswordInput } from '../../components/ui/password-input'
import { UseLogin } from './service/use-login'
import { toast } from 'sonner'
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react'

import adminImg from '@/assets/admin.png'

const formSchema = z.object({
  username: z.string().min(2, "Username kamida 2 ta belgi bo'lishi kerak").max(50),
  password: z.string().min(2, "Password kamida 2 ta belgi bo'lishi kerak").max(50),
})

const Login = () => {
  const { mutate, isPending } = UseLogin()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin1998",
      password: "superPassword1998!",
    },
  })

  const onSubmit = () => {
    mutate(
      {
        username: form.getValues("username"),
        password: form.getValues("password"),
      },
      {
        onSuccess: (res) => {
          localStorage.setItem('token', res.data.accessToken)
          localStorage.setItem('role', res.data.role.toLowerCase())
          localStorage.setItem('username', res.data.username)

          toast.success(res.message?.uz || 'Login muvaffaqiyatli!', {
            className: "bg-black text-white border-white/10"
          })
          navigate(`/app/${res.data.role.toLowerCase()}`)
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center font-sans p-4 overflow-hidden text-white">
      {/* Background Neon Glow - Minimalist */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        
        {/* Profile and Shield Badge Section */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30">
          <div className="relative">
            {/* Dumaloq rasm - Mutlaq qora border */}
            <div className="h-32 w-32 rounded-full border-4 border-black bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img 
                src={adminImg} 
                alt="Admin" 
                className="h-full w-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            
            {/* Admin Icon (Shield) - Rasmdan mutlaq oldinda */}
            <div className="absolute bottom-1 right-1 z-40">
              <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center border-[3px] border-black shadow-lg shadow-blue-900/40">
                <ShieldCheck className="text-white w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Card - Pure Black Design */}
        <div className="mt-0 rounded-[2rem] border border-white/[0.08] bg-black p-8 shadow-[0_0_50px_rgba(0,0,0,1)] pt-24 relative overflow-hidden">
          {/* Subtle top edge light */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center mb-10">
            <h2 className="text-xl font-black text-white tracking-[0.1em] uppercase">Admin Access</h2>
            <div className="h-1 w-8 bg-blue-600 mx-auto mt-2 rounded-full" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                       Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                          placeholder="ENTER ID"
                          {...field}
                          disabled={isPending}
                          className="h-12 bg-zinc-900/30 border-white/[0.05] rounded-xl text-white placeholder:text-zinc-800 focus:border-blue-500/50 focus:bg-zinc-900/50 focus:ring-0 transition-all text-xs pl-12 tracking-widest"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-rose-500 text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                       Security Key
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                        <PasswordInput
                          placeholder="••••••••"
                          {...field}
                          disabled={isPending}
                          className="h-12 bg-zinc-900/30 border-white/[0.05] rounded-xl text-white placeholder:text-zinc-800 focus:border-blue-500/50 focus:bg-zinc-900/50 focus:ring-0 transition-all text-xs pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-rose-500 text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-black bg-white text-black hover:bg-zinc-200 shadow-xl transition-all active:scale-[0.97] disabled:opacity-50 border-none"
                  disabled={isPending}
                >
                  {isPending ? (
                    "AUTHENTICATING..."
                  ) : (
                    <span className="flex items-center justify-center gap-2 tracking-tighter">
                      SIGN IN <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>

              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/teacher/login')}
                  className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-700 hover:text-white transition-colors duration-300"
                >
                  Switch to Teacher Login
                </button>
              </div>
            </form>
          </Form>
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-10">
          <div className="h-[1px] w-4 bg-zinc-800" />
          <p className="text-[9px] text-zinc-800 font-black uppercase tracking-[0.5em]">
            System v2.0.4
          </p>
          <div className="h-[1px] w-4 bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}

export default Login