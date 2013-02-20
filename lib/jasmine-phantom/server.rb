module Jasmine
  module Phantom
    module Server
      def self.start
        require 'jasmine/version'

        case Jasmine::VERSION
        when '1.2.0' then start_1_2_0
        when '1.2.1' then start_1_2_1
        else start_latest
        end
      end

      def self.start_latest
        Jasmine.load_configuration_from_yaml
        config = Jasmine.config

        server = Jasmine::Server.new(config.port, Jasmine::Application.app(config))
        t = Thread.new do
          begin
            server.start
          rescue ChildProcess::TimeoutError
          end
          # ignore bad exits
        end
        t.abort_on_exception = true
        Jasmine::wait_for_listener(config.port, "jasmine server")

        config.port
      end

      def self.start_1_2_1
        jasmine_runner_config = Jasmine::RunnerConfig.new
        server = Jasmine::Server.new(jasmine_runner_config.port, Jasmine::Application.app(jasmine_runner_config))

        t = Thread.new do
          begin
            server.start
          rescue ChildProcess::TimeoutError
          end
          # ignore bad exits
        end
        t.abort_on_exception = true
        Jasmine::wait_for_listener(jasmine_runner_config.port, "jasmine server")

        jasmine_runner_config.port
      end

      def self.start_1_2_0
        config = Jasmine::Config.new
        config.start_jasmine_server

        # omg config.jasmine_port finds a new unused port every time!
        config.instance_variable_get :@jasmine_server_port
      end
    end
  end
end
