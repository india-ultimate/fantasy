#!/bin/bash

HERE=$(dirname $0)

pushd "${HERE}/../frontend"
GIT_URL=$(git remote get-url origin)

npm ci
npm run build

pushd build
git init
git add .
git config user.email "noreply@indiaultimate.org"
git config user.name "India Ultimate GitHub Bot"
git commit -m "New website build"
git push --force "${GIT_URL}" main:gh-pages
popd

popd
