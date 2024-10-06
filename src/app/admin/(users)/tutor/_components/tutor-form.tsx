"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const TutorForm = ({ tutorName, id }: { tutorName?: string; id?: string }) => {
  return <div>TutorForm</div>;
};

export default TutorForm;
