Jasmine Phantom
===============

Jasmine Phantom provides a rake task that runs your jasmine specs via phanstomjs. It is adapted from the jasmine runner example that comes with
phantom js. It requires jasmine `>= 1.2.0rc2`, which is only currency available via github.

Installation
------------

Add jasmine 1.2.0rc2 and jasmine-phantom to your gemfile:

    gem 'jasmine', '1.2.0.rc2',
      git: "git://github.com/pivotal/jasmine-gem.git",
      branch: "953d17dff4b4adba79b2a808b55cf33f4ff93af7"

    gem 'jasmine-phantom'


and run `bundle install`.

Then run `bundle exec rake jasmine` and check `http://localhost:8888/` to make sure you jasmine specs are passing.

Download and install the appropriate [PhantomJS](http://code.google.com/p/phantomjs/downloads/list) for your platform.
Make sure to add the directory with the `phantomjs` executable to your `PATH`.

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

