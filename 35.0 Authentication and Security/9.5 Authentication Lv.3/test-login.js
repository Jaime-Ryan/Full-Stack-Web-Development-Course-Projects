import fetch from 'node-fetch';

async function testLoginPersistence() {
  console.log("🧪 Testing Login and Session Persistence...\n");
  
  try {
    // Step 1: Get login page and session cookie
    console.log("1. Getting login page...");
    const loginPageResponse = await fetch('http://localhost:3000/login');
    const cookies = loginPageResponse.headers.get('set-cookie');
    const sessionCookie = cookies ? cookies.split(';')[0] : null;
    
    console.log("   Status:", loginPageResponse.status);
    console.log("   Session cookie:", sessionCookie);
    
    if (!sessionCookie) {
      console.log("❌ No session cookie received!");
      return;
    }
    
    // Step 2: Attempt login with test credentials
    console.log("\n2. Attempting login...");
    const loginData = new URLSearchParams({
      username: 'test@example.com',
      password: 'testpassword'
    });
    
    const loginResponse = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': sessionCookie
      },
      body: loginData,
      redirect: 'manual'
    });
    
    console.log("   Login status:", loginResponse.status);
    console.log("   Login redirect:", loginResponse.headers.get('location'));
    
    // Get updated session cookie after login attempt
    const newCookies = loginResponse.headers.get('set-cookie');
    const updatedSessionCookie = newCookies ? newCookies.split(';')[0] : sessionCookie;
    
    // Step 3: Test accessing protected route after login attempt
    console.log("\n3. Testing protected route access after login...");
    const secretsResponse = await fetch('http://localhost:3000/secrets', {
      method: 'GET',
      headers: {
        'Cookie': updatedSessionCookie
      },
      redirect: 'manual'
    });
    
    console.log("   Secrets status:", secretsResponse.status);
    console.log("   Secrets redirect:", secretsResponse.headers.get('location'));
    
    // Step 4: Test home page to see authentication status
    console.log("\n4. Testing home page with session...");
    const homeResponse = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: {
        'Cookie': updatedSessionCookie
      }
    });
    
    console.log("   Home status:", homeResponse.status);
    
    // Step 5: Register a new user for testing
    console.log("\n5. Testing user registration...");
    const registerData = new URLSearchParams({
      username: 'newuser@test.com',
      password: 'newpassword123'
    });
    
    const registerResponse = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': sessionCookie
      },
      body: registerData,
      redirect: 'manual'
    });
    
    console.log("   Register status:", registerResponse.status);
    console.log("   Register redirect:", registerResponse.headers.get('location'));
    
    const regCookies = registerResponse.headers.get('set-cookie');
    const regSessionCookie = regCookies ? regCookies.split(';')[0] : sessionCookie;
    
    // Step 6: Test secrets access after registration
    console.log("\n6. Testing secrets access after registration...");
    const secretsAfterRegResponse = await fetch('http://localhost:3000/secrets', {
      method: 'GET',
      headers: {
        'Cookie': regSessionCookie
      },
      redirect: 'manual'
    });
    
    console.log("   Secrets after reg status:", secretsAfterRegResponse.status);
    console.log("   Secrets after reg redirect:", secretsAfterRegResponse.headers.get('location'));
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testLoginPersistence(); 