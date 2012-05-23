namespace :jasmine do
  namespace :phantom do
    desc "Run jasmine specs using phantomjs and report the results"
    task :ci => "jasmine:require" do
      jasmine_config_overrides = File.join(Jasmine::Config.new.project_root, 'spec', 'javascripts' ,'support' ,'jasmine_config.rb')
      require jasmine_config_overrides if File.exist?(jasmine_config_overrides)

      config = Jasmine::Config.new
      config.start_jasmine_server

      # omg config.jasmine_port finds a new unused port every time!
      port = config.instance_variable_get :@jasmine_server_port

      script = File.join File.dirname(__FILE__), 'run-jasmine.js'

      pid = Process.spawn "phantomjs #{script} http://localhost:#{port}"

      begin
        Thread.pass
        sleep 0.1
        wait_pid, status = Process.waitpid2 pid, Process::WNOHANG
      end while wait_pid.nil?
      exit(1) unless status.success?
    end
  end
end
