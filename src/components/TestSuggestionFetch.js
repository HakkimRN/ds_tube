import React, { useEffect, useState } from 'react';

const TestSuggestionFetch = () => {
  const [testSuggestions, setTestSuggestions] = useState([]);
  const [testError, setTestError] = useState(null);
  const testQuery = "testquery"; // Hardcoded query for isolation

  // IMPORTANT: Use the exact correct suggestion API URL here
  const TEST_YOUTUBE_SEARCH_API = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt";

  useEffect(() => {
    const fetchTestSuggestionsJsonp = () => {
      setTestError(null); // Clear previous errors

      // Define a unique callback function name for this request
      const callbackName = `jsonpCallback_${Date.now()}`;

      // Create a global function that the JSONP response will call
      window[callbackName] = (data) => {
        console.log("TESTING: JSONP Callback Data:", data);
        if (Array.isArray(data) && Array.isArray(data[1])) {
          setTestSuggestions(data[1]);
        } else {
          console.warn("TESTING: Unexpected suggestion API response format from JSONP callback:", data);
          setTestSuggestions([]);
        }
        delete window[callbackName];
        script.remove();
      };
      const fetchUrl = `${TEST_YOUTUBE_SEARCH_API}&q=${testQuery}&callback=${callbackName}`;
      console.log("TESTING: Fetching suggestions via JSONP URL:", fetchUrl);

      const script = document.createElement('script');
      script.src = fetchUrl;
      script.async = true;

      script.onerror = () => {
        console.error("TESTING: JSONP script loading error.");
        setTestError("Failed to load suggestions via JSONP. Network issue or invalid response.");
        delete window[callbackName]; // Clean up
        script.remove();
      };
      document.body.appendChild(script);
    };

    const timer = setTimeout(fetchTestSuggestionsJsonp, 1000); // Fetch after 1 second
    return () => {
      clearTimeout(timer);
      const existingScript = document.querySelector(`script[src^="${TEST_YOUTUBE_SEARCH_API}&q=${testQuery}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div style={{ padding: '20px', border: '1px solid blue', margin: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <h2 style={{ color: '#333' }}>Test Suggestion Fetch Component (JSONP)</h2>
      <p>Attempting to fetch suggestions for: "<span style={{ fontWeight: 'bold' }}>{testQuery}</span>"</p>
      {testError && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {testError}</p>}
      {testSuggestions.length > 0 ? (
        <div>
          <h3 style={{ color: '#555' }}>Suggestions:</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {testSuggestions.map((s, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>{s}</li>
            ))}
          </ul>
        </div>
      ) : (
        !testError && <p>No suggestions fetched yet or none found.</p>
      )}
      <p style={{ fontSize: '0.9em', color: '#777' }}>Check your browser's console and Network tab for "TESTING:" logs and requests.</p>
    </div>
  );
};

export default TestSuggestionFetch;
