module.exports = function(grunt) {

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        copyFiles: {
            options: {
                devDirectory: 'dev',
                manifest: [
                    'index.html',
                    'styles/',
                    'scripts/'
                ]
            }
        }
    })

    grunt.registerTask('createFolders', 'Create working folders', function() {
        var devFolderCfg = 'copyFiles.options.devDirectory'
        grunt.config.requires(devFolderCfg)
        var devFolderPath = grunt.config.get('copyFiles.options.devDirectory')
        grunt.log.writeln('Create folder '+devFolderPath)
        grunt.file.mkdir(devFolderPath)
    })

    grunt.registerTask('clean', 'Clean working folders', function() {
        var devFolderCfg = 'copyFiles.options.devDirectory'
        grunt.config.requires(devFolderCfg)
        var devFolderPath = grunt.config.get('copyFiles.options.devDirectory')
        grunt.log.writeln('Delete folder '+devFolderPath)
        grunt.file.delete(devFolderPath)
    })

    grunt.registerTask('copyFiles', 'Copy files to working folders', function() {
        this.requires('clean')
        grunt.config.requires(this.name+'.options.devDirectory')
        grunt.config.requires(this.name+'.options.manifest')

        var files = this.options().manifest
        var devDirectory = this.options().devDirectory
        files.forEach(function(item) {
            var dest = devDirectory+'/'+item;
            recursiveCopy(item,dest)
        })


    })

    grunt.registerTask('addLicense', 'Add license.txt file using package.json info', function() {
        this.requires('copyFiles')
        grunt.config.requires('copyFiles.options.devDirectory')
        var devDirectory = grunt.config.get('copyFiles.options.devDirectory')
        var content = '<%=pkg.name%>\nVersion: <%=pkg.version%>\nAuthor: <%=pkg.author%>\nLicensed under: <%=pkg.license%>'
        content = grunt.template.process(content)
        grunt.file.write(devDirectory+'/license.txt', content)
    })

    var recursiveCopy = function(src, dst) {
        if(grunt.file.isDir(src)) {
            grunt.file.recurse(src, function(file) {
                recursiveCopy(file, dst)
            })
        } else {
            grunt.log.writeln('Copying '+src+ ' to '+dst)
            grunt.file.copy(src,dst+'/'+src)
        }
    }

    grunt.registerTask('deployd', 'Deploy to DEV', ['clean', 'createFolders', 'copyFiles', 'addLicense'])

}