require 'rails/railtie'

module JasminePhantom
  class Railtie < Rails::Railtie
    rake_tasks do
      load "jasmine-phantom/tasks.rake"
    end
  end
end
