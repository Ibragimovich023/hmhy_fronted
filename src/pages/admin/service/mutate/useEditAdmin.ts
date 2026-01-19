import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export interface UpdateAdminData {
    username?: string;
    phoneNumber?: string;
    password?: string;
    role?: string;
}

interface UpdateAdminVariables {
    id: string;
    data: UpdateAdminData;
}

export const useUpdateAdmin = () => {
    return useMutation({
        mutationFn: ({ id, data }: UpdateAdminVariables) =>
            request.patch(`/admin/${id}`, data).then(res => res.data),
    });
};