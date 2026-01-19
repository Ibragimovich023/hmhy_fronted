import { useNavigate } from "react-router-dom";
import { Shield, GraduationCap, Users, ArrowRight } from "lucide-react";

import adminImg from "@/assets/admin.png";
import teacherImg from "@/assets/teacher.png";
import studentImg from "@/assets/student.png";
import { HMHYText } from "../components/hmhy";

type RoleItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  path: string;
  image: string;
  buttonText: string;
  glowColor: string;
};

export default function RoleSelect() {
  const navigate = useNavigate();

  const roles: RoleItem[] = [
    {
      title: "Admin",
      desc: "Tizimni to'liq nazorat qilish va boshqarish.",
      icon: <Shield className="w-5 h-5" />,
      path: "/admin/login",
      image: adminImg,
      buttonText: "Admin login",
      glowColor: "group-hover:shadow-blue-500/20",
    },
    {
      title: "Teacher",
      desc: "Darslar, guruhlar va talabalar nazorati.",
      icon: <GraduationCap className="w-5 h-5" />,
      path: "/teacher/login",
      image: teacherImg,
      buttonText: "Teacher login",
      glowColor: "group-hover:shadow-emerald-500/20",
    },
    {
      title: "Student",
      desc: "Telegram bot orqali natijalarni kuzatish.",
      icon: <Users className="w-5 h-5" />,
      path: "/telegram",
      image: studentImg,
      buttonText: "Student page",
      glowColor: "group-hover:shadow-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#02040a] text-slate-200 relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-4">
            <div className="scale-110 md:scale-125">
              <HMHYText />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90">
              Platformasiga kirish
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.path}
              className={`group relative bg-[#0a0c14] border border-white/5 rounded-[32px] p-8 transition-all duration-500 hover:border-white/10 hover:-translate-y-2 shadow-2xl ${role.glowColor}`}
            >
              {/* Profile Image (Dumaloq shaklda) */}
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden bg-[#111420] p-1">
                  <img
                    src={role.image}
                    alt={role.title}
                    className="w-full h-full object-cover rounded-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Small Floating Icon */}
                <div className="absolute -bottom-2 -right-2 p-2 bg-[#1a1d29] border border-white/10 rounded-xl text-blue-400 shadow-lg">
                  {role.icon}
                </div>
              </div>

              {/* Text Info */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
                  {role.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed px-4">
                  {role.desc}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(role.path)}
                className="w-full group/btn relative flex items-center justify-center gap-2 bg-white/[0.03] hover:bg-white text-white hover:text-black border border-white/10 py-3.5 rounded-2xl font-semibold transition-all duration-300"
              >
                <span className="text-sm">{role.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <p className="text-center mt-16 text-slate-600 text-xs tracking-[4px] uppercase">
          Secure Access Controll
        </p>
      </div>
    </div>
  );
}