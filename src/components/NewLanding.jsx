import React from "react";
import Starter from "./Starter";
import Explore from "./Explore";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const nutriChimpFAQ = [
  {
    ques: "What is NutriChimp?",
    ans: "Nutrichimp is an AI based tool to create custom meal plan for your child based on his/her cuisine and taste preferences., while staying within broad Government nutrition guidelines.",
  },
  {
    ques: "Why Nutrichimp?",
    ans: "Mothers of young children often find it difficult to look for tasty and healthy Meals that kids want to eat themselves. Food times that are not junk but tasty, healthy yet interesting for kids and easy to prepare. Only a mother can understand the constant guilt of not doing enough for her child, Nutrichimp was started by one such mother who decided to leverage AI to solve this problem",
  },
  {
    ques: "Why do Nutrichimp Meals have such names?",
    ans: "It is to excite the kids. Try using the names and see how your kid reacts.",
  },
  {
    ques: "Are these Meals healthy?",
    ans: "Yes, 100%. These meals are created based on nutrition guidelines issued by a Govt Health department of one of the top ranked countries in this area.",
  },
  {
    ques: "What Health guidelines do you follow?",
    ans: "Government published nutrition guidelines for kids",
  },
  {
    ques: "How can I reach the Nutrichimp team?",
    ans: "Email at totsmart@gmail.com",
  },
];


const NewLanding = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Starter />
      <Explore />
      <h4 id="faq" name="faq" className="font-bold text-5xl text-center">
        FAQs
      </h4>
      <Card className="py-4 mb-10 w-full max-w-[1280px] mx-auto !bg-[#F6FBE9]">
        <CardBody className="overflow-visible py-2">
          <Accordion hideIndicator>
            {nutriChimpFAQ.map((faq, index) => (
              <AccordionItem
                key={faq.ques}
                aria-label={faq.ques}
                title={index + 1 + ". " + faq.ques}
              >
                {faq.ans}
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewLanding;
