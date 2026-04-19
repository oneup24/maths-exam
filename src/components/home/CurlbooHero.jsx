export default function CurlbooHero({ name, streak, isBirthday }) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg mb-4 h-40 bg-gradient-to-br from-orange-500 to-amber-400">
      {/* Left: text */}
      <div className="absolute left-0 top-0 bottom-0 w-[60%] flex flex-col justify-center pl-5 pt-1">
        {name && (
          <p className="text-white/90 font-bold text-sm mb-0.5">你好，{name}！</p>
        )}
        <h2 className="text-white font-black text-2xl leading-tight">數學特訓</h2>
        <p className="text-white/75 text-xs font-medium mb-2">Maths Quests</p>

        {streak > 0 && (
          <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full self-start">
            🔥 {streak}日連續
          </span>
        )}
        {isBirthday && (
          <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full self-start mt-1">
            🎂 生日快樂！
          </span>
        )}
      </div>

      {/* Right: mascot */}
      <div className="absolute right-0 bottom-0 w-[44%] h-[115%] flex items-end justify-center">
        <img
          src="/mascot.webp"
          alt="Curlboo"
          className="w-full h-full object-contain object-bottom drop-shadow-lg"
        />
        {/* Dev placeholder label — remove when real 300×380px PNG provided */}
        <span className="absolute bottom-1 right-1 text-[9px] text-white/40 pointer-events-none">300×380px PNG</span>
      </div>
    </div>
  );
}
