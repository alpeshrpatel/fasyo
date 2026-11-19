import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  Moon,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sun,
  Wind,
} from 'lucide-react';
import { aasanas, type Aasana, type Overlay, type Region } from './data/aasanas';
import { AasanaDropdown } from './components/AasanaDropdown';
import { OverlayToggle } from './components/OverlayToggle';

const overlayCopy: Record<Overlay, { eyebrow: string; title: string; body: string }> = {
  pose: { eyebrow: '01 / THE SHAPE', title: 'Find your own depth.', body: 'A grounded squat with space for your breath. Use the illustration as a guide, not a shape you have to force.' },
  muscles: { eyebrow: '02 / THE MUSCLES', title: 'A little give, a little support.', body: 'Some muscles help you hold steady; others may lengthen. The balance shifts with your stance, mobility and support.' },
  fascia: { eyebrow: '03 / THE FASCIA', title: 'Connected, not isolated.', body: 'Fascia wraps and connects tissue through the body. These regions move as part of a larger system, not as separate targets.' },
};

const durations = [30, 45, 60, 90];

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function ArtworkPlaceholder({ asana, layer }: { asana: Aasana; layer: Overlay }) {
  const layerLabel = layer === 'pose' ? 'pose' : layer === 'muscles' ? 'muscle' : 'fascia';

  return (
    <div className="artwork-placeholder" role="img" aria-label={`${asana.name} ${layerLabel} illustration not supplied`}>
      <span>VISUAL GUIDE · {layerLabel.toUpperCase()}</span>
      <strong>{asana.name}</strong>
      <p>{layerLabel[0].toUpperCase() + layerLabel.slice(1)} artwork has not been supplied yet.</p>
    </div>
  );
}

