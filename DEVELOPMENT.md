# Development Guidelines

## Auto-merge Policy

This repository uses automated merging for certain types of changes to improve development velocity while maintaining code quality.

### ✅ Safe for Auto-merge

#### Dependency Updates
- **Minor/Patch versions**: Automatically approved and merged
- **Security patches**: Automatically merged after CI passes
- **Development dependencies**: Low risk, auto-merged

#### Documentation Changes
- README updates
- Code comments
- API documentation
- Architecture diagrams

#### Configuration Updates
- Linting rules (non-breaking)
- Prettier configuration
- TypeScript config (non-breaking)
- CI/CD improvements

#### Bot-generated Changes
- Code formatting fixes
- Generated code from schemas
- Automated refactoring

### ⚠️ Requires Manual Review

#### Business Logic
- New features
- Bug fixes affecting user behavior
- Algorithm changes
- Business rule modifications

#### Critical Infrastructure
- Database schema changes
- Authentication/authorization changes
- API breaking changes
- Security-related modifications

#### Large Changes
- More than 100 lines added
- More than 50 lines deleted
- More than 10 files changed
- Architectural changes

## Auto-merge Labels

### `auto-merge`
- Standard auto-merge for small, safe changes
- Limited to PRs with ≤5 files changed
- Blocked if risky files are detected

### `safe-auto-merge`
- For trusted contributors (maintainers)
- Bypasses file count restrictions
- Still requires CI to pass

### `override-safety`
- Overrides safety checks
- Use with extreme caution
- Should include detailed justification in PR description

## Safety Mechanisms

### Automated Checks
1. **CI Pipeline**: Lint, typecheck, test, build must pass
2. **Size Limits**: Max 100 additions, 50 deletions, 10 files
3. **File Pattern Detection**: Blocks risky file changes
4. **Security Scanning**: Trivy vulnerability scanner

### Risky File Patterns
- `packages/database/prisma/schema.prisma`
- `packages/auth/`
- `apps/api/src/`
- `docker-compose*.yml`
- `.env*` files
- Root `package.json`

## Best Practices

### For Contributors
1. **Small PRs**: Keep changes focused and small
2. **Clear Descriptions**: Explain what and why
3. **Appropriate Labels**: Use correct auto-merge labels
4. **Test Coverage**: Ensure changes are tested

### For Maintainers
1. **Review Risky Changes**: Always review database, auth, API changes
2. **Monitor Auto-merges**: Check merged PRs regularly
3. **Update Safety Rules**: Adjust patterns as needed
4. **Emergency Stops**: Disable auto-merge if issues arise

## Emergency Procedures

### Disable Auto-merge
```bash
# Temporarily disable by removing workflow file
git mv .github/workflows/auto-merge-bot.yml .github/workflows/auto-merge-bot.yml.disabled
git commit -m "ci: temporarily disable auto-merge"
git push
```

### Rollback Bad Merge
```bash
# Revert the merge commit
git revert -m 1 <merge-commit-hash>
git push
```

## Monitoring

### What to Watch
- Failed auto-merges
- Security alerts
- Build failures after merges
- User reports of issues

### Tools
- GitHub Actions logs
- Dependabot alerts
- Security advisories
- Error monitoring (if implemented)

## Configuration

### Adjusting Safety Limits
Edit `.github/workflows/auto-merge-bot.yml`:
```yaml
MAX_ADDITIONS=100    # Increase for larger safe changes
MAX_DELETIONS=50     # Adjust deletion threshold
MAX_FILES=10         # File count limit
```

### Adding Risky Patterns
Add to the `RISKY_PATTERNS` array in the workflow:
```bash
RISKY_PATTERNS=(
  "your/critical/path/"
  "important-config.json"
)
```

## Questions?

If you're unsure whether a change should be auto-merged:
1. **Default to manual review** - it's safer
2. **Ask in PR comments** - tag maintainers
3. **Use draft PRs** - for work in progress
4. **Test thoroughly** - ensure CI passes locally first

Remember: Auto-merge is a convenience, not a requirement. When in doubt, request manual review.