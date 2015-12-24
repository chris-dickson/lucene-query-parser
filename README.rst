========================================
Lucene Query Parser for Javascript
========================================

This is an implementation of the Lucene Query Parser developed using PEG.js. 

Example
========================================

A quick example of how to use it::

  // return the expression tree 
  var results = lucenequeryparser.parse('title:"The Right Way" AND text:go');
  
  alert(results['left']['field']);      // title
  alert(results['left']['term']);       // The Right Way
  alert(results['operator']);           // AND
  alert(results['right']['field']);     // text
  alert(results['right']['term']);      // go

  
A slightly more complicated example::

  // return the expression tree 
  var results = lucenequeryparser.parse('test AND (foo OR bar)');

  alert(results['left']['term']);       // test
  alert(results['operator']);           // AND

  // the parantheses group becomes it's own nested node
  var rightNode = results['right'];  

  alert(rightNode['left']['term']);     // foo
  alert(rightNode['operator']);         // OR
  alert(rightNode['right']['term']);    // bar
  
  
Unit Tests
========================================

To run the unit tests, just open SpecRunner.html in any browser. Unit tests are built with 
`Jasmine  <http://pivotal.github.com/jasmine/>`_.

Use in the Browser
========================================
To use the parser in the browser, include either lucenequeryparser.js or lucenequeryparser.min.js as a script
in your html.  The usage is identical.  If you modify the grammar, you will need to rebuild the client distributables
using gulp::

  sudo npm install -g gulp
  gulp

Grammar 
========================================

The parser is auto-generated from a PEG implementation in Javascript called 
`PEG.js   <http://pegjs.majda.cz/>`_.


To test the grammar without using the generated parser, or if you want to modify it, try out `PEG.js
online <http://pegjs.majda.cz/online>`_. This is a handy way to test an abritrary query and see 
what the results will be like or debug a problem with the parser for a given piece of data. 



Community
========================================

If you'd like to help out with the project, or if you have a question, feel free to contact 
Troy Howard at thoward37@gmail.com. 

Bug reports or feature requests should go in the bitbucket issue tracker. Please include relevant 
sample data (the query) and a good description of the challenges you're facing.

Look to the wiki for documentation and other resources. 
