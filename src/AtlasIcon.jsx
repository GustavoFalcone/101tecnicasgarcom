export default function AtlasIcon({name="pizza",className=""}) {
 const extension = name === "celular" ? "svg" : "webp";
 return <img className={`atlasIcon ${extension === "svg" ? "vectorIcon" : "rasterIcon"} ${className}`} src={`/assets/generated/${name}.${extension}`} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}
