import Image from "next/image";

/**
 * Značka Partypacku jako SVG (public/logo.svg), ostrá v každé velikosti. Tvar a přechod barev
 * jsou přeměřené z původního loga. Velikost se nastavuje výškou, šířka se dopočítá.
 */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/logo.svg" alt="PARTYPACK" width={138} height={49} unoptimized priority={priority} className={`w-auto ${className}`} />;
}
