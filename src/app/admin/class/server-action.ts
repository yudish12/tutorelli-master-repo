'use server'
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse } from "@/lib/types/action.types";
import { Class } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient();


export const deleteClass = async (id: string):Promise<adminActionsResponse> => {
    const { error } = await supabase.from("subject").delete().eq("id", id);
    if (error) {
        console.log(error);
        return {message: "cannot delete subject it is associated with any session,student or tutor", success: false};
    }
    return {message: "Subject deleted successfully", success: true};
};

export const createClass = async (payload: any):Promise<adminActionsResponse> => {
    const { data, error } = await supabase
        .from("class")
        .insert([
            {
                name: payload.name,
            },
        ])
        .select("id");

    if (error) {
       return {message: "cannot create class", success: false};
    }
    return {message: "Class created successfully", success: true,data:data};
};

export const updateClass = async (payload: any,id?:string):Promise<adminActionsResponse> => {
    if(!id){
        return {message: "id is required", success: false};
    }
    const { data, error } = await supabase
        .from("class")
        .update({
            name: payload.name,
        })
        .eq("id",id);

    if (error) {
        return {message: "cannot update subject", success: false};
    }
    return {message: "Subject updated successfully", success: true,data:data};
};