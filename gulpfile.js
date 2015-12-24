/*
 * *
 *  Copyright © 2015 Uncharted Software Inc.
 *
 *  Property of Uncharted™, formerly Oculus Info Inc.
 *  http://uncharted.software/
 *
 *  Released under the MIT License.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the "Software"), to deal in
 *  the Software without restriction, including without limitation the rights to
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 *  of the Software, and to permit persons to whom the Software is furnished to do
 *  so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 * /
 */

var gulp            = require('gulp');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var uglify          = require('gulp-uglify');
var runSequence     = require('run-sequence');


var config = {
    src: './',
    dist: './client',
    name : 'lucenequeryparser',
    main : './lucene-query-parser.js'
};


function doBuild(shouldMinify) {
    var build = browserify(config.src + config.main, {
            debug: !shouldMinify,
            standalone: config.name
        })
        .bundle()
        .on( 'error', function( e ) {
            console.log( e );
            this.emit('end');
        })
        .pipe( source( config.name.toLowerCase() + (shouldMinify ? '.min' : '') + '.js' ) );
    if (shouldMinify) {
       build = build
           .pipe(buffer())
           .pipe(uglify({
               mangle : true
           }));
    }
    build.pipe( gulp.dest( config.dist ) );
    return build;
}

gulp.task('build-js', function () {
    return doBuild(false);
});

gulp.task('minify-js',function() {
    return doBuild(true);
});

gulp.task('default', function(done) {
    runSequence('build-js', 'minify-js', done);
});
