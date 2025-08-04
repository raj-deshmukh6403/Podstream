# 🎧 Podstream - Full-Stack MERN Podcast Platform

![Podstream Logo](client/public/logo.svg)

A modern, feature-rich podcast platform built with the MERN stack, offering seamless audio streaming, content management, and user engagement features. Podstream provides creators with powerful tools to upload, manage, and distribute their podcasts while giving listeners an exceptional browsing and listening experience.

## 📸 Screenshots

### Homepage
![Homepage](client/public/images/image/podcast.jpeg)

### Featured Content Areas
- **Business Podcasts**: ![Business](client/public/images/image/business.jpeg)
- **Comedy Shows**: ![Comedy](client/public/images/image/comedy.jpeg)
- **True Crime**: ![Crime](client/public/images/image/crime.jpeg)
- **History Content**: ![History](client/public/images/image/history.jpeg)
- **Tech Today**: ![Tech](client/public/images/image/techtoday.jpeg)
- **Mind Moments**: ![Mindfulness](client/public/images/image/mindmoments.jpeg)

### Creator Profiles
<div style="display: flex; gap: 10px;">
  <img src="client/public/images/image/aryan.jpg" alt="Aryan" width="150" height="150" style="border-radius: 50%;">
  <img src="client/public/images/image/atharva.jpg" alt="Atharva" width="150" height="150" style="border-radius: 50%;">
  <img src="client/public/images/image/Elena.jpeg" alt="Elena" width="150" height="150" style="border-radius: 50%;">
  <img src="client/public/images/image/jessica.jpeg" alt="Jessica" width="150" height="150" style="border-radius: 50%;">
  <img src="client/public/images/image/Marcus.jpeg" alt="Marcus" width="150" height="150" style="border-radius: 50%;">
  <img src="client/public/images/image/raj.jpg" alt="Raj" width="150" height="150" style="border-radius: 50%;">
</div>

## 🚀 Features

### 🎵 Core Audio Features
- **High-Quality Audio Streaming**: Support for MP3, WAV, and OGG formats
- **Custom Audio Player**: Built-in player with play/pause, seek, volume control
- **Audio Upload**: Seamless audio file upload with Cloudinary integration
- **Audio Processing**: Automatic duration calculation and metadata extraction
- **Playback Controls**: Advanced seek functionality and audio quality optimization

### 👥 User Management & Authentication
- **Multi-Role System**: User, Creator, and Admin roles with distinct permissions
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Profile Management**: Customizable user profiles with bio and profile images
- **Password Recovery**: Secure forgot password functionality with email verification
- **Notification Preferences**: Granular control over email and in-app notifications

### 🎨 Content Management
- **Podcast Creation**: Intuitive podcast upload form with metadata management
- **Rich Media Support**: Cover image uploads with automatic optimization
- **Category System**: Organized content categorization for easy discovery
- **Tag Management**: Flexible tagging system for enhanced searchability
- **Draft/Published States**: Content workflow management for creators

### 🔧 Creator Dashboard
- **Personal Dashboard**: Comprehensive overview of podcast statistics
- **Analytics Insights**: Track plays, likes, and engagement metrics
- **Content Management**: Edit, update, or delete uploaded podcasts
- **Performance Metrics**: Detailed analytics on audience engagement
- **Upload Management**: Bulk operations and content organization tools

### 👑 Admin Panel
- **User Management**: Complete user administration with role assignments
- **Content Moderation**: Review and manage all platform content
- **Analytics Dashboard**: Platform-wide statistics and insights
- **Category & Tag Management**: Organize and maintain content taxonomies
- **System Monitoring**: Real-time platform health and performance metrics
- **Bulk Operations**: Efficient management of large content volumes

### 🔍 Discovery & Engagement
- **Advanced Search**: Full-text search across podcasts and creators
- **Category Filtering**: Browse content by specific categories
- **Like System**: Social engagement features for content appreciation
- **Play Tracking**: Automatic play count recording for analytics
- **Responsive Design**: Optimized for all device sizes and platforms

