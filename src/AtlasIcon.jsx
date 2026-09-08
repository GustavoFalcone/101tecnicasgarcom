export default function AtlasIcon({name="pizza",className=""}) {
 return <img className={`atlasIcon rasterIcon ${className}`} src={`/assets/generated/${name}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}
