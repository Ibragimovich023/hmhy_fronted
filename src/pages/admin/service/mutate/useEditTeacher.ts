import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export interface EditTeacherData {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    subject?: string;
    experience?: number;
    password?: string;
}

interface EditTeacherVariables {
    id: string | number;
    data: EditTeacherData;
}

export const useEditTeacher = () => {
    return useMutation({
        mutationFn: ({ id, data }: EditTeacherVariables) =>
            request.patch(`/teacher/${id}`, data).then(res => res.data),
    });
};