import { aasanas, type Aasana } from '../data/aasanas';

type Props = {
  value: Aasana;
  onChange: (next: Aasana) => void;
};

export function AasanaDropdown({ value, onChange }: Props) {
  return (
    <div className="aasana-dropdown-wrap">
      <select
        className="aasana-dropdown"
        aria-label="Choose an asana"
        value={value.id}
        onChange={(e) => {
          const next = aasanas.find((a) => a.id === e.target.value);
          if (next && next.id !== value.id) onChange(next);
        }}
      >
        <option value="" disabled hidden>
          Select aasana
        </option>
        {aasanas.map((aasana) => (
          <option key={aasana.id} value={aasana.id}>
            {aasana.name}
          </option>
        ))}
      </select>
      <span className="dropdown-arrow" />
    </div>
  );
}
