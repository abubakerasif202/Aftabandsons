import { ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";
import { SERVICES } from "../constants/site";

const Services = () => (
  <section
    id="services"
    data-testid="services-section"
    className="relative bg-[#0A0A0A] py-24 sm:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
          <span className="h-px w-10 bg-[#D4AF37]" />
          What We Move
        </p>
        <h2
          data-testid="services-heading"
          className="max-w-2xl font-display text-5xl tracking-wide text-white uppercase sm:text-6xl"
        >
          Freight Services Built for Australian Business
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-[#C0C0C0]/15 bg-[#C0C0C0]/15 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1} className="h-full">
            <a
              href="#contact"
              data-testid={`service-card-${service.id}`}
              className="group flex h-full flex-col bg-[#0A0A0A] transition-colors duration-300 hover:bg-[#141414]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={`Aftab & Sons Transport — ${service.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl tracking-wider text-white uppercase">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                  Enquire
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
