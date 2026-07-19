import { Composition } from "remotion";
import ProductReveal from "./compositions/ProductReveal";
import OriginCinematic from "./compositions/OriginCinematic";
import ProcessLoop from "./compositions/ProcessLoop";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyComposition = Composition as any;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <AnyComposition
        id="ProductReveal"
        component={ProductReveal}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          productName: "Ethiopian Yirgacheffe",
          origin: "Ethiopia",
          flavorNotes: ["Jasmine", "Bergamot", "Honey"],
          price: 42,
        }}
      />
      <AnyComposition
        id="OriginCinematic"
        component={OriginCinematic}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          originName: "Ethiopia",
          story: "Born in the birthplace of coffee, our Yirgacheffe tells a story of ancient forests and third-generation farmers.",
          country: "Ethiopia",
        }}
      />
      <AnyComposition
        id="ProcessLoop"
        component={ProcessLoop}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          stages: [
            { name: "Green", temperature: "20°C", duration: "0:00" },
            { name: "Yellow", temperature: "150°C", duration: "4:00" },
            { name: "City", temperature: "195°C", duration: "8:00" },
            { name: "Full City", temperature: "215°C", duration: "11:00" },
            { name: "Vienna", temperature: "225°C", duration: "13:30" },
          ],
        }}
      />
    </>
  );
};