### 📧 Communication Features
- **Contact System**: Built-in contact form for user inquiries
- **Email Integration**: Automated email notifications and newsletters
- **Newsletter Subscription**: Keep users engaged with regular updates
- **Notification System**: Real-time updates for user activities

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1**: Modern functional components with hooks
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React Router Dom**: Client-side routing and navigation
- **Framer Motion**: Smooth animations and transitions
- **React Hot Toast**: Beautiful notification system
- **Axios**: HTTP client for API communication
- **Formik & Yup**: Form handling and validation
- **Lucide React**: Modern icon library
- **React Audio Player**: Specialized audio playback components
- **Recharts**: Data visualization and analytics charts
- **Moment.js**: Date and time manipulation

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure authentication
- **Bcrypt.js**: Password hashing and security
- **Cloudinary**: Cloud-based media management and optimization
- **Multer**: File upload middleware
- **Nodemailer**: Email sending capabilities
- **Morgan**: HTTP request logging
- **CORS**: Cross-Origin Resource Sharing configuration
- **Joi**: Data validation and sanitization

### Development & Deployment
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS post-processing
- **Autoprefixer**: CSS vendor prefixing
- **Vercel**: Frontend and backend deployment platform
- **Concurrently**: Run multiple scripts simultaneously

## 📁 Project Structure

```
Podstream/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── images/image/           # User avatars and content images
│   │   └── logo.svg                # Platform branding
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── AdminRoute.jsx      # Admin access protection
│   │   │   ├── AudioPlayer.jsx     # Custom audio player
│   │   │   ├── CategoryFilter.jsx  # Content filtering
│   │   │   ├── Layout.jsx          # Main app layout
│   │   │   ├── PodcastCard.jsx     # Podcast display component
│   │   │   ├── PrivateRoute.jsx    # Authentication guard
│   │   │   ├── SearchBar.jsx       # Search functionality
│   │   │   └── UploadForm.jsx      # File upload interface
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global authentication state
│   │   ├── pages/                  # Application pages
│   │   │   ├── ADMIN/              # Admin panel pages
│   │   │   ├── Dashboard.jsx       # Creator dashboard
│   │   │   ├── Home.jsx            # Main homepage
│   │   │   ├── Login.jsx           # User authentication
│   │   │   ├── PodcastCreate.jsx   # Content creation
│   │   │   ├── PodcastDetails.jsx  # Individual podcast view
│   │   │   └── Profile.jsx         # User profile management
│   │   └── utils/
│   │       └── api.js              # API configuration and calls
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
├── server/                         # Backend Node.js application
│   ├── controllers/                # Business logic handlers
│   │   ├── adminController.js      # Admin operations
│   │   ├── analyticsController.js  # Data analytics
│   │   ├── podcastController.js    # Podcast CRUD operations
│   │   └── userController.js       # User management
│   ├── middleware/                 # Custom middleware
│   │   ├── authMiddleware.js       # Authentication verification
│   │   ├── errorHandler.js         # Error handling
│   │   └── roleMiddleware.js       # Role-based access control
│   ├── models/                     # Database schemas
│   │   ├── User.js                 # User data model
│   │   ├── Podcast.js              # Podcast data model
│   │   ├── Category.js             # Category taxonomy
│   │   └── Tag.js                  # Tag system
│   ├── routes/                     # API endpoints
│   │   ├── adminRoutes.js          # Admin panel APIs
│   │   ├── podcastRoutes.js        # Podcast operations
│   │   ├── userRoutes.js           # User management
│   │   └── analyticsRoutes.js      # Analytics endpoints
│   ├── utils/                      # Utility functions
│   │   ├── cloudinary.js           # Media upload configuration
│   │   ├── emailSender.js          # Email service setup
│   │   └── jwtUtils.js             # JWT token utilities
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Application entry point
└── package.json                    # Root project configuration
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for media storage)
- **Email Service** (Gmail/SendGrid for notifications)

### 1. Clone the Repository
```bash
git clone https://github.com/raj-deshmukh6403/Podstream.git
cd Podstream
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, client, and server)
npm run install-all

