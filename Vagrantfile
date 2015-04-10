# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  Encoding.default_external = 'UTF-8'
  config.vm.box = "ubuntu.14"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.box_check_update = true

  config.vm.provision "file", source: "./sh/install.sh"

  config.vm.provision "shell", inline: <<-SHELL
    sudo /etc/init.d/apache2 restart
    echo STARTING...
  SHELL

end
