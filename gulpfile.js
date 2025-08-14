var { execSync } = require('child_process');
var {
  writeFileSync, readdirSync, readFileSync,
  existsSync, statSync, mkdirSync, copyFileSync,
} = require('fs');
var path = require('path');

var { marked } = require('marked');
var glob = require('glob');
var _ = require('underscore');

var { src, dest, series, watch } = require('gulp');
var log = require('fancy-log');
var gHash = require('gulp-hash');
var gClean = require('gulp-clean');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var gTerser = require('gulp-terser');
var gJasmine = require('gulp-jasmine');
var { minify } = require('html-minifier');
var { SpecReporter } = require('jasmine-spec-reporter');
var gJshint = require('gulp-jshint');

// Keep original Browserify imports for fallback
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

// Rollup imports - only loaded when needed
var rollup, rollupResolve, rollupCommonjs, rollupBabel, rollupTerser, rollupReplace;

// Try to load Rollup plugins, fallback to Browserify if they fail
try {
  rollup = require('rollup').rollup;
  rollupResolve = require('@rollup/plugin-node-resolve').default;
  rollupCommonjs = require('@rollup/plugin-commonjs').default;
  rollupBabel = require('@rollup/plugin-babel').default;
  rollupTerser = require('@rollup/plugin-terser').default;
  rollupReplace = require('@rollup/plugin-replace').default;
  log('Rollup plugins loaded successfully');
} catch (e) {
  log.warn('Rollup plugins not found, falling back to Browserify');
  rollup = null;
}

_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
_.templateSettings.escape = /\{\{\{(.*?)\}\}\}/g;
_.templateSettings.evaluate = /\{\{-(.*?)\}\}/g;

// precompile for speed
var indexFile = readFileSync('src/template.index.html').toString();
var indexTemplate = _.template(indexFile);

var compliments = [
  'Thanks to Hong4rc for the modern and amazing gulp workflow!',
  'Now with Rollup for better tree-shaking and faster loading!',
  'I hope you all have a great day :)'
];

var compliment = function(done) {
  var index = Math.floor(Math.random() * compliments.length);
  log(compliments[index]);
  done();
};

var lintStrings = function(done) {
  execSync('node src/js/intl/checkStrings');
  done();
};

var destDir = './build/';

var copyRecursiveSync = function(src, dest) {
  var exists = existsSync(src);
  var stats = exists && statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    mkdirSync(dest);
    readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    copyFileSync(src, dest);
  }
};

var buildIndex = function(done) {
  log('Building index...');

  var buildFiles = readdirSync(destDir);

  var jsRegex = /bundle-[\.\w]+\.js/;
  var jsFile = buildFiles.find(function(name) {
    return jsRegex.exec(name);
  });
  if (!jsFile) {
    throw new Error('no hashed min file found!');
  }
  log('Found hashed js file: ' + jsFile);

  var styleRegex = /main-[\.\w]+\.css/;
  var styleFile = buildFiles.find(function(name) {
    return styleRegex.exec(name);
  });
  if (!styleFile) {
    throw new Error('no hashed css file found!');
  }
  log('Found hashed style file: ' + styleFile);

  var buildDir = process.env.CI ? '.' : 'build';

  var outputIndex = indexTemplate({
    buildDir: buildDir,
    jsFile: jsFile,
    styleFile: styleFile,
  });

  if (process.env.NODE_ENV === 'production') {
    outputIndex = minify(outputIndex, {
      minifyJS: true,
      collapseWhitespace: true,
      processScripts: ['text/html'],
      removeComments: true,
    });
  }

  if (process.env.CI) {
    writeFileSync('build/index.html', outputIndex);
    copyRecursiveSync('assets', 'build/assets');
  } else {
    writeFileSync('index.html', outputIndex);
  }
  done();
};

