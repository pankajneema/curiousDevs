import { NeuralNetwork } from "./NeuralNetwork";

// Mounted once in the root layout. `site-backdrop` paints the aurora glow
// (::before) and the cyber grid (::after); the canvas is a real child so it
// sits between the two — its transparent gaps let both show through.
export function PageBackground() {
  return (
    <div className="site-backdrop">
      <NeuralNetwork />
    </div>
  );
}
