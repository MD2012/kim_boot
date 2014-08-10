module.exports = function(grunt) {
    grunt.config.init({
        build: {
            angular: {
                src: [
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-resource/angular-resource.js'
                ],
                dest: 'dist/scripts/angular.js'
            },
            angularWithJquery: {
                src: [
                    'app/bower_components/jquery/dist/jquery.js',
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-resource/angular-resource.js'
                ],
                dest: 'dist/scripts/jquery_angular.js'
            }
        }
    })

    // same name as config!
    grunt.registerMultiTask('build', 'Concatenate custom build packages', function() {
        var out = ''
        this.files.forEach(function(filegroup) {
            var sources = filegroup.src.map(function(file) {
                return( grunt.file.read(file) )
            })
            out = sources.join(';')
            grunt.file.write(filegroup.dest, out)
        })
    })
}