import ServicesCards from "./ServicesCards";

const Services = () => {
  const servicesList = [
    {
      title: "Animation",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
    {
      title: "Automation",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
    {
      title: "Branding",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
    {
      title: "Development",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
    {
      title: "Marketing",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
    {
      title: "User-interface Design",
      imgUrl: "/services/branding.png",
      href: "/services/web-development",
    },
  ];

  return (
    <section className="py-37.5">
      <div className="container">
        <div className="flex flex-col">
          {servicesList.map((cardDetails, index) => (
            <ServicesCards
              key={index}
              i={index}
              cardDetails={cardDetails}
              servicesList={servicesList}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
