#!/bin/bash
# 
# Author: lvx
# Date: 2024-02-23
# Description: 项目部署脚本

cat <<EOF
Operational Guidelines
  1 [local docker build&setup]
  2 [...]
EOF
read -p "Select the operation to be performed: " opt

if [ -z "$opt" ]; then
  echo "Invalid input"
  exit 1
fi

case $opt in
1)
  IMAGE_NAME="umijs-web"
  WEB_PORT="80"
  WEB_NAME="myweb"

  if docker ps -a --format '{{.Names}}' | grep -q $WEB_NAME; then
    docker rm -f $WEB_NAME
  fi
  if docker images | grep -w "$IMAGE_NAME"; then
    docker rmi $IMAGE_NAME
  fi 

  docker build --rm -f ./Dockerfile -t $IMAGE_NAME .
  docker run --name $WEB_NAME -p $WEB_PORT:80 --restart=always -d $IMAGE_NAME:latest
  docker image prune -f
;;
*)
  echo "Invalid input"
  exit 1
;;
esac

# # todo 提交日志控制台输入
# thistime=$(date "+%Y%m%d%H%M%S")
# commitlog="update $thistime"
# echo "$commitlog"

# script_path=$(dirname $(readlink -f $0))
# cd $script_path
# # HERE: kiGo/tools

# echo "step 1: clone repository"
# git clone git@github.com:duganlx/duganlx.github.io.git
# cd duganlx.github.io
# # HERE: kiGo/tools/duganlx.github.io
# git pull

# echo "step 2: move .git to /dist"
# cd $script_path
# cd ..
# # HERE: kiGo
# yarn build
# cp -r tools/duganlx.github.io/.git dist/

# cd dist
# # HERE: kiGo/dist
# echo "step 3: commit and push"
# git add .
# git commit -m "$commitlog"
# git push

# cd ..
# # HERE: kiGo
# echo "step 4: clean env"
# rm -rf tools/duganlx.github.io
