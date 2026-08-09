import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IndustryAbout = () => {
  const accordionItems = [
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Brand Strategy",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
  ];
  return (
    <section className="sm:py-37.5 overflow-hidden relative isolate">
      <div className=" px-4 md:px-20 xl:px-40">
        <div className="container">
          <div className="grid grid-cols-2">
            <h2 className="text-3xl">
              Automotive Agency & Consulting{" "}
              <i className="text-primary">Firm Services</i>
            </h2>
            <p className="text-body max-w-95 ml-auto">
              We help automotive brands stay ahead of the curve. From
              data-driven strategies to game-changing digital experiences, we
              provide the tools and expertise that fuel growth and unlock new
              opportunities in the fast- evolving automotive landscape.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-normal [&_svg]:hidden! underline-0! bg-primary text-white py-6.25">
              <span className="max-w-360 w-full mx-auto flex items-center gap-14.75">
                <span>01</span>
                Brand Strategy
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="max-w-360 mx-auto">
                Yes. It adheres to the WAI-ARIA design pattern.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default IndustryAbout;
