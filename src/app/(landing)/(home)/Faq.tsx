import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqStrings, globalStrings } from "@/lib/strings";
import React from "react";

const Faq = () => {
  return (
    <div
      style={{ minHeight: "500px" }}
      className="bg-maths rounded-xl items-center flex py-8 mt-6"
    >
      <Card className="bg-white h-full relative w-1/2 mx-auto before-circle">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">
            {globalStrings.FAQ}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {FaqStrings.map((item) => (
            <Accordion key={item.id} type="multiple" className="w-full">
              <AccordionItem value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Faq;