# Or install individually
npm install                    # Root dependencies
npm run install-client        # Frontend dependencies
npm run install-server        # Backend dependencies
```

### 3. Environment Configuration

Create `.env` file in the `server` directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/podstream
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/podstream

# JWT Security
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=production
```

### 4. Database Seeding (Optional)
```bash
cd server
npm run seed:categories    # Populate default categories
npm run seed:tags         # Populate default tags
npm run seed:all          # Run all seeding scripts
```

### 5. Start Development Servers
```bash
# Start both frontend and backend concurrently
npm start

# Or start individually
npm run client    # Frontend only (http://localhost:5173)
npm run server    # Backend only (http://localhost:5000)
```

## 🌐 API Endpoints

### Authentication Endpoints
```http
POST   /api/auth/register           # User registration
POST   /api/auth/login              # User login
POST   /api/auth/forgot-password    # Password reset request
POST   /api/auth/reset-password     # Password reset confirmation
GET    /api/auth/profile            # Get user profile
PUT    /api/auth/profile            # Update user profile
PUT    /api/auth/profile/image      # Update profile image
```

### Podcast Management
```http
GET    /api/podcasts                # Get all podcasts (with pagination/search)
GET    /api/podcasts/:id            # Get specific podcast
POST   /api/podcasts                # Create new podcast (Creator+)
PUT    /api/podcasts/:id            # Update podcast (Creator/Admin)
DELETE /api/podcasts/:id            # Delete podcast (Creator/Admin)
PUT    /api/podcasts/:id/like       # Toggle like status
PUT    /api/podcasts/:id/play       # Record play count
GET    /api/podcasts/user           # Get user's podcasts
GET    /api/podcasts/stats          # Get podcast statistics
```

### Category & Tag Management
```http
GET    /api/categories              # Get all categories
POST   /api/categories              # Create category (Admin)
PUT    /api/categories/:id          # Update category (Admin)
DELETE /api/categories/:id          # Delete category (Admin)

GET    /api/tags                    # Get all tags
POST   /api/tags                    # Create tag (Admin)
PUT    /api/tags/:id               # Update tag (Admin)
DELETE /api/tags/:id               # Delete tag (Admin)
```

### Admin Panel
```http
GET    /api/admin/stats             # Get platform statistics
GET    /api/admin/users             # Get all users (with pagination)
POST   /api/admin/users             # Create new user
PUT    /api/admin/users/:id         # Update user details
DELETE /api/admin/users/:id         # Delete user
GET    /api/admin/podcasts          # Get all podcasts for moderation
PUT    /api/admin/podcasts/:id      # Update podcast status
DELETE /api/admin/podcasts/:id      # Delete any podcast
```

