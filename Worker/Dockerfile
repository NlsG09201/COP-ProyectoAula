# Use the official OpenJDK 17 slim image as the base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to cache dependencies
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Rename the generated JAR to a fixed name for easier reference
RUN mv target/*.jar app.jar

# Expose the port the worker listens on (adjust if needed)
EXPOSE 8080

# Run the worker service
CMD ["java", "-jar", "app.jar"]