/**
 * Example: Using the GlowingEffect Component
 *
 * This demonstrates how to integrate the GlowingEffect
 * component in your portfolio sections
 */

import React from "react";
import { GlowingEffect } from "@/components/ui/GlowingEffect";

export function ValuePropositionWithGlow() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card with Glowing Effect */}
          <div className="relative rounded-2xl border border-white/20 p-8 bg-white/5 backdrop-blur-sm overflow-hidden">
            {/* Glowing Effect Layer */}
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              blur={0}
              variant="default"
            />

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Feature Title
              </h3>
              <p className="text-white/70">
                Description of your feature with glowing border on hover
              </p>
            </div>
          </div>

          {/* Repeat for more cards */}
        </div>
      </div>
    </section>
  );
}

/**
 * GlowingEffect Props Reference:
 *
 * @param {number} blur - Amount of blur on the gradient (default: 0)
 * @param {number} inactiveZone - Radius where mouse proximity is ignored as ratio of element size (default: 0.7)
 * @param {number} proximity - Distance from element where effect activates in pixels (default: 0)
 * @param {number} spread - Angle spread of the glow gradient in degrees (default: 20)
 * @param {'default' | 'white'} variant - Color variant of the glow (default: 'default')
 * @param {boolean} glow - Whether glow effect is visible (default: false)
 * @param {string} className - Additional Tailwind classes for the effect container
 * @param {boolean} disabled - Disable all mouse tracking and animations (default: true)
 * @param {number} movementDuration - How fast the animation follows the mouse in seconds (default: 2)
 * @param {number} borderWidth - Width of the glow border in pixels (default: 1)
 *
 * Example configurations:
 *
 * - Subtle glow:
 *   <GlowingEffect spread={20} glow={true} disabled={false} proximity={32} inactiveZone={0.5} borderWidth={1} />
 *
 * - Aggressive glow:
 *   <GlowingEffect spread={60} glow={true} disabled={false} proximity={100} inactiveZone={0.01} borderWidth={3} />
 *
 * - Disabled (renders but no effect):
 *   <GlowingEffect disabled={true} />
 */

export default ValuePropositionWithGlow;
