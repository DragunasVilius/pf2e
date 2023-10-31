import fs from "fs";
import path from "path";
import url from "url";
import { CompendiumPack, PackError } from "./lib/compendium-pack.ts";

const asJson = process.argv[2]?.toLowerCase() === "json";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const packsDataPath = path.resolve(__dirname, "../packs");
// const packDirPaths = fs.readdirSync(packsDataPath).map((dirName) => path.resolve(__dirname, packsDataPath, dirName));

const packDirPaths = [ 
    "C:\\Files\\repos\\pf2e-extractor\\packs\\pack",
    // "C:\\Files\\repos\\pf2e-extractor\\packs\\spell-effects",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/spells",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/conditions",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/equipment",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/ancestryfeatures",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/bestiary-ability-glossary-srd",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/action-macros",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/actions",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/feats",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/hazards",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/deities",
    // "C:\\Files\\repos\\pf2e-extractor\\packs/pathfinder-bestiary-2",
 ];

// Loads all packs into memory for the sake of making all document name/id mappings available
const packs = packDirPaths.map((p) => CompendiumPack.loadJSON(p));
const documentCounts = await Promise.all(packs.map((p) => p.save(asJson)));
const total = documentCounts.reduce((total, c) => total + c, 0);

if (documentCounts.length > 0) {
    console.log(`Created ${documentCounts.length} packs with ${total} documents.`);
} else {
    throw PackError("No data available to build packs.");
}
