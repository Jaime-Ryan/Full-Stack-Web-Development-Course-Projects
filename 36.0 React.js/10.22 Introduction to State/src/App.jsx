import { useState, useTransition, useOptimistic, useActionState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Simulated API call for demonstration
const updateUserName = async (name) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (name.toLowerCase() === 'error') {
    throw new Error('Invalid name!')
  }
  return name
}

function App() {
  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState('John Doe')
  const [isPending, startTransition] = useTransition()
  
  // React 19 useOptimistic hook for optimistic updates
  const [optimisticName, setOptimisticName] = useOptimistic(userName)
  
  // React 19 useActionState hook for form actions
  const [error, submitAction, isSubmitting] = useActionState(
    async (previousState, formData) => {
      const newName = formData.get('name')
      if (!newName) return 'Name is required'
      
      try {
        // Optimistically update the name
        setOptimisticName(newName)
        
        // Perform the actual update
        const updatedName = await updateUserName(newName)
        setUserName(updatedName)
        return null // No error
      } catch (err) {
        return err.message
      }
    },
    null
  )

  // Action for the counter with async transition
  const incrementCounter = () => {
    startTransition(async () => {
      // Simulate some async work
      await new Promise(resolve => setTimeout(resolve, 500))
      setCount(count => count + 1)
    })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>React 19 + Vite</h1>
      <p className="version">🎉 Now running React 19.1.0!</p>
      
      {/* Counter with React 19 Actions */}
      <div className="card">
        <button onClick={incrementCounter} disabled={isPending}>
          {isPending ? 'Counting...' : `count is ${count}`}
        </button>
        <p>
          <code>useTransition</code> with async Actions
        </p>
      </div>

      {/* Form with React 19 form actions and optimistic updates */}
      <div className="card">
        <h3>User Profile</h3>
        <p>Current name: <strong>{optimisticName}</strong></p>
        
        <form action={submitAction}>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter new name"
            style={{ 
              padding: '8px', 
              marginRight: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              padding: '8px 16px',
              backgroundColor: '#646cff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Updating...' : 'Update Name'}
          </button>
        </form>
        
        {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
        <p style={{ fontSize: '0.9em', marginTop: '8px' }}>
          <code>useActionState</code> + <code>useOptimistic</code> hooks
        </p>
      </div>

      <div className="features">
        <h3>✨ React 19 Features Demonstrated:</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>Actions:</strong> Async functions in transitions</li>
          <li><strong>useActionState:</strong> Form state management</li>
          <li><strong>useOptimistic:</strong> Optimistic UI updates</li>
          <li><strong>Form Actions:</strong> Native form handling</li>
          <li><strong>useTransition:</strong> Non-blocking updates</li>
        </ul>
      </div>

      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </>
  )
}

export default App
