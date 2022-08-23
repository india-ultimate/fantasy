#!/bin/bash

HERE=$(dirname $0)

pushd "${HERE}/../frontend"
npm ci
npm run build

pushd build
git init
cp ../../.git/config .git/config
git branch -m gh-pages
git add .
git config user.email "noreply@indiaultimate.org"
git config user.name "India Ultimate GitHub Bot"
git commit -m "New website build"
git push --force origin gh-pages:gh-pages
popd

popd
