export const REMOTION_CONFIG = {
  serveUrl: process.env.REMOTION_SERVE_URL || "http://localhost:3000",
  outputDir: "/tmp/remotion-output",
  defaultCodec: "h264" as const,
  compositions: {
    ProductReveal: {
      id: "ProductReveal",
      durationInFrames: 450,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    OriginCinematic: {
      id: "OriginCinematic",
      durationInFrames: 900,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    ProcessLoop: {
      id: "ProcessLoop",
      durationInFrames: 300,
      fps: 30,
      width: 1920,
      height: 1080,
    },
  },
} as const;
