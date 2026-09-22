process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const rootDir = path.resolve(__dirname, "..");
const buildHtmlPath = path.resolve(rootDir, "build", "index.html");
const ssrOutputDir = path.resolve(rootDir, "build-ssr");
const ssrBundlePath = path.resolve(ssrOutputDir, "prerender.js");

if (!fs.existsSync(buildHtmlPath)) {
  console.error("Prerender error: build/index.html not found. Run craco build first.");
  process.exit(1);
}

const webpackConfig = {
  mode: "production",
  target: "node",
  entry: path.resolve(rootDir, "src", "prerender-entry.js"),
  output: {
    path: ssrOutputDir,
    filename: "prerender.js",
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")],
          },
        },
      },
      {
        test: /\.css$/,
        use: [path.resolve(__dirname, "null-loader.js")],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
};

console.log("[prerender] Compiling SSR bundle with Webpack...");
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error("[prerender] Webpack fatal error:", err);
    process.exit(1);
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error("[prerender] Webpack compilation errors:", info.errors);
    process.exit(1);
  }

  console.log("[prerender] Webpack compilation completed. Rendering static HTML...");
  try {
    delete require.cache[require.resolve(ssrBundlePath)];
    const ssrModule = require(ssrBundlePath);
    const renderedHtml = ssrModule.renderApp();

    console.log(`[prerender] Rendered ${renderedHtml.length} characters of semantic HTML.`);

    let indexHtml = fs.readFileSync(buildHtmlPath, "utf8");
    const target = '<div id="root"></div>';

    if (!indexHtml.includes(target)) {
      console.warn("[prerender] Warning: <div id=\"root\"></div> not found as empty tag. Checking regex replace...");
      indexHtml = indexHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${renderedHtml}</div>`);
    } else {
      indexHtml = indexHtml.replace(target, `<div id="root">${renderedHtml}</div>`);
    }

    fs.writeFileSync(buildHtmlPath, indexHtml, "utf8");
    console.log("[prerender] Successfully injected prerendered semantic HTML into build/index.html!");

    // Clean up temporary build-ssr folder
    try {
      fs.rmSync(ssrOutputDir, { recursive: true, force: true });
      console.log("[prerender] Cleaned up temporary SSR build artifacts.");
    } catch (cleanupErr) {
      console.warn("[prerender] Non-critical warning cleaning up SSR directory:", cleanupErr.message);
    }
  } catch (renderErr) {
    console.error("[prerender] Error during static HTML generation:", renderErr);
    process.exit(1);
  }
});
