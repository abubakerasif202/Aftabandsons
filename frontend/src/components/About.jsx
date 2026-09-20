import Reveal from "./motion/Reveal";
import { IMAGES, SITE } from "../constants/site";

const OWNERS = [
  {
    image: IMAGES.owner1,
    name: "Muhammad Samar Aftab",
    role: null,
    alt: "Muhammad Samar Aftab of Aftab & Sons Transport",
  },
  {
    image: IMAGES.owner2,
    name: "Muhammad Umer Aftab",
    role: "Director",
    alt: "Muhammad Umer Aftab, Director of Aftab & Sons Transport",
  },
];

const About = () => (
  <section
    id="about"
    data-testid="about-section"
    className="relative bg-[#0A0A0A] py-24 sm:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
            <span className="h-px w-10 bg-[#D4AF37]" />
            About Us
          </p>
          <h2
            data-testid="about-heading"
            className="font-display text-5xl tracking-wide text-white uppercase sm:text-6xl"
          >
            Built on People.
            <br />
            <span className="text-[#C81010]">Driven by Australia.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#C0C0C0]">
            {SITE.name} is a family-driven Australian transport business focused
            on truck transport and B-double freight for business customers.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA]">
            From local deliveries to interstate freight, our focus is practical:
            clear communication, careful handling and dependable transport.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#C0C0C0]/15 pt-8">
            {["Truck Transport", "B-Double Freight", "Local", "Interstate"].map((word) => (
              <span
                key={word}
                className="font-display text-lg tracking-[0.2em] text-[#C0C0C0] uppercase"
              >
                {word}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {OWNERS.map((owner, i) => (
            <Reveal key={owner.name} delay={0.15 + i * 0.15} className={i === 1 ? "sm:mt-12" : ""}>
              <figure
                data-testid={`about-owner-${i + 1}`}
                className="group border border-[#C0C0C0]/15 bg-[#141414]"
              >
                <div className="overflow-hidden">
                  <img
                    src={owner.image}
                    alt={owner.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-[#C0C0C0]/15 px-5 py-4">
                  <span className="block text-sm font-bold text-white">
                    {owner.name}
                  </span>
                  {owner.role && (
                    <span className="mt-1 block text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                      {owner.role}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
