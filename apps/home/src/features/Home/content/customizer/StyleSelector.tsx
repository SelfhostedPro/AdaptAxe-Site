import { GuitarState } from "@/store/guitar";
import { useSnapshot } from "valtio";

export function StyleSelector() {
  const gsnap = useSnapshot(GuitarState);

  return (
    <div className="flex flex-col gap-2">
      {gsnap.styles.map((style) => (
        <div
          key={style}
          style={{
            color: gsnap.style === style ? gsnap.primary : "#000",
            backgroundColor: gsnap.style === style ? gsnap.secondary : "#FFF",
          }}
          className="cursor-pointer px-2 text-center rounded-full border border-neutral-100 transition-colors duration-200"
          onClick={() => (GuitarState.style = style)}
        >
          {style}
        </div>
      ))}
    </div>
  );
}
