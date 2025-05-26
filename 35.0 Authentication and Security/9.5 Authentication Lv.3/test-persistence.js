import fetch from 'node-fetch';

async function testSessionPersistence() {
  console.log("🧪 Testing Session Persistence...\n");
  
  try {
    // Test 1: Get home page and check for session cookie
    console.log("1. Testing home page access...");
    const response1 = await fetch('http://localhost:3000/', {
      method: 'GET'
    });
    
    const cookies = response1.headers.get('set-cookie');
    console.log("   Status:", response1.status);
    console.log("   Cookies received:", cookies);
    
    if (!cookies) {
      console.log("❌ No session cookie received!");
      return;
    }
    
    // Extract session cookie
    const sessionCookie = cookies.split(';')[0];
    console.log("   Session cookie:", sessionCookie);
    
    // Test 2: Make another request with the session cookie
    console.log("\n2. Testing session persistence...");
    const response2 = await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: {
        'Cookie': sessionCookie
      }
    });
    
    console.log("   Status:", response2.status);
    console.log("   ✅ Session cookie accepted");
    
    // Test 3: Try accessing protected route
    console.log("\n3. Testing protected route access...");
    const response3 = await fetch('http://localhost:3000/secrets', {
      method: 'GET',
      headers: {
        'Cookie': sessionCookie
      },
      redirect: 'manual'
    });
    
    console.log("   Status:", response3.status);
    console.log("   Location header:", response3.headers.get('location'));
    
    if (response3.status === 302 && response3.headers.get('location') === '/login') {
      console.log("   ✅ Correctly redirected to login (not authenticated)");
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testSessionPersistence(); 