// Original Browserify function (your working version)
var getBundle = function() {
  return browserify({
    entries: [...glob.sync('src/**/*.js'), ...glob.sync('src/**/*.jsx')],
    debug: true,
  })
  .transform(babelify, { presets: ['@babel/preset-react'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gHash());
};

// Rollup configuration factory
var getRollupConfig = function(isProduction) {
  isProduction = isProduction || false;
  return {
    input: 'src/js/app/index.js',
    plugins: [
      rollupResolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.json'],
        skip: ['fs', 'path', 'crypto', 'os', 'util']
      }),
      rollupCommonjs({
        include: ['node_modules/**', 'src/**/*.js', 'src/**/*.jsx'],
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
        ignoreDynamicRequires: false,
        sourceMap: !isProduction
      }),
      rollupReplace({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        'require(\'fs\')': '{}',
        'require("fs")': '{}',
        'require(\'path\')': '{}',
        'require("path")': '{}',
        preventAssignment: true
      }),
      rollupBabel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx']
      })
    ].concat(isProduction ? [rollupTerser({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    })] : []),
    external: ['fs', 'path', 'crypto', 'os', 'util', 'child_process'],
    output: {
      format: 'umd',
      name: 'LearnGitBranching',
      sourcemap: !isProduction,
      globals: {
        'fs': '{}',
        'path': '{}',
        'crypto': '{}',
        'os': '{}',
        'util': '{}',
        'child_process': '{}',
        'jquery': '$',
        'backbone': 'Backbone',
        'underscore': '_'
      }
    },
    treeshake: {
      moduleSideEffects: true,
      pureExternalModules: false,
      unknownGlobalSideEffects: true
    },
    context: 'window',
    onwarn: function(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      if (warning.code === 'UNRESOLVED_IMPORT') {
        if (['fs', 'path', 'crypto', 'os', 'util', 'child_process'].includes(warning.source)) {
          return;
        }
      }
      warn(warning);
    }
  };
};

// Function to run Rollup
var runRollup = function(isProduction) {
  isProduction = isProduction || false;
  
  if (!rollup) {
    throw new Error('Rollup not available, please install Rollup dependencies');
  }
  
  return new Promise(function(resolve, reject) {
    log('Building bundle with Rollup' + (isProduction ? ' (production)' : '') + '...');
    
    var config = getRollupConfig(isProduction);
    
    rollup(config)
      .then(function(bundle) {
        return bundle.generate(config.output);
      })
      .then(function(result) {
        var output = result.output;
        var chunk = output.find(function(chunk) {
          return chunk.type === 'chunk' && chunk.isEntry;
        });
        
        if (!chunk) {
          throw new Error('No entry chunk found in Rollup output');
        }
        
        log('Bundle generated successfully (' + (chunk.code.length / 1024).toFixed(1) + 'KB)');
        
        var stream = source('bundle.js');
        stream.write(chunk.code);
        stream.end();
        
        resolve(stream.pipe(buffer()).pipe(gHash()));
      })
      .catch(reject);
  });
};

var clean = function () {
  return src(destDir, { read: false, allowEmpty: true })
    .pipe(gClean());
};

var convertMarkdownStringsToHTML = function(markdowns) {
  return marked(markdowns.join('\n'));
};

var jshint = function() {
  return src([
    'gulpfile.js',
    '__tests__/**/*.js',
    'src/js/**/*.js'
  ])
  .pipe(gJshint())
  .pipe(gJshint.reporter('default'));
};

// Browserify builds (your original working versions)
var ifyBuild = function() {
  return getBundle()
    .pipe(dest(destDir));
};

var miniBuild = function() {
  process.env.NODE_ENV = 'production';
  return getBundle()
    .pipe(gTerser())
    .pipe(dest(destDir));
};

// Rollup builds (new versions)
var rollupBuild = function() {
  if (!rollup) {
    log.warn('Rollup not available, falling back to Browserify');
    return ifyBuild();
  }
  
  return runRollup(false).then(function(stream) {
    return stream.pipe(dest(destDir));
  });
};

var rollupMiniBuild = function() {
  if (!rollup) {
    log.warn('Rollup not available, falling back to Browserify');
    return miniBuild();
  }
  
  process.env.NODE_ENV = 'production';
  return runRollup(true).then(function(stream) {
    return stream.pipe(dest(destDir));
  });
};

var style = function() {
  var chain = src('src/style/*.css')
    .pipe(concat('main.css'));

  if (process.env.NODE_ENV === 'production') {
    chain = chain.pipe(cleanCSS());
  }

  return chain.pipe(gHash())
    .pipe(dest(destDir));
};

var jasmine = function() {
  return src('__tests__/*.spec.js')
    .pipe(gJasmine({
      config: {
        verbose: true,
        random: false,
      },
      reporter: new SpecReporter(),
  }));
};

