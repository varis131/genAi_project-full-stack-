import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName =
    user?.username?.split(" ")[0] || user?.username || user?.email || "there";

  const sectionClasses =
    "hero-bg relative min-h-screen overflow-hidden px-4 pt-9 text-white";

  const headerTextColor = "text-gray-400";
  const subHeaderPillText = "text-pink-300/90";
  const bodyTextColor = "text-gray-300";
  const smallAccentText = "text-pink-300/90";
  const secondaryButtonClasses =
    "rounded-full border border-pink-300/40 bg-black/40 px-8 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-500/10";
  const testimonialsHeaderText = "text-gray-400";
  const testimonialsButtonText = "text-gray-500";
  const testimonialCardBase =
    "min-w-[240px] rounded-2xl border p-4 text-xs transition-transform duration-200 ease-out hover:scale-[1.02] hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.55)]";
  const testimonialCardClasses = `${testimonialCardBase} border-white/10 bg-black/40 text-gray-200`;
  const testimonialHandleText = "text-pink-300";
  const testimonialBodyText = "text-gray-300";

  return (
    <section className={sectionClasses}>
      {/* floating star dots */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="star-dot absolute left-10 top-24 h-1.5 w-1.5 rounded-full bg-pink-400/90"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="star-dot absolute right-12 top-40 h-1.5 w-1.5 rounded-full bg-indigo-300/90"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="star-dot absolute left-1/3 bottom-32 h-1.5 w-1.5 rounded-full bg-fuchsia-400/90"
          style={{ animationDelay: "2.4s" }}
        />
        <div
          className="star-dot absolute right-1/4 bottom-16 h-1.5 w-1.5 rounded-full bg-blue-300/90"
          style={{ animationDelay: "3.4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center pb-10 pt-10 md:pt-14">
        <header
          className={`mb-8 flex items-center justify-between text-[11px] ${headerTextColor}`}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.9)]" />
            InterviewCraft
          </span>
          <span
            className={`hidden rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] md:inline-block ${subHeaderPillText}`}
          >
            AI interview studio
          </span>
        </header>

        <div className="flex flex-col items-center text-center md:items-center">
          {/* animated logo */}
          <div className="logo-float mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-pink-500 to-fuchsia-500 shadow-[0_0_60px_rgba(236,72,153,0.9)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-pink-200/80 bg-black/40">
              <div className="h-3 w-3 rounded-full bg-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.9)]" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold md:text-5xl">
            The AI that actually{" "}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-300 bg-clip-text text-transparent">
              prepares you
            </span>
            .
          </h1>

          <p className={`mt-4 max-w-2xl text-sm md:text-base ${bodyTextColor}`}>
            Turn any job description, your resume and how you describe yourself
            into a complete interview game-plan: match score, realistic
            technical & behavioral questions with model answers, skill gaps, a
            day-by-day prep schedule and an ATS-friendly PDF resume.
          </p>

          <p className={`mt-3 text-xs ${smallAccentText}`}>
            Signed in as <span className="font-medium">{firstName}</span>.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 
              px-8 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(236,72,153,0.9)]
               transition hover:from-pink-400 hover:to-fuchsia-400 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Start Preparing
            </button>
          </div>
        </div>

        <section className="mt-10 space-y-4">
          <div
            className={`flex items-center justify-between text-[11px] ${testimonialsHeaderText}`}
          >
            <span className="flex items-center gap-2 cursor-pointer">
              <span className="text-pink-400">›</span>
              What people say
            </span>
            <button
              className={`text-[10px] uppercase tracking-[0.18em] ${testimonialsButtonText} hover:text-pink-300`}
            >
              View all
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            <article className={testimonialCardClasses}>
              <p className={`mb-1 font-semibold ${testimonialHandleText}`}>
                @frontend_dev
              </p>
              <p className={`italic ${testimonialBodyText}`}>
                “The match score and daily plan made it way easier to focus.”
              </p>
            </article>

            <article className={testimonialCardClasses}>
              <p className={`mb-1 font-semibold ${testimonialHandleText}`}>
                @datascience_girl
              </p>
              <p className={`italic ${testimonialBodyText}`}>
                “The behavioral questions plus suggested answers felt real.”
              </p>
            </article>

            <article className={testimonialCardClasses}>
              <p className={`mb-1 font-semibold ${testimonialHandleText}`}>
                @systemdesign_guy
              </p>
              <p className={`italic ${testimonialBodyText}`}>
                “Having a day-by-day plan removed so much stress.”
              </p>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Hero;
