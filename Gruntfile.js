module.exports = function(grunt) {

    grunt.registerTask('default', 'Default Task', function() {
        grunt.log.writeln('test')
    })

    grunt.registerTask('greet', 'Greet input name', function(name) {
        grunt.log.writeln('Hi '+name+'!')
    })

    grunt.registerTask('add', 'Sum 2 numbers', function(n1, n2) {
        if(isNaN(Number(n1)) || isNaN(Number(n2))) {
            grunt.fatal('arguments must be a number!')
        }
        var sum = Number(n1) + Number(n2)
        grunt.log.writeln('n1 + n2 = '+sum)
    })

    grunt.registerTask('all', 'Run all tasks', ['default', 'greet:Marios', 'add:1:2'])
}
