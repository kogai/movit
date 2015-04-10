#!/usr/bin/env bash

sudo apt-get update
curl https://raw.githubusercontent.com/creationix/nvm/v0.18.0/install.sh | bash
sudo nvm install v0.12

sudo rm -rf /var/www/html
sudo ln -fs /vagrant /var/www/html

echo INSTALLED...
