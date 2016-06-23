/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'angular2-modal':             'node_modules/angular2-modal'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'angular2-modal':                   { main: 'index.js', defaultExtension: 'js' },
    'angular2-modal/platform-browser':  { main: 'index.js', defaultExtension: 'js' },
    'angular2-modal/plugins/bootstrap': { main: 'index.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
    'forms'
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);