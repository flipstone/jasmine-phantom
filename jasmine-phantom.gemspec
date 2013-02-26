# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jasmine-phantom/version"

Gem::Specification.new do |s|
  s.name        = "jasmine-phantom"
  s.version     = Jasmine::Phantom::VERSION
  s.authors     = ["David Vollbracht"]
  s.email       = ["david@flipstone.com"]
  s.license     = "MIT"
  s.homepage    = "http://github.com/flipstone/jasmine-phantom"
  s.summary     = %q{Run you jasmine specs from the commant line using phantomjs}
  s.description = %q{jasmine-phantom provides a rake task, jasmine:phantom:ci,
                     that runs your jasmine specs via the phantomjs browser just as if you had
                     run rake jasmine and run them manually via your browser.

                     You need to have phantomjs installed and in your PATH for the rake task to work}

  s.rubyforge_project = "jasmine-phantom"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  s.add_runtime_dependency "jasmine", '>= 1.2.0'
  s.add_runtime_dependency "posix-spawn"
  s.add_development_dependency "rake", '>= 0.8'
end
