#!/usr/bin/env bash

repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
main_branch="main"
gh_pages_branch="gh-pages"

git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"

git checkout "$main_branch"

# Create build
npm run build

git checkout "$gh_pages_branch"

# Remove all existing files and the static folder
rm *
rm -r static

# Copy the build files 
cp -r build/* .

# Add CNAME
echo 'merakilearn.org' > CNAME

git add .

if git status | grep 'new file\|modified'
then
    set -e
    git commit -am "data updated on - $(date)"
    git remote set-url "$remote_name" "$repo_uri" # includes access token
    git push --force-with-lease "$remote_name" "$gh_pages_branch"
else
    set -e
    echo "No changes since last run"
fi

echo "finish"