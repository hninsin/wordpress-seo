// https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
    dependencies: {
        files: [
            {
                expand: true,
                cwd: 'node_modules/select2/dist/js/',
                src: ['select2.min.js', 'i18n/*', '!i18n/build.txt'],
                dest: 'js/dist/select2/'
            }
        ]
    }
};

