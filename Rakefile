require "bundler/gem_tasks"

def run_jasmine_phantom_test_case(name)
  puts "Running #{name}..."
  puts "---"

  output = Dir.chdir("test-cases/#{name}") do
    Bundler.with_clean_env do
      sh "bundle install > /dev/null"
      `bundle exec rake jasmine:phantom:ci 2>&1`
    end
  end

  if $?.success?
    puts "Expected #{name} to fail, but it did not"
    exit 1
  end

  if output !~ /2 specs | 1 failing/
    puts "Expected #{name} output to include '2 specs | 1 failing', but it did not"
    puts "Output was:"
    puts output
    exit 1
  end

  puts "#{name} passed!"
end

task :test do
  run_jasmine_phantom_test_case 'rails-3.2-jasmine-1.3.0'
  run_jasmine_phantom_test_case 'rails-3.2-jasmine-1.2.1'
  run_jasmine_phantom_test_case 'rails-3.2-jasmine-1.2.0'
end

task default: :test
