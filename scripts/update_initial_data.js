import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('public/images/menu/IMAGE_AUDIT_MANIFEST.json', 'utf8'));
let code = fs.readFileSync('src/data/initialData.ts', 'utf8');

const map = {};
manifest.forEach(m => {
  const alt = m.alt || `${m.name} freshly prepared at Skyline Cafe Malta`;
  map[m.id] = { image: m.image, alt: alt };
});

let updatedCount = 0;
for (const id in map) {
  const item = map[id];
  const idIndex = code.indexOf(`id: '${id}'`);
  if (idIndex !== -1) {
    const nextProdIndex = code.indexOf(`id: 'prod-`, idIndex + 10);
    const endIndex = nextProdIndex !== -1 ? nextProdIndex : idIndex + 600;
    const block = code.substring(idIndex, endIndex);

    const updatedBlock = block
      .replace(/image:\s*'[^']+'/, `image: '${item.image}'`)
      .replace(/imageAlt:\s*'[^']+'/, `imageAlt: '${item.alt.replace(/'/g, "\\'")}'`);

    code = code.substring(0, idIndex) + updatedBlock + code.substring(endIndex);
    updatedCount++;
  } else {
    console.log('Product ID not found in code:', id);
  }
}

fs.writeFileSync('src/data/initialData.ts', code, 'utf8');
console.log(`Successfully updated ${updatedCount} products in src/data/initialData.ts`);
