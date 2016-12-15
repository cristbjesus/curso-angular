// Karma configuration
// Generated on Tue Jun 07 2016 11:15:41 GMT-0300 (Hora oficial do Brasil)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'bower_components/lodash/dist/lodash.min.js',
		'bower_components/moment/min/moment.min.js',

		'bower_components/jquery/dist/jquery.min.js',

		'bower_components/angular/angular.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/angular-i18n/angular-locale_pt-br.js',

		'bower_components/angular-aria/angular-aria.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-material/angular-material.min.js',

		'bower_components/angular-material-data-table/dist/md-data-table.min.js',

		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-messages/angular-messages.min.js',
		'bower_components/angular-growl-v2/build/angular-growl.min.js',

		'app/filters/unsafe-filter.js',

		'app/directives/grid/senai-grid-module.js',
		'app/directives/grid/senai-grid.js',
		'app/directives/grid/senai-grid-column.js',

		'app/app.js',
		'app/config.js',

		'app/index.controller.js',

		'app/views/cliente/cliente.service.js',
		'app/views/cliente/cadastro-cliente.controller.js',
		'app/views/cliente/pesquisa-cliente.controller.js',
		'app/views/cliente/bottom-sheet/grid-clientes-bottom-sheet.controller.js',

		'app/views/produto/cadastro-produto.controller.js',
		'app/views/produto/pesquisa-produto.controller.js',
      
		'app/directives/**/*.html',
		'app/templates/**/*.html',
		'app/views/**/*.html',
      
		// Testes unitários
		'test/unit/*.test.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'app/directives/**/*.html': ['ng-html2js'],
    	'app/templates/**/*.html': ['ng-html2js'],
    	'app/views/**/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
        // the name of the Angular module to create
        moduleName: 'SenaiModuloTemplates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
