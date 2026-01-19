import { Home, Users, GraduationCap, DollarSign, BookOpen, User, Shield } from "lucide-react"

export const links = {
    superadmin: [
        {
            title: "Dashboard",
            url: "/app/admin",
            icon: Home,
        },
        {
            title: "Admins",
            url: "/app/admin/admins",
            icon: Shield
        },
        {
            title: "Student",
            url: "/app/admin/student",
            icon: Users,
        },
        {
            title: "Teacher",
            url: "/app/admin/teacher",
            icon: GraduationCap,
        },
        {
            title: "Lesson",
            url: "/app/admin/lesson",
            icon: BookOpen,
        },
        {
            title: "Payment",
            url: "/app/admin/payment",
            icon: DollarSign,
        },
        {
            title: "Profile",
            url: "/app/admin/profile",
            icon: User,
        },
    ],

    admin: [
        {
            title: "Dashboard",
            url: "/app/admin",
            icon: Home,
        },
        {
            title: "Student",
            url: "/app/admin/student",
            icon: Users,
        },
        {
            title: "Teacher",
            url: "/app/admin/teacher",
            icon: GraduationCap,
        },
        {
            title: "Lesson",
            url: "/app/admin/lesson",
            icon: BookOpen,
        },
        {
            title: "Payment",
            url: "/app/admin/payment",
            icon: DollarSign,
        },
        {
            title: "Profile",
            url: "/app/admin/profile",
            icon: User,
        },
    ],

  teacher: [
    {
        title: "Dashboard",
        url: "/teacher/dashboard", 
        icon: Home,
    },
    {
        title: "Student",
        url: "/teacher/student",
        icon: Users,
    },
    {
        title: "Lesson",
        url: "/teacher/lesson",
        icon: BookOpen,
    },
    {
        title: "Profile",
        url: "/teacher/profile", 
        icon: User,
    },
],

}