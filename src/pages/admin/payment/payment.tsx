import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'
import {
  DollarSign,
  Clock,
  TrendingUp,
  XCircle,
  Search,
  Download,
  Loader2,
  // Filter,
  CreditCard
} from 'lucide-react'
import { usePaymentStats } from '../service/query/usePayment'

interface Transaction {
  id: string;
  date: string;
  student: { id: string; name: string } | null; 
  teacher: { id: string; name: string } | null; 
  amount: number;
  status: string; 
  provider: string;
}

export const Payment = () => {
  const { data, isLoading, isError } = usePaymentStats()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [providerFilter, setProviderFilter] = useState('all')

  const darkBg = 'bg-[#0a0c14]'
  const cardBg = 'bg-[#11141d]/50 backdrop-blur-xl border-white/5'
  const textMuted = 'text-slate-500'

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-[80vh] ${darkBg}`}>
        <Loader2 className='w-10 h-10 animate-spin text-blue-500' />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className={`flex items-center justify-center h-[80vh] ${darkBg}`}>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500/50 mx-auto mb-4' />
          <p className='text-xl font-bold text-white'>Ma'lumotlarni yuklashda xatolik</p>
        </div>
      </div>
    )
  }

  const stats = data.data

  const filteredTransactions = (stats.transactions as Transaction[]).filter((t: Transaction) => {
    const matchesSearch = searchQuery === '' ||
      (t.student?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (t.teacher?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    const matchesProvider = providerFilter === 'all' || t.provider === providerFilter

    return matchesSearch && matchesStatus && matchesProvider
  })

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      COMPLETED: { label: 'Success', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      PENDING: { label: 'Pending', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
      CANCELLED: { label: 'Canceled', className: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
      FAILED: { label: 'Failed', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    }
    const config = statusConfig[status] || statusConfig.PENDING
    return (
        <Badge className={`${config.className} border font-bold px-3 py-0.5 rounded-lg shadow-sm`}>
            {config.label}
        </Badge>
    )
  }

  return (
    <div className={`space-y-8 p-2 ${darkBg} text-slate-200 min-h-screen font-sans`}>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-4xl font-black text-white tracking-tight'>Payments</h1>
          <p className={`${textMuted} mt-1 font-medium`}>Tranzaksiyalarni real vaqtda kuzatib boring</p>
        </div>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl px-6 h-12 shadow-lg shadow-blue-600/20 transition-all active:scale-95'>
          <Download className='w-5 h-5 mr-2' />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[
          { title: 'Jami tushum', val: stats.totalRevenue, icon: DollarSign, color: 'text-emerald-400', sub: `${stats.completedCount} darslar` },
          { title: 'Kutilmoqda', val: stats.pendingAmount, icon: Clock, color: 'text-amber-400', sub: `${stats.pendingPayments} to'lovlar` },
          { title: 'Success Rate', val: `${stats.successRate}%`, icon: TrendingUp, color: 'text-blue-400', sub: 'Muvaffaqiyatli darslar' },
          { title: 'Bekor qilingan', val: stats.canceledAmount, icon: XCircle, color: 'text-rose-400', sub: `${stats.canceledCount} bekor qilindi` },
        ].map((item, i) => (
          <Card key={i} className={`${cardBg} rounded-[32px] border group hover:border-white/10 transition-all duration-300`}>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className={`text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>
                <item.icon className='w-4 h-4' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-black text-white'>
                {typeof item.val === 'number' ? item.val.toLocaleString() : item.val}
                {typeof item.val === 'number' && <span className='text-sm ml-1 opacity-40 font-normal'>so'm</span>}
              </div>
              <p className={`text-[11px] ${textMuted} mt-2 font-semibold`}>{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className={`${cardBg} rounded-[32px] overflow-hidden`}>
        <CardContent className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='md:col-span-2 relative'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600' />
              <Input
                placeholder='Student, Ustoz yoki Tranzaksiya ID...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-white/[0.03] border-white/10 rounded-2xl h-12 pl-12 text-white placeholder:text-slate-600 focus:border-blue-500/40'
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='bg-white/[0.03] border-white/10 rounded-2xl h-12 text-slate-300'>
                <SelectValue placeholder='Holat' />
              </SelectTrigger>
              <SelectContent className='bg-[#11141d] border-white/10 text-slate-300'>
                <SelectItem value='all'>Barcha holatlar</SelectItem>
                <SelectItem value='COMPLETED'>Success</SelectItem>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='CANCELLED'>Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className='bg-white/[0.03] border-white/10 rounded-2xl h-12 text-slate-300'>
                <SelectValue placeholder='Provayder' />
              </SelectTrigger>
              <SelectContent className='bg-[#11141d] border-white/10 text-slate-300'>
                <SelectItem value='all'>Barcha turlari</SelectItem>
                <SelectItem value='Click'>Click</SelectItem>
                <SelectItem value='Payme'>Payme</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className={`${cardBg} rounded-[32px] overflow-hidden`}>
        <CardHeader className='border-b border-white/5 py-6 flex flex-row items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='p-2 bg-emerald-500/10 rounded-xl'>
                    <CreditCard className='w-4 h-4 text-emerald-400' />
                </div>
                <span className='text-lg font-black text-white'>Tranzaksiyalar</span>
            </div>
            <span className={`text-[11px] font-black bg-white/5 px-3 py-1 rounded-lg ${textMuted}`}>
              {filteredTransactions.length} ta natija
            </span>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader className='bg-white/[0.01]'>
                <TableRow className='border-white/5 hover:bg-transparent'>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest h-14`}>Sana</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest`}>Student</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest`}>Ustoz</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest text-right`}>Summa</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest text-center`}>Status</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest`}>Provayder</TableHead>
                  <TableHead className={`${textMuted} font-black uppercase text-[10px] tracking-widest text-right`}>Boshqaruv</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow key={transaction.id} className='border-white/5 hover:bg-white/[0.02] transition-colors'>
                    <TableCell className='font-bold text-slate-400'>
                      {new Date(transaction.date).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell className='font-bold text-white'>{transaction.student?.name || 'N/A'}</TableCell>
                    <TableCell className='text-slate-400'>{transaction.teacher?.name || 'N/A'}</TableCell>
                    <TableCell className='text-right font-black text-white'>
                      {Number(transaction.amount).toLocaleString()} <span className='text-[10px] text-slate-500 font-normal'>so'm</span>
                    </TableCell>
                    <TableCell className='text-center'>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <Badge variant='outline' className='bg-white/[0.02] border-white/10 text-slate-400 font-bold'>
                        {transaction.provider}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' className='rounded-xl hover:bg-blue-500/10 hover:text-blue-400 text-slate-500 font-bold'>
                        Batafsil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}