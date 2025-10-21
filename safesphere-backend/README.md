# SafeSphere Backend

SafeSphere is a Spring Boot-based backend service that powers a confidential and supportive AI chatbot designed to create a digital space where users feel safe, informed, and empowered. The application integrates with Google's Gemini AI model to provide empathetic guidance on safety, rights, and resources.

## Features

- **AI-Powered Chatbot**: Uses Gemini 2.5 Flash model for conversational support.
- **Multi-Language Support**: Supports responses in multiple Indian languages.
- **Resource Management**: Stores and retrieves legal articles and resources.
- **SQLite Database**: Lightweight database for data persistence.
- **RESTful API**: Provides endpoints for chat interactions and resource queries.

## Technologies Used

- **Java 17+**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **SQLite**
- **LangChain4j** for AI integration
- **Maven** for dependency management

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd safesphere-backend
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

3. Build the project:
   ```bash
   mvn clean install
   ```

## Configuration

The application uses `application.properties` for configuration. Key settings include:

- Server port: 8080
- Database: SQLite (safesphere.db)
- Gemini API key: Loaded from environment variable `GEMINI_API_KEY`

## Running the Application

1. Ensure the `.env` file is set up with your API key.
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Or use the provided `run.bat` script on Windows.

The application will start on `http://localhost:8080`.

## API Endpoints

### Chat
- `POST /api/chat` - Send a message to the chatbot
  - Request body: `{"message": "Your message", "language": "en"}`
  - Response: JSON with answer, quotations, confidence, sources, and escalation flag

### Resources
- `GET /api/resources` - Retrieve all resources
- `GET /api/resources/{id}` - Retrieve a specific resource

### Legal Articles
- `GET /api/legal-articles` - Retrieve all legal articles
- `GET /api/legal-articles/{id}` - Retrieve a specific legal article

## Database

The application uses SQLite for data storage. The database file `safesphere.db` is created automatically on first run. JPA handles schema updates.

## Security Notes

- The Gemini API key is stored in an environment variable and excluded from version control via `.gitignore`.
- Ensure the API key has appropriate permissions for Gemini API access.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on the GitHub repository.