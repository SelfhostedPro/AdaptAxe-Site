import { useSnapshot } from 'valtio';
import { GuitarState } from '@/store/guitar';

export function ColorPicker({ colors, label, stateKey }: {
  colors: readonly string[];
  label: string;
  stateKey: 'primary' | 'secondary';
}) {

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <span>{label}</span>
      {colors.map((color) => (
        <div
          key={color}
          className="cursor-pointer size-10 rounded-full border border-neutral-100"
          style={{ background: color }}
          onClick={() => (GuitarState[stateKey] = color)}
        />
      ))}
    </div>
  );
}