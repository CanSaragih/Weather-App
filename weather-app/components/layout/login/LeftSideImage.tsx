import Image from "next/image";
import { AiFillSun } from "react-icons/ai";

export default function LeftSideImage() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/background.png"
          alt="Cinematic weather background"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 dark:bg-linear-to-r dark:from-transparent dark:to-[#131313]" />
        <div className="absolute inset-0 dark:bg-linear-to-t dark:from-[#131313] dark:via-transparent dark:to-transparent" />
      </div>

      {/* Floating Glass Card */}
      <div
        className="relative z-10 flex flex-col items-center gap-8 p-12 rounded-3xl"
        style={{
          background: "rgba(19, 19, 19, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 40px 0 rgba(250, 155, 0, 0.2)",
        }}
      >
        {/* Sun Icon + Glow */}
        <div className="relative flex items-center justify-center">
          <AiFillSun size={160} className="text-[#ffc07a]" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "rgba(250, 155, 0, 0.3)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="text-center">
          <h2
            className="text-[48px] font-semibold tracking-tighter leading-14 mb-2"
            style={{ color: "#e5e2e1" }}
          >
            Weatherly
          </h2>
          <p className="text-[16px] leading-6 max-w-xs text-zinc-400 mt-2">
            Cinematic Data Precision for the Modern Explorer.
          </p>
        </div>
      </div>
    </>
  );
}
