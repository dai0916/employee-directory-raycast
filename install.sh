#!/bin/bash

# Employee Directory Raycast Extension - Quick Install Script
# Usage: curl -fsSL https://raw.githubusercontent.com/dai0916/employee-directory-raycast/main/install.sh | bash

set -e

echo "🚀 Installing Employee Directory Raycast Extension..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This extension only works on macOS with Raycast installed."
    exit 1
fi

# Check if Raycast is installed
if ! command -v ray &> /dev/null; then
    echo "📦 Installing Raycast CLI..."
    npm install -g @raycast/api
fi

# Create installation directory
INSTALL_DIR="$HOME/.raycast-extensions/employee-directory"
echo "📁 Creating installation directory: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

# Download and extract the latest release
REPO_URL="https://github.com/dai0916/employee-directory-raycast"
echo "⬇️  Downloading latest release..."
cd "$INSTALL_DIR"

# Clone the repository
git clone "$REPO_URL.git" . 2>/dev/null || {
    echo "📥 Updating existing installation..."
    git pull origin main
}

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Node.js not found. Please install Node.js v22+ manually:"
    echo "   https://nodejs.org/ or use nvm:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   nvm install 22 && nvm use 22"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "⚠️  Node.js v22+ required. Current version: $(node -v)"
    echo "   Please upgrade: nvm install 22 && nvm use 22"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the extension
echo "🔨 Building extension..."
npx tsc
ray build

# Setup data file
echo "📄 Setting up data file..."
if [ ! -f "employee-data.json" ]; then
    cp employee-data.sample.json employee-data.json
    echo "✅ Created employee-data.json from sample"
fi

# Update package.json paths
echo "🔧 Configuring paths..."
CURRENT_PATH="$PWD"
if command -v jq &> /dev/null; then
    jq ".preferences[0].default = \"$CURRENT_PATH/employee-data.json\"" package.json > package.tmp.json && mv package.tmp.json package.json
else
    # Fallback if jq is not available
    sed -i.bak "s|/Users/dai/work/raycast-extension/employee-data.json|$CURRENT_PATH/employee-data.json|g" package.json
    rm -f package.json.bak
fi

echo ""
echo "🎉 Installation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Open Raycast"
echo "2. Type 'Import Extension'"
echo "3. Select folder: $INSTALL_DIR"
echo "4. Configure extension preferences in Raycast settings"
echo ""
echo "📖 For Google Sheets setup, see: $INSTALL_DIR/GOOGLE_SHEETS_SETUP.md"
echo ""
echo "🔍 Try it: Open Raycast and type 'Search Employee'"