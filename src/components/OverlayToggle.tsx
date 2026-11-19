import { type Overlay } from '../data/aasanas';

type Props = {
  value: Overlay;
  onChange: (next: Overlay) => void;
};

const OPTIONS: { id: Overlay; label: string }[] = [
  { id: 'pose', label: 'Pose' },
  { id: 'muscles', label: 'Muscles' },
  { id: 'fascia', label: 'Fascia' },
];

export function OverlayToggle({ value, onChange }: Props) {
  return (
    <div className="overlay-toggle" role="tablist" aria-label="Anatomy perspective">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`overlay-btn ${value === option.id ? 'is-active' : ''}`}
          role="tab"
          aria-selected={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
