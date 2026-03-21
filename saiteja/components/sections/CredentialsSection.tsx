const CERTIFICATIONS = [
  {
    id: "01",
    name: "Universal Robots e-Series",
    detail: "Core & Pro",
    issuer: "Universal Robots",
    icon: "precision_manufacturing",
  },
  {
    id: "02",
    name: "MathWorks AI Certification",
    detail: "Machine Learning & Deep Learning",
    issuer: "MathWorks",
    icon: "model_training",
  },
  {
    id: "03",
    name: "Hugging Face RL Course",
    detail: "Reinforcement Learning",
    issuer: "Hugging Face",
    icon: "psychology",
  },
  {
    id: "04",
    name: "ROS & ROS2",
    detail: "Robot Operating System",
    issuer: "Udemy",
    icon: "smart_toy",
  },
];

const PUBLICATIONS = [
  {
    id: "PUB-01",
    title: "SCADA-Based Substation Control Panel & Operations",
    venue: "Published Research",
    type: "Technical Publication",
    icon: "article",
    href: "https://drive.google.com/file/d/1Qwj3ca2g2XpTMZeiqUhrv-E_H1pE_LTh/view",
  },
];

export function CredentialsSection() {
  return (
    <section id="manifest" className="px-6 md:px-10 pt-28 pb-24 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="mb-24">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-3 h-3 bg-primary-fixed" />
          <span className="font-label text-sm uppercase tracking-[0.3em] text-outline">
            [ SYSTEM: READY ] [ MODE: MANIFEST ]
          </span>
        </div>
        <h1 className="font-headline text-7xl md:text-8xl italic leading-tight text-on-surface">
          Manifest
        </h1>
        <p className="font-label text-secondary mt-4 tracking-wider uppercase">
          Certifications, Publications &amp; Education
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Certifications */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="w-2 h-2 bg-primary-fixed" />
            <h2 className="font-headline text-4xl italic text-on-surface">
              Certifications
            </h2>
          </div>

          <div className="space-y-px bg-outline-variant/10">
            {CERTIFICATIONS.map(({ id, name, detail, issuer, icon }) => (
              <div
                key={id}
                className="bg-surface p-6 flex items-start gap-5 hover:bg-surface-container-low transition-colors group"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors mt-0.5">
                  {icon}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-label text-sm text-on-surface tracking-wide">
                      {name}
                    </h3>
                    <span className="font-label text-[9px] text-outline uppercase tracking-widest shrink-0">
                      {id}
                    </span>
                  </div>
                  <p className="font-label text-[10px] text-secondary uppercase tracking-widest mt-1">
                    {detail}
                  </p>
                  <p className="font-label text-[10px] text-outline mt-0.5">
                    {issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="w-2 h-2 bg-primary-fixed" />
            <h2 className="font-headline text-4xl italic text-on-surface">
              Publications
            </h2>
          </div>

          <div className="space-y-px bg-outline-variant/10">
            {PUBLICATIONS.map(({ id, title, venue, type, icon, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface p-6 flex items-start gap-5 hover:bg-surface-container-low transition-colors group block"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors mt-0.5">
                  {icon}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-label text-sm text-on-surface leading-snug tracking-wide group-hover:text-primary-fixed transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors text-sm">
                        open_in_new
                      </span>
                      <span className="font-label text-[9px] text-primary-fixed uppercase tracking-widest">
                        {id}
                      </span>
                    </div>
                  </div>
                  <p className="font-label text-[10px] text-secondary uppercase tracking-widest mt-1">
                    {type}
                  </p>
                  <p className="font-label text-[10px] text-outline mt-0.5">
                    {venue}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Education supplement */}
          <div className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-2 h-2 bg-primary-fixed" />
              <h2 className="font-headline text-4xl italic text-on-surface">
                Education
              </h2>
            </div>
            <div className="space-y-px bg-outline-variant/10">
              <div className="bg-surface p-6 hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-label text-sm text-on-surface tracking-wide">Arizona State University</h3>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-widest mt-1">M.S. Robotics &amp; Autonomous Systems</p>
                    <p className="font-label text-[10px] text-outline mt-0.5">GPA: 3.89 / 4.0</p>
                  </div>
                  <span className="font-label text-[9px] text-outline uppercase tracking-widest shrink-0">2024–2026</span>
                </div>
              </div>
              <div className="bg-surface p-6 hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-label text-sm text-on-surface tracking-wide">Chaitanya Bharathi Institute of Technology</h3>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-widest mt-1">B.E. Electrical &amp; Electronics Engineering</p>
                    <p className="font-label text-[10px] text-outline mt-0.5">Hyderabad, Telangana</p>
                  </div>
                  <span className="font-label text-[9px] text-outline uppercase tracking-widest shrink-0">2020–2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
