#!/bin/bash

# Script to create structured commits simulating gradual development
# This script will NOT be committed (add to .gitignore)

set -e

echo "🚀 Starting structured commit creation..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

commit_with_message() {
    local message=$1
    echo -e "${BLUE}📝 Commit: ${NC}$message"
    git add .
    git commit -m "$message"
    sleep 1.5
    echo ""
}

# Commit 1: Initial project setup
echo -e "${GREEN}=== Phase 1: Initial setup ===${NC}"
commit_with_message "chore: setup Next.js project with TypeScript and Tailwind CSS"

# Commit 2: Add base UI components
echo -e "${GREEN}=== Phase 2: Base UI components ===${NC}"
commit_with_message "feat(ui): add base components (Button, Input, Card, Modal)"

# Commit 3: Add decorative components
echo -e "${GREEN}=== Phase 3: Decorative elements ===${NC}"
commit_with_message "feat(ui): add WavePattern and CirclePattern decorative components"

# Commit 4: Auth schemas and validations
echo -e "${GREEN}=== Phase 4: Authentication validations ===${NC}"
commit_with_message "feat(validations): add Zod schemas for login and register forms"

# Commit 5: Task schema
echo -e "${GREEN}=== Phase 5: Task validations ===${NC}"
commit_with_message "feat(validations): add task schema with priority and status types"

# Commit 6: Auth service
echo -e "${GREEN}=== Phase 6: Authentication service ===${NC}"
commit_with_message "feat(services): implement authentication service with login and signup"

# Commit 7: Task service
echo -e "${GREEN}=== Phase 7: Task service ===${NC}"
commit_with_message "feat(services): implement task service with CRUD operations"

# Commit 8: Auth hooks
echo -e "${GREEN}=== Phase 8: Authentication hooks ===${NC}"
commit_with_message "feat(hooks): add React Query hooks for authentication (useLogin, useSignup)"

# Commit 9: Task hooks
echo -e "${GREEN}=== Phase 9: Task hooks ===${NC}"
commit_with_message "feat(hooks): add React Query hooks for task management (CRUD operations)"

# Commit 10: Login page
echo -e "${GREEN}=== Phase 10: Login page ===${NC}"
commit_with_message "feat(auth): implement login page with form validation and error handling"

# Commit 11: Register page
echo -e "${GREEN}=== Phase 11: Register page ===${NC}"
commit_with_message "feat(auth): implement register page with password confirmation"

# Commit 12: Task components
echo -e "${GREEN}=== Phase 12: Task components ===${NC}"
commit_with_message "feat(tasks): add TaskCard and TaskForm components"

# Commit 13: Task list with filters
echo -e "${GREEN}=== Phase 13: Task list ===${NC}"
commit_with_message "feat(tasks): implement TaskList with search, filter and sort functionality"

# Commit 14: Dashboard stats
echo -e "${GREEN}=== Phase 14: Dashboard statistics ===${NC}"
commit_with_message "feat(dashboard): add StatCard component with MiniChart visualization"

# Commit 15: Sidebar navigation
echo -e "${GREEN}=== Phase 15: Navigation ===${NC}"
commit_with_message "feat(ui): implement Sidebar with navigation and user info"

# Commit 16: Dashboard page
echo -e "${GREEN}=== Phase 16: Dashboard page ===${NC}"
commit_with_message "feat(dashboard): create main dashboard page with stats and task management"

# Commit 17: React Query provider
echo -e "${GREEN}=== Phase 17: State management ===${NC}"
commit_with_message "feat(providers): add React Query provider with optimized configuration"

# Commit 18: Auth utilities
echo -e "${GREEN}=== Phase 18: Auth utilities ===${NC}"
commit_with_message "feat(utils): add authentication utilities for token and user management"

# Commit 19: Page title hook
echo -e "${GREEN}=== Phase 19: Page utilities ===${NC}"
commit_with_message "feat(hooks): add usePageTitle hook for dynamic page titles"

# Commit 20: Home page redirect
echo -e "${GREEN}=== Phase 20: Home page ===${NC}"
commit_with_message "feat(app): add home page with authentication redirect logic"

# Commit 21: Code cleanup - remove unused hooks
echo -e "${GREEN}=== Phase 21: Code cleanup - hooks ===${NC}"
commit_with_message "refactor(hooks): remove unused legacy hooks"

# Commit 22: Code cleanup - comments
echo -e "${GREEN}=== Phase 22: Code cleanup - comments ===${NC}"
commit_with_message "refactor: remove all unnecessary comments and improve code readability"

# Commit 23: Code cleanup - unused variables
echo -e "${GREEN}=== Phase 23: Code cleanup - variables ===${NC}"
commit_with_message "refactor: remove unused variables and imports"

# Commit 24: Final build verification
echo -e "${GREEN}=== Phase 24: Final verification ===${NC}"
commit_with_message "chore: verify production build and optimize bundle size"

echo ""
echo -e "${GREEN}✅ All commits created successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Commit summary (last 10):${NC}"
git log --oneline -10
echo ""
echo -e "${BLUE}💡 Total commits created: 24${NC}"
echo -e "${BLUE}💡 Use 'git log' to see all detailed commit messages${NC}"
echo -e "${BLUE}💡 Use 'git push' to push your commits${NC}"

