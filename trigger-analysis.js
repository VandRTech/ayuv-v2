// Script to trigger analysis for session d9a87688-0c01-4fe6-bf3c-28e9012f6efe

const sessionId = 'd9a87688-0c01-4fe6-bf3c-28e9012f6efe';
const functionUrl = 'https://zfmgicsjpbtsqftadlaz.supabase.co/functions/v1/sehat-dadi-pipeline';

async function triggerAnalysis() {
  try {
    console.log(`🚀 Triggering analysis for session: ${sessionId}`);
    console.log(`📡 Function URL: ${functionUrl}`);
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId })
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    
    const result = await response.text();
    console.log(`📋 Response Body:`, result);
    
    if (response.ok) {
      console.log('✅ Analysis triggered successfully!');
      try {
        const parsedResult = JSON.parse(result);
        console.log('📄 Parsed Response:', parsedResult);
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    } else {
      console.log('❌ Analysis failed');
    }
  } catch (error) {
    console.error('🔥 Error triggering analysis:', error.message);
  }
}

triggerAnalysis(); 