### Analytics & Reporting
```http
GET    /api/analytics/overview      # Platform overview stats
GET    /api/analytics/users         # User engagement analytics
GET    /api/analytics/podcasts      # Podcast performance metrics
GET    /api/analytics/categories    # Category-wise statistics
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: Bcrypt with salt rounds for password security
- **Role-Based Access**: Granular permissions for Users, Creators, and Admins
- **Route Protection**: Middleware-based route security
- **Token Expiration**: Automatic session management

### Data Protection
- **Input Validation**: Joi schema validation for all inputs
- **SQL Injection Prevention**: Mongoose ODM with parameterized queries
- **XSS Protection**: Input sanitization and output encoding
- **CORS Configuration**: Controlled cross-origin resource sharing
- **File Upload Security**: Type validation and size limits

### Infrastructure Security
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error catching without data exposure
- **Rate Limiting**: API endpoint protection (can be implemented)
- **HTTPS Ready**: SSL/TLS support for production deployment

## 📊 Key Metrics & Analytics

### User Analytics
- **Registration Trends**: Track user growth over time
- **Engagement Metrics**: Monitor user activity and retention
- **Role Distribution**: Analyze user role adoption
- **Geographic Data**: User location and regional preferences

### Content Analytics
- **Upload Statistics**: Track content creation trends
- **Play Counts**: Monitor podcast popularity and engagement
- **Category Performance**: Analyze most popular content types
- **Creator Insights**: Individual creator performance metrics

### Platform Health
- **System Performance**: Monitor server response times
- **Storage Usage**: Track media storage consumption
- **Error Rates**: Monitor system reliability
- **Feature Usage**: Analyze feature adoption and usage patterns

## 🌟 Advanced Features

### Audio Processing
- **Format Support**: MP3, WAV, OGG audio formats
- **Automatic Transcoding**: Cloudinary-based audio optimization
- **Duration Extraction**: Automatic audio length calculation
- **Quality Control**: Audio quality validation and optimization

### Search & Discovery
- **Full-Text Search**: Advanced search across titles and descriptions
- **Faceted Search**: Filter by categories, tags, creators
- **Recommendation Engine**: Content suggestion algorithms
- **Trending Content**: Popular and trending podcast identification

### Social Features
- **Like System**: Social engagement tracking
- **Sharing Capabilities**: Social media sharing integration
- **Creator Following**: User-creator relationship management
- **Comment System**: Community engagement features (extensible)

### Performance Optimization
- **Lazy Loading**: Efficient content loading strategies
- **Image Optimization**: Automatic image compression and sizing
- **CDN Integration**: Cloudinary CDN for global content delivery
- **Caching Strategies**: Redis integration ready for enhanced performance

## 🚀 Deployment

### Production Environment Setup

#### Frontend Deployment (Vercel)
1. **Build Configuration**:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

2. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   ```

#### Backend Deployment (Vercel/Heroku/DigitalOcean)
1. **Production Environment**:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/podstream
   JWT_SECRET=your_production_jwt_secret
   # ... other production environment variables
   ```

2. **Build Scripts**:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "build": "npm install"
     }
   }
   ```

### Database Migration
```bash
# Production database setup
npm run seed:categories
npm run seed:tags
# Import any existing data
mongorestore --uri="your_production_mongodb_uri" --db=podstream ./backup
```

## 🤝 Contributing

We welcome contributions to Podstream! Here's how you can help:

### Development Workflow
1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Standards
- **ESLint Configuration**: Follow the established linting rules
- **Component Structure**: Use functional components with hooks
- **API Design**: RESTful principles with consistent responses
- **Error Handling**: Comprehensive error catching and logging
- **Documentation**: Update documentation for new features

### Testing Guidelines
- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Test complete user workflows
- **Performance Tests**: Monitor application performance metrics

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team & Contact

### Development Team
- **Project Lead**: [Your Name]
- **Frontend Development**: React.js specialists
- **Backend Development**: Node.js experts
- **UI/UX Design**: Modern interface designers
- **DevOps**: Deployment and infrastructure specialists

### Support & Community
- **Documentation**: Comprehensive guides and API documentation
- **Issue Tracking**: GitHub Issues for bug reports and feature requests
- **Community Forum**: Discord/Slack for community discussions
- **Email Support**: [support@podstream.com](mailto:support@podstream.com)

## 🔮 Roadmap & Future Features

### Upcoming Features
- **Mobile Application**: React Native mobile app
- **Live Streaming**: Real-time podcast broadcasting
- **Monetization**: Creator revenue sharing and premium subscriptions
- **Advanced Analytics**: Machine learning-powered insights
- **Social Features**: Enhanced community interaction features

### Technical Improvements
- **Microservices Architecture**: Scalable service-oriented design
- **GraphQL API**: More efficient data fetching
- **Real-time Features**: WebSocket integration for live features
- **Enhanced Security**: Advanced security monitoring and protection
- **Performance Optimization**: Advanced caching and CDN strategies

---

**Built with ❤️ by the Podstream Team**

*Empowering creators, connecting communities, one podcast at a time.*
