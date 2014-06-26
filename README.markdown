Jasmine Phantom
===============

Jasmine Phantom provides a rake task that runs your jasmine specs via phantomjs.
It requires jasmine &gt;= 1.2.0.

Installation
------------

Add jasmine 1.2.0 and jasmine-phantom to your gemfile:

    gem 'jasmine', '1.2.0'
    gem 'jasmine-phantom'


and run `bundle install`.

Then run `bundle exec rake jasmine` and check `http://localhost:8888/` to make sure your jasmine specs are passing.

This gem uses https://github.com/colszowka/phantomjs-gem to automatically download an appropriate PhantomJS instance
to the machine.

Finally, run `bundle exec rake jasmine:phantom:ci` and you should see output similar to:

    Waiting for jasmine server on 57832...
    [2012-04-18 15:50:52] INFO  WEBrick 1.3.1
    [2012-04-18 15:50:52] INFO  ruby 1.9.3 (2011-10-30) [x86_64-darwin10.8.0]
    [2012-04-18 15:50:52] INFO  WEBrick::HTTPServer#start: pid=11608 port=57832
    Waiting for jasmine server on 57832...
    jasmine server started.
    phantomjs /some-path-to/jasmine-phantom/lib/jasmine-phantom/run-jasmine.js http://localhost:57832

    215 specs | 0 failing

That's it!

