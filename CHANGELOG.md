# Changelog

All notable changes to the Employee Directory Raycast Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-12

### Added

#### Core Features
- **Employee Search**: Incremental search functionality supporting:
  - Employee ID (社員番号)
  - Japanese name (日本語氏名)
  - English name (英語氏名)
  - Nickname (ニックネーム)
  - Email address (メールアドレス)
- **Fuzzy Search**: Powered by Fuse.js with weighted search priorities
- **Copy to Clipboard**: Individual copy actions for all employee attributes
- **Left-Right Split UI**: Similar to Raycast Clipboard History interface

#### Google Sheets Integration
- **Real-time Sync**: Automatic data synchronization from Google Sheets
- **Configurable Intervals**: Auto-sync options (30min, 1h, 2h, 4h, manual)
- **Service Account Authentication**: Secure Google API access
- **Error Handling**: Graceful fallback to local data on sync failures

#### Data Management
- **Local JSON Storage**: Secure local data storage
- **Sample Data**: Included sample employee data for testing
- **Data Validation**: Type-safe employee data structure
- **Privacy Protection**: Sensitive data excluded from version control

#### User Interface
- **Search Bar**: Responsive search with placeholder text
- **Employee List**: Clean display with employment type and status indicators
- **Detail View**: Formatted employee information with status icons
- **Action Panel**: Context-sensitive copy actions
- **Keyboard Shortcuts**: Cmd+R for data refresh

#### Developer Experience
- **TypeScript**: Full type safety throughout the application
- **React Components**: Modern React with hooks
- **ESLint Configuration**: Code quality and consistency
- **Build System**: Optimized build process with TypeScript compilation
- **Git Integration**: Proper .gitignore and version control setup

#### Installation & Distribution
- **Quick Install Script**: One-liner installation command
- **Manual Setup**: Detailed setup instructions
- **Cross-Machine Support**: Easy deployment to multiple Macs
- **Documentation**: Comprehensive README and setup guides

### Technical Details
- **Node.js**: Requires v22+
- **Raycast API**: v1.83.1
- **Dependencies**: Fuse.js v7.0.0, Google APIs v144.0.0
- **TypeScript**: v5.4.5 with strict type checking

### Security
- **Credential Protection**: Service account keys excluded from repository
- **Data Privacy**: Employee data not committed to version control
- **Secure Defaults**: Safe configuration with sample data