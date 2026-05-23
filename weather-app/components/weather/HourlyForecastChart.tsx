"use client";
import { ForecastData } from "@/lib/types/weather";
import { useEffect, useRef, useState } from "react";
import {
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface HourlyForecastChartProps {
  forecast: ForecastData;
}

interface CustomLabelProps {
  x?: number;
  y?: number;
  value?: number | string;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
}

// Custom dot: hanya titik kecil putih transparan, tanpa kuning
const CustomDot = (props: CustomDotProps) => {
  const { cx, cy } = props;
  return (
    <g>
      {/* Garis vertikal halus dari atas chart ke dot */}
      <line
        x1={cx}
        y1={0}
        x2={cx}
        y2={(cy || 0) - 6}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      {/* Dot kecil transparan */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1}
      />
    </g>
  );
};

// Custom label suhu di atas dot
const CustomLabel = (props: CustomLabelProps) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={(y || 0) - 26}
      textAnchor="middle"
      fill="#e4e4e7"
      fontSize={24}
      fontWeight={300}
      fontFamily="inherit"
    >
      {value}°
    </text>
  );
};

export default function HourlyForecastChart({
  forecast,
}: HourlyForecastChartProps) {
  const VISIBLE_COUNT = 10; // Tambah jumlah jam yang terlihat agar gap lebih rapat
  const scrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(() => {
    const now = Date.now() / 1000;
    let closest = 0;
    let minDiff = Infinity;

    forecast.list.forEach((item, i) => {
      const diff = Math.abs(item.dt - now);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    return Math.max(0, Math.min(closest, forecast.list.length - VISIBLE_COUNT));
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);

  const [currentTime] = useState(() => Date.now());

  const closestNowIndex = () => {
    let closesIndex = 0;
    let minDiff = Infinity;
    forecast.list.forEach((item, i) => {
      const diff = Math.abs(item.dt * 1000 - currentTime);
      if (diff < minDiff) {
        minDiff = diff;
        closesIndex = i;
      }
    });
    return closesIndex;
  };

  // Buat data lengkap dari semua forecast (max 40 item = 5 hari)
  const allData = forecast.list.map((item, index) => {
    const date = new Date(item.dt * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const isNow = index === closestNowIndex();
    return {
      time: `${hours}:00`,
      temp: Math.round(item.main.temp),
      isNow,
      dt: item.dt,
    };
  });

  const maxOffset = allData.length - VISIBLE_COUNT;
  const visibleData = allData.slice(offset, offset + VISIBLE_COUNT);

  const slide = (dir: "left" | "right") => {
    if (isAnimating) return;
    const newOffset =
      dir === "right"
        ? Math.min(offset + VISIBLE_COUNT, maxOffset) // Slide satu halaman penuh
        : Math.max(offset - VISIBLE_COUNT, 0); // Slide satu halaman penuh
    if (newOffset === offset) return;

    setSlideDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setOffset(newOffset);
      setIsAnimating(false);
      setSlideDir(null);
    }, 280);
  };

  const canLeft = offset > 0;
  const canRight = offset < maxOffset;

  return (
    <div className="w-full relative mt-4">
      {/* Slide animation wrapper dengan gradient overlay mask untuk efek soft fading */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          position: "relative",
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div
          style={{
            transition: isAnimating
              ? "transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease"
              : "none",
            transform: isAnimating
              ? slideDir === "right"
                ? "translateX(-18px)"
                : "translateX(18px)"
              : "translateX(0)",
            opacity: isAnimating ? 0.6 : 1,
          }}
        >
          <div className="w-full h-52 pt-2 pb-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visibleData}
                margin={{ top: 38, right: -10, left: -10, bottom: 8 }} // Margin direntangkan melebih batas agar garis memanjang
              >
                <YAxis domain={["auto", "auto"]} hide />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={({ x, y, payload, index }) => {
                    const item = visibleData[index];
                    const isNowItem = item?.isNow;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        {/* Indikator "NOW" kecil */}
                        {isNowItem && (
                          <text
                            x={0}
                            y={-4}
                            textAnchor="middle"
                            fill="#facc15"
                            fontSize={9}
                            fontWeight={600}
                            letterSpacing={1}
                          >
                            NOW
                          </text>
                        )}
                        <text
                          x={0}
                          y={14}
                          textAnchor="middle"
                          fill={isNowItem ? "#facc15" : "#a1a1aa"}
                          fontSize={15}
                          fontWeight={isNowItem ? 500 : 300}
                        >
                          {payload.value}
                        </text>
                      </g>
                    );
                  }}
                  dy={8}
                />
                <Line
                  type="basis" // lebih melengkung dari monotone
                  dataKey="temp"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth={1.5}
                  dot={<CustomDot />}
                  activeDot={{ r: 5, fill: "#facc15", strokeWidth: 0 }}
                  isAnimationActive={true}
                  animationDuration={400}
                >
                  <LabelList content={<CustomLabel />} dataKey="temp" />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => slide("left")}
        disabled={!canLeft || isAnimating}
        aria-label="Slide kiri"
        className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 z-10
          w-8 h-8 flex items-center justify-center rounded-lg
          bg-white/10 backdrop-blur-sm border border-white/10
          text-zinc-300 hover:bg-white/20 hover:text-white
          disabled:opacity-20 disabled:cursor-not-allowed
          transition-all duration-300 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7L9 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={() => slide("right")}
        disabled={!canRight || isAnimating}
        aria-label="Slide kanan"
        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10
          w-8 h-8 flex items-center justify-center rounded-lg
          bg-white/10 backdrop-blur-sm border border-white/10
          text-zinc-300 hover:bg-white/20 hover:text-white
          disabled:opacity-20 disabled:cursor-not-allowed
          transition-all duration-300 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M5 3L9 7L5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dots indicator progress */}
      <div className="flex justify-center gap-1 mt-3">
        {Array.from({
          length: Math.ceil(allData.length / VISIBLE_COUNT),
        }).map((_, i) => {
          // deteksi apakah ini adalah blok / page yang aktif
          const currentPage = Math.round(offset / VISIBLE_COUNT);
          const isActive = currentPage === i;

          return (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? 16 : 4,
                height: 4,
                background: isActive
                  ? "rgba(250,204,21,0.8)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
