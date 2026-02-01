# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the Boarding House Management System seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Send an email to [YOUR_EMAIL@example.com] with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Any suggested fixes (optional)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Investigation**: We will investigate the issue and determine its impact
- **Timeline**: We aim to resolve critical issues within 7 days
- **Updates**: We will keep you informed about the progress
- **Credit**: With your permission, we will credit you in the security advisory

### Security Best Practices

When using or contributing to this project:

1. **Never commit secrets** - Use environment variables for sensitive data
2. **Keep dependencies updated** - Regularly update npm packages
3. **Use HTTPS** - Always use secure connections in production
4. **Validate input** - Never trust user input
5. **Use prepared statements** - Prisma handles this, but be careful with raw queries

## Security Features

This application implements several security measures:

- **Authentication**: NextAuth.js v5 with secure session handling
- **Authorization**: Role-based access control (Landlord, Boarder)
- **Input Validation**: Zod schemas for all user inputs
- **CSRF Protection**: Built into Next.js
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Prevention**: React's built-in escaping

## Dependencies

We use Dependabot to automatically update dependencies and patch security vulnerabilities.

## Disclosure Policy

- Security issues will be disclosed after a fix has been released
- We will coordinate disclosure with the reporter
- Credit will be given to reporters who follow responsible disclosure
