const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const app = express();
const PORT = 3000;
const THUMBNAIL_WIDTH = 800;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const CATEGORY_CONFIG = [
    { key: "night", dirs: ["night"] },
    { key: "places", dirs: ["places"] },
    { key: "portraits", dirs: ["portraits", "portaits"] },
];

function resolveCategoryDir(categoryKey) {
    const config = CATEGORY_CONFIG.find((entry) => entry.key === categoryKey);

    if (!config) {
        return null;
    }

    for (const dirName of config.dirs) {
        const fullPath = path.join(__dirname, "public", "photos", dirName);

        if (fs.existsSync(fullPath)) {
            return { fullPath, dirName };
        }
    }

    return { fullPath: path.join(__dirname, "public", "photos", config.dirs[0]), dirName: config.dirs[0] };
}

async function ensureThumbnail(originalFilePath, categoryDirName) {
    const originalDir = path.dirname(originalFilePath);
    const originalName = path.parse(originalFilePath).name;
    const thumbDir = path.join(originalDir, "thumbs");
    const thumbPath = path.join(thumbDir, `${originalName}.jpg`);

    fs.mkdirSync(thumbDir, { recursive: true });

    if (!fs.existsSync(thumbPath)) {
        await sharp(originalFilePath)
            .resize({ width: THUMBNAIL_WIDTH, fit: "cover", withoutEnlargement: true })
            .jpeg({ quality: 82, progressive: true })
            .toFile(thumbPath);
    }

    return `/photos/${categoryDirName}/thumbs/${originalName}.jpg`;
}

async function buildGalleryPhotos() {
    const galleryPhotos = [];

    for (const category of CATEGORY_CONFIG) {
        const categoryInfo = resolveCategoryDir(category.key);
        const categoryDir = categoryInfo.fullPath;

        if (!fs.existsSync(categoryDir)) {
            continue;
        }

        const files = fs.readdirSync(categoryDir)
            .filter((file) => /\.(png|jpe?g|webp|avif|gif)$/i.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

        for (const file of files) {
            const originalFilePath = path.join(categoryDir, file);
            const thumbSrc = await ensureThumbnail(originalFilePath, categoryInfo.dirName);

            galleryPhotos.push({
                category: category.key,
                dirName: categoryInfo.dirName,
                src: thumbSrc,
                fullSrc: `/photos/${categoryInfo.dirName}/${file}`,
                alt: `${category.key} photograph`,
                index: galleryPhotos.filter((item) => item.category === category.key).length + 1,
            });
        }
    }

    return galleryPhotos;
}

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/gallery", async (req, res) => {
    const photos = await buildGalleryPhotos();
    res.render("gallery", { photos });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});