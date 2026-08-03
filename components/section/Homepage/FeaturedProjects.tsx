import CapabilitiesSlider from "./CapabilitiesSlider";

const FeaturedProjects = () => {
  return (
    <section className="relative w-full lg:py-37.5 sm:py-20 py-10">
      <h2 className=" sm:text-4xl text-2xl text-center">
        Our{" "}
        <span className="text-primary">
          <i>Featured</i> Projects
        </span>
      </h2>
      <CapabilitiesSlider />
    </section>
  );
};

export default FeaturedProjects;
