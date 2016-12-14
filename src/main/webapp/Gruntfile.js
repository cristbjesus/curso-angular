(function () {
    'use strict';

    module.exports = function (grunt) {
        require('matchdep').filterDev('grunt-*')
            .forEach(grunt.loadNpmTasks);

        // Configuração do projeto.
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                files: ['app/less/*.less'],
                tasks: ['less', 'postcss']
            },
            less: {
                app: {
                    options: {
                        sourceMap: true,
                        compress: false
                    },
                    files: {
                        'app/css/style.css': 'app/less/style.less'
                    }
                }
            },
            postcss: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                },
                app: {
                    src: 'app/css/*.css'
                }
            },
            clean: {
                build: {
                    src: ['build']
                },
                release: {
                    src: [
                        'build/app/**/*.js',
                        '!build/app/**/*.service.js',
                        '!build/app/**/*.controller.js',
                        '!build/app/source-app.js',
                        '!build/app/source-login.js',
                        '!build/app/views/**',
                        'build/app/index.controller.js',
                        'build/app/login.controller.js'
                    ]
                },
                min: {
                    src: [
                        'build/app/**/*.js',
                        '!build/app/**/*.min.js'
                    ]
                }
            },
            copy: {
                app: {
                    files: [{
                        expand: true,
                        src: [
                            'app/**',
                            'bower_components/**',
                            '!bower_components/angular-mocks/**',
                            '!app/css/style.css',
                            '!app/css/style.css.map',
                            '!app/less/style.less'
                        ],
                        dest: 'build/'
                    }]
                }
            },
            concat: {
                options: {
                    nonull: true
                },
                appJs: {
                    src: [
                        'build/app/filters/unsafe-filter.js',
                        'build/app/directives/grid/senai-grid-module.js',
                        'build/app/directives/grid/senai-grid.js',
                        'build/app/directives/grid/senai-grid-column.js',
                        'build/app/app.js',
                        'build/app/config.js',
                        'build/app/index.controller.js'
                    ],
                    dest: 'build/app/source-app.js'
                },
                loginJs: {
                    src: [
                        'build/app/login.module.js',
                        'build/app/login.controller.js'
                    ],
                    dest: 'build/app/source-login.js'
                }
            },
            cleanempty: {
                options: {
                    force: true,
                },
                build: {
                    src: ['build/**']
                }
            },
            ngAnnotate: {
                options: {
                    singleQuotes: true
                },
                app: {
                    files: [
                        {
                            expand: true,
                            src: ['build/app/**/*.js']
                        }
                    ]
                }
            },
            uglify: {
                app: {
                    files: [
                        {
                            expand: true,
                            src: [
                                'build/app/**/*.js',
                                '!build/app/**/*.controller.js',
                                '!build/app/**/*.service.js'
                            ],
                            dest: '',
                            ext: '.min.js'
                        },
                        {
                            expand: true,
                            src: [
                                '!build/app/**/*.js',
                                'build/app/**/*.controller.js'
                            ],
                            dest: '',
                            ext: '.controller.min.js'
                        },
                        {
                            expand: true,
                            src: [
                                '!build/app/**/*.js',
                                'build/app/**/*.service.js'
                            ],
                            dest: '',
                            ext: '.service.min.js'
                        }
                    ]
                }
            },
            cssmin: {
                app: {
                    files: {
                        'build/app/css/style.min.css': ['app/css/style.css']
                    }
                }
            },
            htmlmin: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                app: {
                    files: [
                        {
                            expand: true,
                            src: [
                                'build/app/**/*.html',
                                'build/index.html',
                                'build/login.html'
                            ]
                        }
                    ]
                }
            },
            processhtml: {
                options: {
                    process: true
                },
                build: {
                    files: {
                        'build/index.html': ['index.html'],
                        'build/login.html': ['login.html']
                    }
                }
            },
            ngdocs: {
                options: {
                    dest: 'docs',
                    html5Mode: false,
                    scripts: [
                        'bower_components/angular/angular.js'
                    ]
                },
                api: {
                    src: ['app/**/*.js'],
                    title: 'Senai Docs'
                }
            }
        });

        // Tarefa default
        grunt.registerTask('default', ['watch']);

        // Tarefa de gerar o build
        grunt.registerTask('build', [
            'clean:build',
            'copy',
            'concat:appJs',
            'concat:loginJs',
            'clean:release',
            'cleanempty',
            'ngAnnotate',
            'processhtml',
            'uglify',
            'cssmin',
            'htmlmin',
            'clean:min'
        ]);

        // Tarefa de documentar
        grunt.registerTask('doc', ['ngdocs']);
    };
})();