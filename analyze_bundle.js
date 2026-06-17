const fs = require('fs');
const path = require('path');

const NEXT_DIR = path.join(__dirname, '.next');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyze() {
  if (!fs.existsSync(NEXT_DIR)) {
    console.error('Error: .next directory does not exist. Please run npm run build first.');
    return;
  }

  const staticDir = path.join(NEXT_DIR, 'static');
  const allFiles = getFiles(staticDir);

  const analysis = {
    totalJSSize: 0,
    totalCSSSize: 0,
    totalCount: 0,
    chunks: [],
    pages: [],
    main: []
  };

  allFiles.forEach(file => {
    const size = fs.statSync(file).size;
    const relPath = path.relative(staticDir, file);
    const ext = path.extname(file);

    if (ext === '.js') {
      analysis.totalJSSize += size;
      analysis.totalCount++;
    } else if (ext === '.css') {
      analysis.totalCSSSize += size;
      analysis.totalCount++;
    } else {
      return; // Skip maps, assets, etc.
    }

    const item = { path: relPath, size, formattedSize: formatSize(size), ext };

    if (relPath.startsWith('chunks\\pages') || relPath.startsWith('chunks/pages')) {
      analysis.pages.push(item);
    } else if (relPath.startsWith('chunks\\') || relPath.startsWith('chunks/')) {
      // Check if it's a main/framework chunk or custom chunk
      if (relPath.includes('main') || relPath.includes('webpack') || relPath.includes('framework')) {
        analysis.main.push(item);
      } else {
        analysis.chunks.push(item);
      }
    } else if (relPath.startsWith('css\\') || relPath.startsWith('css/')) {
      analysis.main.push(item);
    } else {
      analysis.main.push(item);
    }
  });

  // Sort descending by size
  const sortBySize = (a, b) => b.size - a.size;
  analysis.main.sort(sortBySize);
  analysis.chunks.sort(sortBySize);
  analysis.pages.sort(sortBySize);

  console.log('--- NEXT.JS STATIC ASSETS ANALYSIS ---');
  console.log(`Total JS Size: ${formatSize(analysis.totalJSSize)}`);
  console.log(`Total CSS Size: ${formatSize(analysis.totalCSSSize)}`);
  console.log(`Total Count: ${analysis.totalCount} files`);
  console.log('\n--- FIRST LOAD / MAIN CHUNKS (Framework, Webpack, Main CSS) ---');
  analysis.main.slice(0, 10).forEach(item => {
    console.log(`- ${item.path}: ${item.formattedSize}`);
  });
  if (analysis.main.length > 10) console.log(`... and ${analysis.main.length - 10} more files`);

  console.log('\n--- TOP CUSTOM CHUNKS (Framer Motion, Three.js, lucide-react, etc.) ---');
  analysis.chunks.slice(0, 10).forEach(item => {
    console.log(`- ${item.path}: ${item.formattedSize}`);
  });
  if (analysis.chunks.length > 10) console.log(`... and ${analysis.chunks.length - 10} more files`);

  console.log('\n--- PAGES CHUNKS ---');
  analysis.pages.slice(0, 10).forEach(item => {
    console.log(`- ${item.path}: ${item.formattedSize}`);
  });
  if (analysis.pages.length === 0) {
    console.log('(App Router builds store page bundles in app-pages or server chunks; showing static/chunks instead)');
    // Let's also print some top files in static/chunks/app
    const appChunks = allFiles
      .filter(f => f.includes('app') && (f.endsWith('.js') || f.endsWith('.css')))
      .map(f => {
        const size = fs.statSync(f).size;
        return { path: path.relative(staticDir, f), size, formattedSize: formatSize(size) };
      })
      .sort(sortBySize);
    
    appChunks.slice(0, 10).forEach(item => {
      console.log(`- ${item.path}: ${item.formattedSize}`);
    });
  }
}

analyze();
