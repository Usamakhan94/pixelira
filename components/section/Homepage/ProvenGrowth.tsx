import { PiMagnifyingGlass } from "react-icons/pi";
import { RiStackLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import Image from "next/image";

const ProvenGrowth = () => {
  const process = [
    {
      icon: PiMagnifyingGlass,
      title: "Discover",
      description:
        "We audit your brand, audience, & competitors to uncover gaps, opportunities, & quick wins that others miss.",
    },
    {
      icon: RiStackLine,
      title: "Execute",
      description:
        "We launch campaigns, test continuously, and optimize performance to improve results every day.",
    },
    {
      icon: GoGear,
      title: "Strategize",
      description:
        "We turn insights into a focused, data-driven roadmap with clear channels, messaging, and measurable goals.",
    },
  ];

  return (
    <section className="">
      <div className="mb-20 max-w-120 text-center mx-auto">
        <h2 className=" text-4xl text-center mb-4">
          Our proven{"  "}
          <span className="text-primary xl:block">
            <i>growth</i> process
          </span>
        </h2>
        <p>
          Pixelira is a no-non sense digital agency delivering growth to
          startups and medium-sized companies.
        </p>
      </div>
      <div className="container">
        <div className="grid grid-cols-3 gap-4 mb-7.5">
          {process.map((item, index) => (
            <div key={index + 1} className=" p-10 bg-card rounded-[24px]">
              <div className="flex items-center justify-center w-13 h-13 p-3.5 rounded-[16px] bg-[rgba(191,182,164,0.07)] opacity-80 mb-24.75">
                <item.icon className="text-white w-full h-full" />
              </div>
              <div>
                <h3 className="text-white text-md font-medium pb-3.5 mb-3.5 border-b border-white/20">
                  {item.title}{" "}
                </h3>
                <p className="text-muted text-body leading-tight ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className=" p-10 bg-linear-to-t from-[#50338C] to-[#8B59F2] rounded-[24px] flex items-stretch gap-17.5 ">
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-center w-13 h-13 p-3.5 rounded-[16px] bg-white mb-24.75">
              <FaArrowTrendUp className="text-primary w-full h-full" />
            </div>
            <div>
              <h3 className="text-white text-xl font-medium pb-3.5 mb-3.5 border-b border-white/20">
                Scale{" "}
              </h3>
              <p className="text-white text-body leading-tight ">
                We invest more into what’s working to drive <br /> stronger
                results, higher ROI, and long-term growth.
              </p>
              <AnimatedButton
                className="mt-14.75"
                trailingContent={<AnimatedArrowIcon />}
              >
                Book an Appointment
              </AnimatedButton>
            </div>
          </div>
          <div className="rounded-[10px] overflow-hidden min-w-88.75">
            <Image
              className="w-full h-full object-cover"
              src={"/make-call.gif"}
              width="355"
              height="390"
              alt="Make a Call"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvenGrowth;
