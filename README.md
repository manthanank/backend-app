# Backend App

A production-ready Node.js/Express backend application with MongoDB, featuring OTP authentication, email services, comprehensive health monitoring, and robust error handling.

## ✨ Features

- 🔐 **OTP Authentication** - Email-based OTP verification system
- 📧 **Email Service** - Unified email service with SMTP support
- 🏥 **Health Monitoring** - Comprehensive health checks for Kubernetes/Docker
- 📊 **Request Tracking** - Unique request IDs for debugging
- 🛡️ **Security** - Helmet, CORS, rate limiting, input validation
- 📝 **Logging** - Winston logger with MongoDB transport
- 🎯 **Rate Limiting** - Global and endpoint-specific rate limits
- 🔄 **Graceful Shutdown** - Proper cleanup on termination
- 📚 **API Documentation** - Swagger/OpenAPI documentation
- ✅ **Environment Validation** - Startup validation of required env vars

## 📋 Prerequisites

- **Node.js**: >= 20.x
- **NPM**: >= 10.x
- **MongoDB**: >= 5.x
- **SMTP Server** (for email features - optional)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/manthanank/backend-app.git

# Navigate to project directory
cd backend-app

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
DOMAIN=localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/backend-app

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4200

# Email Configuration (SMTP)
SMPT_HOST=smtp.gmail.com
SMPT_PORT=465
SMPT_MAIL=your-email@gmail.com
SMPT_APP_PASS=your-app-password

# Notion API (Optional)
NOTION_TOKEN=your-notion-token
NOTION_DATABASE_ID=your-database-id
```

### Running the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:

- **Swagger UI**: http://localhost:3000/api/docs

## 🔄 API Versioning

This API uses URI versioning for better backward compatibility and smoother upgrades.

### Current Version: v1 (Stable)

All new integrations should use the versioned endpoints:

```
# Recommended (Versioned)
GET http://localhost:3000/api/v1/books

# Legacy (Deprecated - will be removed in 2027)
GET http://localhost:3000/api/books
```

### Version History

| Version | Status | Release Date | Sunset Date |
|---------|--------|--------------|-------------|
| **v1** | ✅ Stable | 2026-02-02 | - |
| unversioned | ⚠️ Deprecated | 2024-01-01 | 2027-01-01 |

### Migration Guide

**From unversioned to v1:**

```javascript
// Old (Deprecated)
fetch('http://localhost:3000/api/books')

