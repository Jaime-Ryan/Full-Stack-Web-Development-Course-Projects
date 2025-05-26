import fetch from 'node-fetch';

async function testExistingUserLogin() {
  console.log("🧪 Testing Login with Existing User...\n");
  
  try {
    // Step 1: Get login page and session cookie
    console.log("1. Getting login page...");
    const loginPageResponse = await fetch('http://localhost:3000/login');
    const cookies = loginPageResponse.headers.get('set-cookie');
    const sessionCookie = cookies ? cookies.split(';')[0] : null;
    
    console.log("   Session cookie:", sessionCookie);
    
    // Step 2: Login with existing user
    console.log("\n2. Logging in with newuser@test.com...");
    const loginData = new URLSearchParams({
      username: 'newuser@test.com',
      password: 'newpassword123'
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
    
    // Get updated session cookie
    const newCookies = loginResponse.headers.get('set-cookie');
    const updatedSessionCookie = newCookies ? newCookies.split(';')[0] : sessionCookie;
    console.log("   Updated session cookie:", updatedSessionCookie);
    
    // Step 3: Test secrets access immediately after login
    console.log("\n3. Testing secrets access immediately after login...");
    const secretsResponse = await fetch('http://localhost:3000/secrets', {
      method: 'GET',
      headers: {
        'Cookie': updatedSessionCookie
      },
      redirect: 'manual'
    });
    
    console.log("   Secrets status:", secretsResponse.status);
    console.log("   Secrets redirect:", secretsResponse.headers.get('location'));
    
    if (secretsResponse.status === 200) {
      console.log("   ✅ Successfully accessed secrets page!");
    }
    
    // Step 4: Test persistence - make another request after a delay
    console.log("\n4. Testing session persistence (after delay)...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    
    const persistenceTest = await fetch('http://localhost:3000/secrets', {
      method: 'GET',
      headers: {
        'Cookie': updatedSessionCookie
      },
      redirect: 'manual'
    });
    
    console.log("   Persistence test status:", persistenceTest.status);
    console.log("   Persistence test redirect:", persistenceTest.headers.get('location'));
    
    if (persistenceTest.status === 200) {
      console.log("   ✅ Session persisted successfully!");
    } else {
      console.log("   ❌ Session did not persist!");
    }
    
    // Step 5: Test home page authentication status
    console.log("\n5. Testing home page authentication status...");
    const homeResponse = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: {
        'Cookie': updatedSessionCookie
      }
    });
    
    console.log("   Home page status:", homeResponse.status);
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testExistingUserLogin(); 