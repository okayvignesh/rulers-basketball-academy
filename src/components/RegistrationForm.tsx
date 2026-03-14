import Link from "next/link";

export default function RegistrationForm() {
  return (
    <section id="register-form" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="bg-gradient-to-br from-secondary to-dark rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,4vw,2.8rem)] text-white tracking-[2px] leading-tight mb-4">
                Ready to <span className="text-primary">Get Started?</span>
              </h2>
              <p className="text-white/60 text-[1.05rem] leading-relaxed mb-6 max-w-[500px]">
                Register your child today and take the first step toward
                becoming a champion. Fill out our quick registration form and
                our team will get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-white/50 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary" />
                  <span>No prior experience needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary" />
                  <span>All age groups welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary" />
                  <span>Expert coaching</span>
                </div>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-9 py-4 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
              >
                <i className="fas fa-edit" /> Register Now
              </Link>
            </div>

            {/* Right Decorative */}
            <div className="hidden lg:flex items-center justify-center text-[10rem] text-primary/[0.08]">
              <i className="fas fa-basketball-ball" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
