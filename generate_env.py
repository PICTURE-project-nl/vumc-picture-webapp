import os

# Retrieve environment variables
environment = os.getenv("ENVIRONMENT", "localhost")
server_url = os.getenv("SERVER_URL", "http://localhost:8000")  # Default for localhost

# Determine the appropriate BASE_URL and API_URL based on environment
if environment == "server":
    base_url = server_url
    api_url = f"{server_url}/api"
else:
    base_url = "http://localhost:8000"
    api_url = "http://localhost/api"

# Define the content for the .env file
env_content = f"""
# Environment-based configuration
BASE_URL={base_url}
API_URL={api_url}
"""

# Write the content to the .env file
env_file_path = os.path.join(os.getcwd(), ".env")
with open(env_file_path, "w") as f:
    f.write(env_content.strip())

print(f".env file generated successfully for {environment} environment at {env_file_path}")
print(f"BASE_URL: {base_url}")
print(f"API_URL: {api_url}")
