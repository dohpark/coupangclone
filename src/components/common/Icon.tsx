import Image from "next/image";

const Icon: React.FC<IconProps> = ({ height, width, svg }) => {
  const svgsrc = getSVGsrc(svg);

  return <Image src={svgsrc} height={height} width={width} alt={svg} />;
};

interface IconProps {
  svg: svgType;
  width: number;
  height: number;
}

const getSVGsrc = (svg: svgType) => {
  return `/svg/${svg}.svg`;
};

export type svgType =
  | "user"
  | "email"
  | "lock-close"
  | "lock-open"
  | "smartphone"
  | "warning";

export default Icon;