// New (Recommended)
fetch('http://localhost:3000/api/v1/books')
```

All endpoints remain the same, just add `/v1` after `/api`.

### Deprecation Headers

Legacy endpoints return deprecation headers:

```
X-API-Deprecated: true
X-API-Sunset-Date: 2027-01-01
X-API-Deprecation-Info: This endpoint is deprecated. Please use /api/v1/* instead.
```

## 🔌 API Endpoints

### Health & Monitoring

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Comprehensive health check with DB status |
| `/readiness` | GET | Kubernetes readiness probe |
| `/liveness` | GET | Kubernetes liveness probe |
| `/metrics` | GET | Performance metrics |
| `/api` | GET | API version information |
| `/api/v1` | GET | API v1 information |

### OTP Authentication

| Endpoint (v1) | Endpoint (Legacy) | Method | Description |
|---------------|-------------------|--------|-------------|
| `/api/v1/sendOTP` | `/api/sendOTP` ⚠️ | GET | Send OTP to email |
| `/api/v1/verifyOTP` | `/api/verifyOTP` ⚠️ | GET | Verify OTP code |

### Subscribers

| Endpoint (v1) | Endpoint (Legacy) | Method | Description |
|---------------|-------------------|--------|-------------|
| `/api/v1/subscribers` | `/api/subscribers` ⚠️ | GET | Get all subscribers (paginated) |
| `/api/v1/subscribe` | `/api/subscribe` ⚠️ | POST | Subscribe to newsletter |
| `/api/v1/unsubscribe` | `/api/unsubscribe` ⚠️ | POST | Unsubscribe from newsletter |
| `/api/v1/subscribers/:id` | `/api/subscribers/:id` ⚠️ | DELETE | Delete subscriber by ID |

### Books

| Endpoint (v1) | Endpoint (Legacy) | Method | Description |
|---------------|-------------------|--------|-------------|
| `/api/v1/books` | `/api/books` ⚠️ | GET | Get all books (paginated) |
| `/api/v1/books/:id` | `/api/books/:id` ⚠️ | GET | Get book by ID |
| `/api/v1/books` | `/api/books` ⚠️ | POST | Create new book |
| `/api/v1/books/:id` | `/api/books/:id` ⚠️ | PUT | Update book |
| `/api/v1/books/:id` | `/api/books/:id` ⚠️ | DELETE | Delete book |

### Items

| Endpoint (v1) | Endpoint (Legacy) | Method | Description |
|---------------|-------------------|--------|-------------|
| `/api/v1/items` | `/api/items` ⚠️ | GET | Get all items (paginated) |
| `/api/v1/items/:id` | `/api/items/:id` ⚠️ | GET | Get item by ID |
| `/api/v1/items` | `/api/items` ⚠️ | POST | Create new item |
| `/api/v1/items/:id` | `/api/items/:id` ⚠️ | PUT | Update item |
| `/api/v1/items/:id` | `/api/items/:id` ⚠️ | DELETE | Delete item |

### Static Data

| Endpoint (v1) | Endpoint (Legacy) | Method | Description |
|---------------|-------------------|--------|-------------|
| `/api/v1/states` | `/api/states` ⚠️ | GET | Get Indian states list |
| `/api/v1/districts` | `/api/districts` ⚠️ | GET | Get districts list |
| `/api/v1/jokes` | `/api/jokes` ⚠️ | GET | Get random jokes |
| `/api/v1/uses` | `/api/uses` ⚠️ | GET | Get tech stack info |

⚠️ = Deprecated - Use v1 endpoints instead

## 🏗️ Architecture

```
backend-app/
├── config/              # Configuration files
│   ├── constants.js     # Application constants
│   ├── db.js           # Database connection
│   └── validateEnv.js  # Environment validation
├── controllers/         # Route controllers
├── middleware/         # Custom middleware
│   ├── errorHandler.js # Global error handler
│   ├── rateLimiters.js # Rate limiting configs
│   ├── requestId.js    # Request ID tracking
│   └── validators.js   # Input validation
├── models/             # Mongoose models
├── routes/             # API routes
├── services/           # Business logic services
│   ├── emailService.js # Email service
│   ├── books.js        # Book service
│   └── items.js        # Item service
├── public/             # Static frontend files
├── __tests__/          # Test files
├── index.js            # Application entry point
└── logger.js           # Winston logger config
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Configurable origin restrictions
- **Rate Limiting** - Global (100 req/15min) and endpoint-specific limits
- **Input Validation** - express-validator for all inputs
- **Environment Validation** - Required env vars checked at startup
- **Request ID Tracking** - Every request gets unique ID for auditing

## 📊 Monitoring & Logging

### Winston Logger

All application logs are handled by Winston:
- Console output (development)
- File logging (development)
- MongoDB logging (production)

### Health Checks

```bash
# Basic health check
curl http://localhost:3000/health

# Response includes:
{
  "status": "ok",
  "version": "1.0.0",
  "uptime": 1234,
  "environment": "development",
  "database": {
    "status": "connected",
    "responseTime": "5ms"
  },
  "memory": {...},
  "cpu": {...}
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- controllers/healthController.test.js
```

## 🐳 Docker Support

(Coming soon)

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/db` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DOMAIN` | Application domain | `localhost:3000` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `SMPT_HOST` | SMTP server host | - |
| `SMPT_PORT` | SMTP server port | `465` |
| `SMPT_MAIL` | SMTP email address | - |
| `SMPT_APP_PASS` | SMTP password/app password | - |

## 📈 Performance

- Average response time: < 20ms
- Database query optimization
- Response compression enabled
- Static file caching
- Graceful shutdown handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🐛 Troubleshooting

### Common Issues

**Issue: MongoDB connection failed**
```bash
# Check if MongoDB is running
mongosh

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/backend-app
```

**Issue: Email not sending**
```bash
# Verify SMTP credentials
# For Gmail, use app-specific password:
# https://myaccount.google.com/apppasswords
```

**Issue: Port already in use**
```bash
# Change PORT in .env or kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Manthan Ankolekar**
- GitHub: [@manthanank](https://github.com/manthanank)
- Sponsor: [GitHub Sponsors](https://github.com/sponsors/manthanank)

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- All contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/manthanank/backend-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/manthanank/backend-app/discussions)

---

**⭐ Star this repo if you find it helpful!**
