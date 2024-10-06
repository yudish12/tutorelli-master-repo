'use server'
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse, SubjectWithClass } from "@/lib/types/action.types";

const supabase = getSupabaseServerActionClient();

export const getSubjects = async ():Promise<SubjectWithClass[]> => {
    const { data, error } = await supabase.from("subject").select("*,class(name)");
    if (error) {
        throw error;
    }
    return data;
};

export const deleteSubject = async (id: string):Promise<adminActionsResponse> => {
    const { error } = await supabase.from("subject").delete().eq("id", id);
    if (error) {
        console.log(error);
        return {message: "cannot delete subject it is associated with any session,student or tutor", success: false};
    }
    return {message: "Subject deleted successfully", success: true};
};

export const createSubject = async (payload: any):Promise<adminActionsResponse> => {
    const { data, error } = await supabase
        .from("subject")
        .insert([
            {
                name: payload.name,
                class_id: payload.class.value,
            },
        ])
        .select("id");

    if (error) {
       return {message: "cannot create subject", success: false};
    }
    return {message: "Subject created successfully", success: true,data:data};
};

export const updateSubject = async (payload: any,id?:string):Promise<adminActionsResponse> => {
    if(!id){
        return {message: "id is required", success: false};
    }
    const { data, error } = await supabase
        .from("subject")
        .update({
            name: payload.name,
            class_id: payload.class.value,
        })
        .eq("id",id);

    if (error) {
        return {message: "cannot update subject", success: false};
    }
    return {message: "Subject updated successfully", success: true,data:data};
};