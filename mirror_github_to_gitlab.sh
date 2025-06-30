#!/bin/bash

# Exit on any error
set -e

# Configurable values
GITHUB_REPO="https://github.com/fredrik-hansen/cognitive-conversation-deck.git"
GITLAB_REPO="http://gitlab.int.pki.ad/cognita/cognitive-conversation-deck.git"
MIRROR_DIR="./.repo-mirror-cognitive-conversation-deck"

# Optional: uncomment and edit if you need authentication for GitLab
# GITLAB_USER="your-username"
# GITLAB_PAT="your-personal-access-token"
# GITLAB_REPO="https://${GITLAB_USER}:${GITLAB_PAT}@gitlab.int.pki.ad/cognita/cognitive-conversation-deck.git"

echo "Starting one-way mirror: $GITHUB_REPO --> $GITLAB_REPO"
rm -rf .repo-mirror-cognitive-conversation-deck/
if [ ! -d "$MIRROR_DIR" ]; then
  echo "Cloning GitHub repo as a bare mirror..."
  git clone --mirror "$GITHUB_REPO" "$MIRROR_DIR"
else
  echo "Using existing mirror directory: $MIRROR_DIR"
fi

cd "$MIRROR_DIR"

echo "Fetching latest from GitHub..."
git remote update --prune

echo "Setting (or updating) gitlab remote..."
git remote remove gitlab 2>/dev/null || true
git remote add gitlab "$GITLAB_REPO"

echo "Pushing all refs (force) to GitLab..."
git push --mirror gitlab

echo "Mirror sync complete!"

rm -rf .repo-mirror-cognitive-conversation-deck/
echo "Cleaned up mirror directory."