function App() {
  const [selectedAasana, setSelectedAasana] = useState<Aasana>(aasanas[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('fasyo-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [overlay, setOverlay] = useState<Overlay>('pose');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [duration, setDuration] = useState(aasanas[0].defaultHold);
  const [remaining, setRemaining] = useState(aasanas[0].defaultHold);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;
    const timerId = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setIsRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [isRunning, remaining]);

  useEffect(() => {
    document.title = `FASYO | ${selectedAasana.name}`;
  }, [selectedAasana.name]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('fasyo-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171d19' : '#f6f5ef');
  }, [theme]);

  const regions = overlay === 'muscles' ? selectedAasana.muscleRegions : overlay === 'fascia' ? selectedAasana.fasciaRegions : [];
  const copy = overlay === 'pose' ? { ...overlayCopy.pose, body: selectedAasana.description } : overlayCopy[overlay];
  const baseAsset = selectedAasana.assets.base;
  const layerAsset = overlay === 'muscles' ? selectedAasana.assets.muscles : overlay === 'fascia' ? selectedAasana.assets.fascia : undefined;
  const hasAnatomyArt = overlay === 'pose'
    ? Boolean(baseAsset && selectedAasana.assets.muscles && selectedAasana.assets.fascia)
    : Boolean(baseAsset && layerAsset);
  const breathPhase = Math.floor((duration - remaining) % 10);
  const breathCue = breathPhase < 4 ? 'Breathe in' : 'Breathe out';

  function chooseDuration(seconds: number) {
    setDuration(seconds);
    setRemaining(seconds);
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setRemaining(duration);
  }

  function handleAasanaChange(next: Aasana) {
    setSelectedAasana(next);
    setOverlay('pose');
    setSelectedRegion(null);
    setDuration(next.defaultHold);
    setRemaining(next.defaultHold);
    setIsRunning(false);
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="FASYO home">
          <span className="brand-mark">f</span>
          <span>FASYO<span className="brand-period">.</span></span>
        </a>
        <div className="header-asana-selector">
          <AasanaDropdown value={selectedAasana} onChange={handleAasanaChange} />
        </div>
        <span className="header-note">A practice in understanding</span>
        <a className="header-link" href="#explore">Explore pose <ArrowDown size={14} /></a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-pressed={theme === 'dark'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <section className="intro-strip" aria-label={`About ${selectedAasana.name}`}>
        <div className="intro-inner">
          <span className="strip-label">THE PRACTICE</span>
          <p><strong>{selectedAasana.name}</strong> <span>{selectedAasana.sanskrit}</span></p>
          <p className="strip-description">{selectedAasana.description}</p>
          <span className="strip-number">01</span>
        </div>
      </section>

      <section className="explorer section-wrap" id="explore">
        <div className="section-heading">
          <div><p className="eyebrow">A CLOSER LOOK</p><h2>One pose.<br /><em>Three perspectives.</em></h2></div>
          <p className="heading-note">Tap into a region to explore what may be happening in your version of the pose.</p>
        </div>

        <div className="explorer-shell">
          <div className="explorer-toolbar">
            <OverlayToggle value={overlay} onChange={(next) => { setOverlay(next); setSelectedRegion(null); }} />
            <span className="toolbar-caption">{overlay === 'pose' ? 'ALIGNMENT STUDY' : overlay === 'muscles' ? 'MUSCLE MAP' : 'FASCIA MAP'}</span>
          </div>

          <div className="explorer-content">
            <div className={`anatomy-image anatomy-${overlay}`}>
              {hasAnatomyArt && baseAsset ? (
                <>
                  <img className="anatomy-base" src={baseAsset} alt={`${selectedAasana.name} posture shown from front and back`} />
                  {overlay === 'pose' && selectedAasana.assets.muscles && (
                    <img className="anatomy-overlay" src={selectedAasana.assets.muscles} alt={`Muscles involved in ${selectedAasana.name}`} />
                  )}
                  {overlay === 'pose' && selectedAasana.assets.fascia && (
                    <img className="anatomy-overlay" src={selectedAasana.assets.fascia} alt={`Fascia involved in ${selectedAasana.name}`} />
                  )}
                  {layerAsset && <img className="anatomy-overlay" src={layerAsset} alt={`${overlay === 'muscles' ? 'Muscle' : 'Fascia'} layer of ${selectedAasana.name}`} />}
                  {regions.map((region) => (
                    <button
                      key={region.name}
                      type="button"
                      className={`hotspot ${selectedRegion?.name === region.name ? 'hotspot-active' : ''}`}
                      style={{ left: `${region.x}%`, top: `${region.y}%` }}
                      aria-label={`Explore ${region.name}`}
                      aria-pressed={selectedRegion?.name === region.name}
                      onClick={() => setSelectedRegion(region)}
                    >
                      <span />
                    </button>
                  ))}
                  <span className="image-credit">SUPPLIED ANATOMY · FRONT + BACK</span>
                </>
              ) : <ArtworkPlaceholder asana={selectedAasana} layer={overlay} />}
            </div>

            <aside className="detail-panel" aria-live="polite">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h3>{selectedRegion?.name ?? copy.title}</h3>
              <p className="detail-intro">{selectedRegion?.pose ?? copy.body}</p>
              {selectedRegion ? (
                <div className="region-facts">
                  <div><span>LOCATION</span><p>{selectedRegion.location}</p></div>
                  <div><span>WHAT IT DOES</span><p>{selectedRegion.function}</p></div>
                  <div><span>IN {selectedAasana.name.toUpperCase()}</span><p>{selectedRegion.pose}</p></div>
                  <span className={`role-tag role-${selectedRegion.role.toLowerCase().replace(' ', '-')}`}>{selectedRegion.role}</span>
                </div>
              ) : overlay === 'pose' ? (
                <div className="pose-guidance">
                  <div className="benefits-list">
                    <span>WHAT IT OFFERS</span>
                    <ul>
                      {selectedAasana.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pose-instructions">
                    <span>HOW TO SETTLE IN</span>
                    <ol>
                      {selectedAasana.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
                    </ol>
                  </div>
                  <div className="pose-precautions"><strong>Keep it comfortable</strong><p>{selectedAasana.precautions}</p></div>
                </div>
              ) : (
                <p className="map-hint">{hasAnatomyArt ? 'Select a marker on the illustration to explore a region.' : `The ${overlay} illustration for ${selectedAasana.name} has not been supplied yet.`}</p>
              )}
              <div className="anatomy-disclaimer"><CircleHelp size={15} /><span>Everyone's anatomy and range are different. This map is educational, not diagnostic.</span></div>
            </aside>
          </div>

          <div className="explorer-footer"><span><span className="legend-dot legend-red" /> Muscle tissue</span><span><span className="legend-dot legend-violet" /> Fascial tissue</span><span className="footer-hint">Select a marker to learn more <ArrowUpRight size={14} /></span></div>
        </div>
      </section>

      <section className="practice-section" id="practice">
        <div className="practice-inner">
          <div className="practice-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> MAKE SPACE TO STAY</p>
            <h2>Arrive.<br /><em>Then breathe.</em></h2>
            <p>Explore {selectedAasana.name} at a range that feels steady. Let the breath set the pace.</p>
            <div className="practice-note"><Wind size={17} /><span>Inhale for 4 · exhale for 6<br /><small>Keep the breath soft and unforced.</small></span></div>
          </div>

          <div className="timer-panel">
            <div className="timer-top"><span>GUIDED HOLD</span><span><Clock3 size={14} /> RECOMMENDED · {selectedAasana.recommendedHold}</span></div>
            <div className={`breath-orbit ${isRunning ? 'orbit-moving' : ''}`}>
              <div className="timer-display"><span>{remaining === 0 ? 'Done' : formatTime(remaining)}</span><small>{remaining === 0 ? 'beautifully held' : isRunning ? breathCue : 'ready when you are'}</small></div>
            </div>
            <div className="duration-picker" aria-label="Choose hold duration">
              <span>HOLD FOR</span>
              {durations.map((seconds) => <button key={seconds} type="button" className={duration === seconds ? 'duration-active' : ''} aria-pressed={duration === seconds} onClick={() => chooseDuration(seconds)}>{seconds}<small>s</small></button>)}
            </div>
            <div className="timer-controls">
              <button type="button" className="start-button" onClick={() => remaining === 0 ? resetTimer() : setIsRunning((running) => !running)}>
                {isRunning ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
                {remaining === 0 ? 'Begin again' : isRunning ? 'Pause practice' : 'Begin practice'}
              </button>
              <button type="button" className="reset-button" aria-label="Reset timer" onClick={resetTimer}><RotateCcw size={17} /></button>
            </div>
            <div className="timer-safety"><ShieldCheck size={15} /><span>Come out of the pose if you feel pain, tingling or numbness.</span></div>
          </div>
        </div>
      </section>

      <section className="guide-section section-wrap">
        <div className="guide-heading"><p className="eyebrow">YOUR PRACTICE, YOUR BODY</p><h2>Small adjustments.<br /><em>A softer landing.</em></h2></div>
        <div className="guide-grid">
          {selectedAasana.modifications.map((modification, index) => (
            <article className="guide-item" key={modification}>
              <span className="guide-count">{String(index + 1).padStart(2, '0')}</span>
              <h3>{index === 0 ? 'Make it supported' : index === 1 ? 'Adjust your range' : 'Keep the breath easy'}</h3>
              <p>{modification}</p>
              <span className="guide-rule" />
            </article>
          ))}
        </div>
        <a className="back-to-top" href="#top">Back to the beginning <ChevronDown size={14} className="back-arrow" /></a>
      </section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">f</span><span>FASYO<span className="brand-period">.</span></span></a><span>ANATOMY · MOVEMENT · BREATH</span></footer>
    </main>
  );
}

export default App;