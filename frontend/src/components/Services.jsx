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

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1} className="h-full">
            <a
              href="#contact"
              aria-label={`Enquire about ${service.title}`}
              data-testid={`service-card-${service.id}`}
              className="group relative flex h-full flex-col border border-[#C0C0C0]/15 bg-[#141414] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37]/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Top accent indicator */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#C81010] group-hover:via-[#D4AF37] group-hover:to-[#C81010]" />

              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={`Aftab & Sons Transport — ${service.title}`}
                  loading="lazy"
                  decoding="async"
                  width="1672"
                  height="941"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent opacity-90" />
                <span className="absolute top-3 right-4 font-display text-3xl font-bold tracking-wider text-[#C0C0C0]/30 transition-colors duration-300 group-hover:text-[#D4AF37]">
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <h3 className="font-display text-2xl tracking-wider text-white uppercase transition-colors duration-200 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#C0C0C0]/10 pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase transition-colors duration-200 group-hover:text-white">
                    Enquire
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D4AF37]" />
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#A1A1AA]/60 uppercase">
                    Commercial
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
