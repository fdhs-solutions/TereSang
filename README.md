# Teresang

### Backend Folder Structure

```bash
src/
├── app.js                     # Main entry point of the application
├── config/                    # Configuration files
│   ├── app/
│   │   ├── appConfig.js       # General app configuration (middlewares, body parsers, etc.)
│   │   └── route.js           # Centralized route registration
│   ├── db.js                  # Sequelize / database configuration
│   └── corsConfig.js          # CORS settings
├── models/                    # Sequelize models for database tables
│   ├── Auth.js
│   ├── UserFamilyDetails.js
│   ├── UserLifeStyleAndEducation.js
│   ├── UserPartnerPreferences.js
│   ├── UserPersonalDetails.js
│   ├── UserRegistrationProfile.js
│   ├── UserRoles.js
│   └── UserImages.js
├── /dtos/
│   ├── AuthDTOs.js
|   ├── UserFamilyDTOs.js
|   ├── UserImageDTOs.js
|   ├── UserLifeStyleDTOs.js
|   ├── UserPartnerPreferencesDTOs.js
|   ├── UserPersonalDetailsDTOs.js
|   └── ViewProfilesDTOs.js
├── controllers/               # Controllers handle requests and responses
│   ├── services/              # Business logic / service layer
│   │   ├── AuthService.js
│   │   ├── UserFamilyService.js
│   │   ├── UserImageService.js
│   │   ├── UserLifeStyleService.js
│   │   ├── UserPartnerPreferencesService.js
│   │   ├── UserPersonalDetailsService.js
│   │   └── ViewProfilesService.js
│   ├── AuthController.js
│   ├── UserFamilyController.js
│   ├── UserImageController.js
│   ├── UserLifeStyleController.js
│   ├── UserPartnerPreferencesController.js
│   ├── UserPersonalDetailsController.js
│   └── ViewProfilesController.js
├── middlewares/              # Express middlewares
│   ├── authMiddleware.js      # JWT / auth verification
│   ├── uploadMiddleware.js    # File upload handling
│   └── errorHandler.js        # Centralized error handling
├── routes/                    # Route definitions
│   ├── AuthRoute.js
│   ├── UserFamilyRoute.js
│   ├── UserImageRoute.js
│   ├── UserLifeStyleRoute.js
│   ├── UserPartnerPreferencesRoute.js
│   ├── UserPersonalDetailsRoute.js
│   └── ViewProfilesRoute.js
├── utils/                     # Utility/helper functions
│   ├── responseHelper.js      # Standardized API responses
│   ├── generateUUID.js        # Generate unique IDs
│   └── mailer.js              # Email sending utility
└── .env                       # Environment variables

```
