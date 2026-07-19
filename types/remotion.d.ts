interface ProductRevealProps {
  productName: string;
  origin: string;
  flavorNotes: string[];
  price: number;
}

interface OriginCinematicProps {
  originName: string;
  story: string;
  country: string;
}

interface ProcessLoopProps {
  stages: Array<{
    name: string;
    temperature: string;
    duration: string;
  }>;
}
