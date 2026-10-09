import { mergeProps } from "solid-js";

export default function Logo(props) {
  const config = mergeProps(
    {
      class: "",
      theme: "light",
      size: "md",
    },
    props,
  );

  // Added dynamic 'nudge' class mapping based on scale requirements
  const sizeMap = {
    sm: {
      height: "h-8", // 32px icon
      text: "text-lg", // 18px text
      gap: "gap-1",
      nudge: "-translate-y-[2.5px]", // Precise proportional lift
    },
    md: {
      height: "h-14", // 56px icon
      text: "text-3xl", // 30px text
      gap: "gap-1",
      nudge: "-translate-y-[5px]", // Perfectly scaled equivalent
    },
    lg: {
      height: "h-24", // 96px icon
      text: "text-5xl", // 48px text
      gap: "gap-1",
      nudge: "-translate-y-2", // 8px lift
    },
  };

  const currentSize = () => sizeMap[config.size] || sizeMap.md;
  const isDark = () => config.theme === "dark";

  const transitionClass = "transition-colors duration-300 ease-in-out";

  const mainTextColor = () =>
    `${isDark() ? "text-zinc-100" : "text-zinc-800"} ${transitionClass}`;
  const reelColor = () =>
    `${isDark() ? "text-zinc-400" : "text-zinc-900"} ${transitionClass}`;
  const accentColor = () =>
    `${isDark() ? "text-emerald-400" : "text-emerald-600"} ${transitionClass}`;

  return (
    <div
      class={`inline-flex items-center ${currentSize().gap} ${config.class}`}
    >
      {/* Left: Perforated Ring Icon Mark */}
      <svg
        class={`${currentSize().height} w-auto aspect-square ${reelColor()}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://w3.org"
      >
        <path
          d="M 26 26 A 34 34 0 0 1 74 26"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          d="M 84 36 A 34 34 0 0 1 84 64"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          d="M 74 74 A 34 34 0 0 1 26 74"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          d="M 16 64 A 34 34 0 0 1 16 36"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
        />

        {/* Central Play Button */}
        <path
          class={accentColor()}
          d="M 42 35 L 67 50 L 42 65 Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="4"
          stroke-linejoin="round"
        />
      </svg>

      {/* Right: Wordmark with dynamic, size-aware nudge */}
      <span
        class={`font-logo ${currentSize().text} font-bold tracking-tight ${mainTextColor()} relative ${currentSize().nudge}`}
      >
        proje<span class={accentColor()}>k</span>tor
      </span>
    </div>
  );
}
