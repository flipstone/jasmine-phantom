require "jasmine-phantom/version"

module Jasmine
  module Phantom
  end
end

require File.join('jasmine-phantom', 'railtie') if Jasmine::Dependencies.rails3?
