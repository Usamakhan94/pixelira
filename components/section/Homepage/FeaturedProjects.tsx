import CapabilitiesSlider from "./CapabilitiesSlider";

const FeaturedProjects = () => {
  return (
    <section className="relative w-full py-37.5">
      <h2 className=" text-4xl text-center">
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
