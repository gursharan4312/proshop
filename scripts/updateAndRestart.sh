#!/bin/bash

docker stop proshop

# Delete the old repo
rm -rf /home/ec2-user/proshop

# any future command that fails will exit the script
set -e

# BE SURE TO UPDATE THE FOLLOWING LINE WITH THE URL FOR YOUR REPO
git clone https://github.com/gursharan4312/proshop.git

cd /home/ec2-user/proshop

# run the node app in a container
deploy/docker.sh -d