var gitAdd = function(done) {
  execSync('git add build/');
  done();
};

var gitDeployMergeMain = function(done) {
  execSync('git checkout gh-pages && git merge main -m "merge main"');
  done();
};

var gitDeployPushOrigin = function(done) {
  execSync('git commit -am "rebuild for prod"; ' +
    'git push origin gh-pages --force && ' +
    'git branch -f trunk gh-pages && ' +
    'git checkout main'
  );
  done();
};

var generateLevelDocs = function(done) {
  log('Generating level documentation...');
  
  var allLevels = require('./src/levels/index');
  var cssContent = readFileSync('./generatedDocs/github-markdown.css');
  
  var htmlContent = '<!DOCTYPE html><html><head><title>Learn Git Branching - Level Documentation</title><style>' + cssContent + '</style>';
  htmlContent += '<style>body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 40px; }';
  htmlContent += '.level { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }';
  htmlContent += '.level-name { color: #333; } .level-goal { background: #f5f5f5; padding: 10px; border-radius: 4px; }';
  htmlContent += '.level-solution { font-family: monospace; background: #f0f0f0; padding: 10px; }';
  htmlContent += '.level-hint { color: #666; font-style: italic; }</style></head><body>';
  htmlContent += '<div class="markdown-body"><h1>Learn Git Branching - All Levels Documentation</h1>';

  Object.keys(allLevels.sequenceInfo).forEach(function(sequenceKey) {
    log('Processing sequence: ', sequenceKey);

    var sequenceInfo = allLevels.sequenceInfo[sequenceKey];
    htmlContent += '<h2>Level Sequence: ' + sequenceInfo.displayName.en_US + '</h2>';
    htmlContent += '<h6>' + sequenceInfo.about.en_US + '</h6>';

    var levels = allLevels.levelSequences[sequenceKey];
    for (var i = 0; i < levels.length; i++) {
      var level = levels[i];
      htmlContent += '<h3>Level: ' + level.name.en_US + '</h3>';

      var startDialog = level.startDialog.en_US;
      for (var j = 0; j < startDialog.childViews.length; j++) {
        var dialog = startDialog.childViews[j];
        var childViewType = dialog.type;
        if (childViewType === 'ModalAlert') {
          htmlContent += convertMarkdownStringsToHTML(dialog.options.markdowns);
        } else if (childViewType === 'GitDemonstrationView') {
          htmlContent += convertMarkdownStringsToHTML(dialog.options.beforeMarkdowns);
          htmlContent += '<pre class="level-solution">' + dialog.options.command + '</pre>';
          htmlContent += convertMarkdownStringsToHTML(dialog.options.afterMarkdowns);
        } else {
          throw new Error('Unknown child view type: ' + childViewType);
        }
      }
    }
  });

  htmlContent += '</div></body></html>';

  writeFileSync('generatedDocs/levels.html', htmlContent);
  log('Level documentation generated at generatedDocs/levels.html');
  done();
};

// Build tasks
var fastBuild = series(clean, ifyBuild, style, buildIndex, jshint);
var fastBuildRollup = series(clean, rollupBuild, style, buildIndex, jshint);

var build = series(
  clean,
  miniBuild, style, buildIndex,
  gitAdd, jshint,
  lintStrings, compliment
);

var buildRollup = series(
  clean,
  rollupMiniBuild, style, buildIndex,
  gitAdd, jshint,
  lintStrings, compliment
);

var deploy = series(
  clean,
  jasmine,
  jshint,
  gitDeployMergeMain,
  build,
  gitDeployPushOrigin,
  compliment
);

var lint = series(jshint, compliment);

var watching = function() {
  return watch([
    'gulpfile.js',
    '__tests__/**/*.js',
    'src/js/**/*.js',
    'src/js/**/*.jsx',
    'src/levels/**/*.js'
  ], series([fastBuild, jasmine, jshint, lintStrings]));
};

module.exports = {
  default: build,
  lint: lint,
  fastBuild: fastBuild,
  build: build,
  fastBuildRollup: fastBuildRollup,
  buildRollup: buildRollup,
  watching: watching,
  test: jasmine,
  deploy: deploy,
  generateLevelDocs: generateLevelDocs,
};