const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "assest");
const OUT = path.join(__dirname, "..", "public", "images");

// Maps output filename (as referenced in src/config.js and components) -> source photo
const MAP = {
  "hero-walk.jpg": "SAVE_20260712_205021.jpg",
  "woodland-walk.jpg": "SAVE_20260712_205027.jpg",

  "programme-walks.jpg": "SAVE_20260712_204916.jpg",
  "programme-dance.jpg": "SAVE_20260712_205035.jpg",
  "programme-wellness.jpg": "SAVE_20260712_205013.jpg",
  "programme-retreats.jpg": "SAVE_20260712_205027.jpg",
  "programme-sports.jpg": "SAVE_20260712_205044.jpg",
  "programme-cycling.jpg": "SAVE_20260712_204946.jpg",

  "event-walk.jpg": "SAVE_20260712_205021.jpg",
  "event-dance.jpg": "SAVE_20260712_205035.jpg",
  "event-games.jpg": "SAVE_20260712_204931.jpg",

  "gallery-1.jpg": "SAVE_20260712_204923.jpg",
  "gallery-2.jpg": "SAVE_20260712_204946.jpg",
  "gallery-3.jpg": "SAVE_20260712_204958.jpg",
  "gallery-4.jpg": "SAVE_20260712_205013.jpg",
  "gallery-5.jpg": "SAVE_20260712_205035.jpg",

  "dashboard-hero.jpg": "SAVE_20260712_204910.jpg",
};

async function run() {
  for (const [outName, srcName] of Object.entries(MAP)) {
    await sharp(path.join(SRC, srcName))
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT, outName));
    console.log("✓", outName, "<-", srcName);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
