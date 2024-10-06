import { ContactStrings } from "@/lib/strings/landing";
import React from "react";
import ContactForm from "./ContactForm";
import { Heading } from "@/components/ui/heading";

const Contact = () => {
  return (
    <div
      style={{ minHeight: "600px" }}
      className="bg-whitebg rounded-xl py-8 px-6 flex flex-col items-center justify-center mt-8"
    >
      <Heading level={2} className="header-square relative text-blue">
        {ContactStrings.header}
      </Heading>
      <p className="text-darkgray mt-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, nisi.
      </p>
      <ContactForm />
    </div>
  );
};

export default Contact;
